import mongoose, { Schema } from "mongoose";
import { schema as UserSchema } from "../user";

const tuteeSchema = new Schema(
  {
    user: {
      type: UserSchema
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

tuteeSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model("Tutee", tuteeSchema);

export const schema = model.schema;
export default model;
