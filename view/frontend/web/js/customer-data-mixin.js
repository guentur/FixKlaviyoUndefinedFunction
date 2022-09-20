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
            deferred = $.Deferred(),
            updatedCustomerData;

        newFunctionality = {
            /**
             * Checks if customer data is initialized.
             *
             * @returns {jQuery.Deferred}
             */
            getInitCustomerData: function () {
                return deferred.promise();
            },


            // /**
            //  * @param {Object} settings
            //  * @constructor
            //  */
            // 'Magento_Customer/js/customer-data': function (settings) {
            //     // options = settings;
            //     // customerData.initStorage();
            //     // invalidateCacheBySessionTimeOut(settings);
            //     // invalidateCacheByCloseCookieSession();
            //     // customerData.init();
            //     deferred.resolve();
            // }
        }

        updatedCustomerData = _.extend(customerData, newFunctionality);
        updatedCustomerData.init = wrapper.wrapSuper(updatedCustomerData.init, function () {
            this._super();
            deferred.resolve();
        });
        // updatedCustomerData = wrapper.wrapSuper(_.clone(updatedCustomerData), function () {
        //     this._super();
        //     deferred.resolve();
        // });

        return updatedCustomerData;
    };
});
