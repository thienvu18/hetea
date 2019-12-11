import mongoose, { Schema } from "mongoose";

const tutorSchema = new Schema(
  {
    user_id: {
      type: String
    },
    address: {
      type: String
    },
    bio: {
      type: String
    },
    skills: {
      type: [String]
    },
    pricePerHour: {
      type: Number
    },
    tagline: {
      type: String
    },
    rating: {
      type: Number
    },
    taughtContract: {
      type: [String]
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

tutorSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user_id: this.user_id,
      address: this.address,
      bio: this.bio,
      skills: this.skills,
      pricePerHour: this.pricePerHour,
      tagline: this.tagline,
      rating: this.rating,
      taughtContract: this.taughtContract,
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

const model = mongoose.model("Tutor", tutorSchema);

export const schema = model.schema;
export default model;
