import mongoose, { Schema } from "mongoose";

const tuteeSchema = new Schema(
  {
    user_id: {
      type: String
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
      user_id: this.user_id,
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
