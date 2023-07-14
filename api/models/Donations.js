const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId, Int32 } = require('mongodb');


// Create Schema
const DonationSchema = new Schema ({
    _id: {
        type: ObjectId,
        required: true
    },
    campaign_id: {
        type: ObjectId,
        required: true,
    },
    user_id: {
        type: ObjectId,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    donation_date: {
        type: Date,
        required: true
    }
});

mongoose.model('donations', DonationSchema);