import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";

Meteor.methods({
    "createUser"(user) {

        Accounts.createUser(user, (err) => {
            if (err)
                throw err;
        });
    },
});