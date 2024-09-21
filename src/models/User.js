import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    connectedApps: {
      type: Map, // Use a Map to store different apps with dynamic keys
      of: Schema.Types.Mixed, // Mixed type allows flexible structure for each app
      default: {}, // Default to an empty object
    },
  },
  { timestamps: true }
);

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;
