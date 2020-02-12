const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: [true, "Status is required"]
  },
  skills: {
    type: [String],
    required: [true, "Skill is required"],
    validate: [
      value => value.length > 0 && value.every(v => v.length > 0),
      "Skills are required"
    ]
  },
  bio: String,
  githubUsername: String,
  experience: [
    {
      title: {
        type: String,
        required: [true, "Title is required"]
      },
      company: {
        type: String,
        required: [true, "Company is required"]
      },
      location: String,
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: [true, "School is required"]
      },
      degree: {
        type: String,
        required: [true, "Degree is required"]
      },
      fieldOfStudy: {
        type: String,
        required: [true, "Field of Study is required"]
      },
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
