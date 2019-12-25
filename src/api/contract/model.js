import mongoose, { Schema } from "mongoose";

const status = ["created", "confirm", "done"];

const contractSchema = new Schema(
  {
    tutor: {
      type: String
    },
    tutee: {
      type: String
    },
    hours: {
      type: Number
    },
    price: {
      type: Number
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    status: {
      type: String,
      enum: status,
      default: "created"
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

contractSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      tutor: this.tutor,
      tutee: this.tutee,
      hours: this.hours,
      price: this.price,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
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

const model = mongoose.model("Contract", contractSchema);

export const schema = model.schema;
export default model;
