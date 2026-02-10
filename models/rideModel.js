import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema( {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    pickup: {
        type: String,
        required: true,
    },

    destination: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
    },

    duration: {
        type: Number,
    },

    distance: {
        type: Number
    }
});

const rideModel = mongoose.model(rideSchema, rideModel);

export default rideModel;