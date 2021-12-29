import Vue from 'vue';
import {
    ValidationObserver,
    ValidationProvider,
    extend,
    localize
} from "vee-validate";

import * as rules from "vee-validate/dist/rules";

import en from 'vee-validate/dist/locale/en';

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

localize({
    en: {
        names: {
            email: 'email',
            fullName: 'full name',
            houseNr: 'house nr',
            postalCode: 'postal (zip) code'
        },
    }
})

localize("en", en);

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
