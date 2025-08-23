import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
    id: { type: String, default: () => uuidv4() },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, required: true, default: "/assets/images/user_icon.png" },
    password: { type: String, required: true },
    bookmarks: [{
      id: Number,
      airline: String,
      flightNumber: String,
      departure: String,
      arrival: String,
      departureTime: String,
      arrivalTime: String,
      dof: String,
      duration: String,
      price: Number,
      checked: Boolean,
      stops: Number,
      logo: String,
    }],
    flights: { type: Array, default: [] },
    dob: { type: Date, required: true },
    verified: { type: Boolean, default: false },
    status: { type: String, default: "unverified" },
    isAdmin: { type: String, default: "user"  },
    verificationToken: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", userSchema);

export default User; 