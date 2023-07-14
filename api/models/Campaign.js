const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId, Int32 } = require('mongodb');


// Create Schema
const CampaignSchema = new Schema ({
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});

mongoose.model('campaigns', CampaignSchema);