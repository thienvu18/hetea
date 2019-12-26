import mongoose, { Schema } from "mongoose";

const status = ["read", "unread"];

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String
    },
    status: {
      type: String,
      enum: status,
      default: "unread"
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

messageSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      sender: this.sender.view(full),
      receiver: this.receiver.view(full),
      content: this.content,
      status: this.status,
      createdAt: this.createdAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model("Message", messageSchema);

export const schema = model.schema;
export default model;
