const monogoose = require('mongoose');

var driverSchema = {
    firstName: {
        type: String,
        name: firstName,
        required: true,
        minLength: 2,
        trim: true,
        validator: {
            validator: validator.isString,
            message: '{value} is not a valid first name'
        }
    },

    lastName: {
        type: String,
        name: lastName,
        required: true,
        minLength: 2,
        trim: true,
        validator: {
            validator: validator.isString,
            message: '{value} is not a valid last name'
        }
    },

    email: {
        type: String,
        name: email,
        required: true,
        minLength: 7,
        trim: true,
        validator: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        }
    }

}