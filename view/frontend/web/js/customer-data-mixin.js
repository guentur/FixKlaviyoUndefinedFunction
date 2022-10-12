define([
    'mage/utils/wrapper',
    'underscore',
    'jquery',
], function (wrapper, _, $) {
    'use strict';

    /**
     * @param  {Object} customerData
     * @return {Object}
     */
    return function (customerData) {
        var newFunctionality,
            options = {},
            storageInvalidation,
            deferred = $.Deferred(),
            invalidateCacheBySessionTimeOut,
            invalidateCacheByCloseCookieSession,
            storage,
            updatedCustomerData;

        storage = $.initNamespaceStorage('mage-cache-storage').localStorage;

        /**
         * @param {Object} invalidateOptions
         */
        invalidateCacheBySessionTimeOut = function (invalidateOptions) {
            var date;

            if (new Date($.localStorage.get('mage-cache-timeout')) < new Date()) {
                storage.removeAll();
                date = new Date(Date.now() + parseInt(invalidateOptions.cookieLifeTime, 10) * 1000);
                $.localStorage.set('mage-cache-timeout', date);
            }
        };

        /**
         * Invalidate Cache By Close Cookie Session
         */
        invalidateCacheByCloseCookieSession = function () {
            if (!$.cookieStorage.isSet('mage-cache-sessid')) {
                $.cookieStorage.set('mage-cache-sessid', true);
                storage.removeAll();
            }
        };

        newFunctionality = {

            /**
             * Checks if customer data is initialized.
             *
             * @returns {jQuery.Deferred}
             */
            getInitCustomerData: function () {
                return deferred.promise();
            },

            /**
             * Storage init
             */
            initStorage: function () {
                $.cookieStorage.setConf({
                    path: '/',
                    expires: new Date(Date.now() + parseInt(options.cookieLifeTime, 10) * 1000),
                    samesite: 'lax'
                });
                storage = $.initNamespaceStorage('mage-cache-storage').localStorage;
                storageInvalidation = $.initNamespaceStorage('mage-cache-storage-section-invalidation').localStorage;
            },

            /**
             * @param {Object} settings
             * @constructor
             */
            'Magento_Customer/js/customer-data': function (settings) {
                options = settings;
                customerData.initStorage();
                invalidateCacheBySessionTimeOut(settings);
                invalidateCacheByCloseCookieSession();
                customerData.init();
                deferred.resolve();
            }
        }

        updatedCustomerData = _.extend(customerData, newFunctionality);

        return updatedCustomerData;
    };
});
