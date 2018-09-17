const mongoose = require('mongoose');

const validator = require('validator');
const shortHash = require('shorthash');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    title: {
        type: String,
    },
    original_url: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: function(props) {
                return `${props.path} is Not Valid`;
            }
        }
    },
    tags: [ String ],
    hashed_url: {
        type: String
    },
    clicks: [
        {
            dateTime: {
                type: Date,
                default: Date.now
            },
            ipAddress: {
                type: String
            },
            browserName: {
                type: String
            },
            osType: {
                type: String
            },
            deviceType: {
                type: String
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

urlSchema.pre('save', function(next) {
    if(!this.hashed_url) {
        this.hashed_url = shortHash.unique(`${this.original_url}`);
    }
    next();
})

const Url = mongoose.model('Url', urlSchema);

module.exports = {
    Url
}