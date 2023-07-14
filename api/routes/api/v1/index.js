const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


require('models/Donations');
require('models/Campaign');
require('models/User');

const Donations = mongoose.model('donations');
const Campaign = mongoose.model('campaigns');
const User = mongoose.model('users');


// Root route   
router.get('/', (req, res) => {
    res.send('Root API route');
});

// Get all 
router.get('/donations', async (req, res) => {
    // Using Mongoose
    const filter = {};
    const donations = await Donations.find(filter);
    console.log(donations);
    res.json(donations);
});

// Helper function to get prod/dev client/api url
const getURL = (app) => {
    if (process.env.NODE_ENV === 'production'){
        if (app === 'client'){
            return process.env.PROD_CLIENT_URL;
        } else {
            return process.env.PROD_API_URL;
        }
    } else {
        if (app === "client") {
            return process.env.DEV_CLIENT_URL;
        } else {
            return process.env.DEV_API_URL;
        }
    }
};

router.post('/donations/create_checkout', async (req, res) => {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.campaign_name
                    },
                    unit_amount: req.body.donation_amount
                },
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `${getURL('api')}/donations/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}&campaign_id=${req.body.campaign_id}`,
        cancel_url: `${getURL('client')}`,
        metadata: {
            campaign_id: req.body.campaign_id
        }
    });

    console.log(session);

    res.redirect(303, session.url);
});

router.get('/donations/donation_success', async (req, res) => {
    // View the entire querystring
    console.log(req.query);

    // Retrieve the checkout session from the Stripe API 
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    // View the entire session object returned by Stripe
    console.log(session);

    // Retrieve the campaign_id (metadata or querystring)
    console.log(session.metadata.campaign_id);
    console.log(req.query.campaign_id);

    // TODO: Add a donation record to the database
    // Remember the amount_total is in CENTS 
    const donation_amount = session.amount_total/100;

    // Construct a URL to the front end to deliver the user 
    const clientURL = `${getURL('client')}/donations/donation_success?campaign_id=${session.metadata.campaign_id}&donation_amount=${donation_amount}`;

    // Redirect the user
    res.redirect(303, clientURL);
});

router.get('/campaigns', async (req, res) => {
    // Using Mongoose
    const filter = {};
    const campaigns = await Campaign.find(filter);
    console.log(campaigns);
    res.json(campaigns);
});

router.get('/campaigns/:_id', async (req, res, next) => {
    // Using Mongoose
    // The "_id" is in req.params.id
    const paramInputID = req.params._id;
    const requestedCampaign = await Campaign.findById(paramInputID);
    console.log(paramInputID);
    res.json(requestedCampaign);
    console.log(requestedCampaign);
});

router.get('/users', async (req, res) => {
    // Using Mongoose
    const filter = {};
    const users = await User.find(filter);
    console.log(users);
    res.json(users);
});

router.get('/users/:_id', async (req, res, next) => {
    // Using Mongoose
    const paramInputID = req.params._id;
    const user = await User.findById(paramInputID);
    console.log(paramInputID);
    console.log(user);
    res.json(user);
});

router.get('/donation/user/:user_id', async function (req, res, next) {
    const paramInputID = {'user_id:': new ObjectId(req.params.user_id)};
    const donation = await Donations.find(paramInputID);
    console.log(paramInputID);
    res.json(donation);
    console.log(donation);

    // const paramInputID = req.params.user_id;
    // const donation = await Donations.findById(paramInputID);
    // console.log(paramInputID);
    // console.log(donation);  
    // res.json(donation);
});     

router.get('/donations/campaigns/:campaign_id', async function (req, res, next) {
    const paramInputID = {'campaign_id': new ObjectId(req.params.campaign_id)};
    const requestedCampaign = await Donations.find(paramInputID);
    console.log(paramInputID);
    res.json(requestedCampaign);
    console.log(requestedCampaign);
}); 


module.exports = router;