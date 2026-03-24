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
        },
        
        vehicleColor: {
            type: String,
        },

         numberPlate: {
            type: String,
        },

        capacity: {
            type: String,
        }
        
    },

    socketId: {
        type: String,
    },

      // ✅ add reviews array
  reviews: [
    {
      rating: { type: Number, min: 1, max: 5 },
      feedback: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  // ✅ Role field
  role: {
    type: String,
    enum: ["driver", "passenger", "none"],
    default: "none",
  },

 origin: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    default: [0, 0], // ✅ valid default point
  },
},

destination: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    default: [0, 0], // ✅ valid default point
  },
},

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