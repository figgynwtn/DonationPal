const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const { ObjectId, Int32 } = require('mongodb');



// Create Schema
const UserSchema = new Schema ({
    _id: {
        type: ObjectId,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    name: {
        type: Object,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    dob: {
        type: Object,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cell: {
        type: String,
        required: true
    },
    id: {
        type: Object,
        required: true
    },
    picture: {
        type: Object,
        required: true
    },
    nat: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Create a helper function that uses bcrypt to check the plain text version
UserSchema.methods.isValidPassword = async function(encryptedPassword) {
    const user = this;
    const compare = await bcrypt.compare(encryptedPassword, user.password);
    return compare;
}

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;

mongoose.model('users', UserSchema);