import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({

    fullname: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "Your First Name cannot have less than 3 Characters"],

        },

        lastName: {
            type: String,
            minLength: [3, "Your First Name cannot have less than 3 Characters"],

        }
    },

    email: {
        type: String,
        required: true,
        minLength: [3,"Your email cannot have less than 3 Characters"],
        unique: true,
    },

    number: {
        type: String,
        required: true,
        unique: true,
        minLength: [10, "Your Phone Number cannot have less than 10 numbers"],
        maxLength: [10, "Your Phone Number cannot have more than 10 numbers"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Your passwod cannot have less than 6 characters"],
    },

    vehicleDetails: {
        vehicleType: {
            type: String,
            minLength: [3, "Your vehicle Type cannot have less than 3 Characters"],
        },
        
        vehicleColor: {
            type: String,
            minLength: [3, "Your vehicle color cannot have less than 3 Characters"]
        },

         numberPlate: {
            type: String,
            minLength: [3, "Your vehicle color cannot have less than 3 Characters"],
        },

        capacity: {
            type: String,
            min: [1, "Your vehicle seat cannot have less than 1"]
        }
        
    },

    socketId: {
        type: String,
    },

   location: {
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number], // ✅ This defines the type, not values
   
  }

}

});

userSchema.index({ location: "2dsphere" });

userSchema.methods.generateAuthToken = function ()  {
    const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY, {expiresIn: '30d'});
    return token;
};

userSchema.methods.comparePassword =  async function  (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model ('user', userSchema);

export default userModel;