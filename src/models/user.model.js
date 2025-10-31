import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastname : {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    password: {
        type: String, 
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: [String],
        default: ['user'],
        enum: ['user', 'admin', 'store']
    },
    isStore: {
        type: Boolean,
        default: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    storeName: {
        type: String
    },
    voen: {
        type: String,
        trim: true
    },
    storeDescription: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: null
    },
    favoriteProducts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        default: []
    }]
});

userSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.matchPassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema);