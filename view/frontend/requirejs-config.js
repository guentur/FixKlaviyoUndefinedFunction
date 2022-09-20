var config = {
    // map: {
    //     '*': {
    //         'Klaviyo_Reclaim/js/customer': 'Guentur_FixKlaviyoUndefinedFunction/js/customer'
    //     }
    // }
    config: {
        mixins: {
            'Magento_Customer/js/customer-data': {
                'Guentur_FixKlaviyoUndefinedFunction/js/customer-data-mixin': true
            }
        }
    }
};
