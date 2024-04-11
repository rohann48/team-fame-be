import { Schema, model } from "mongoose";
import { IVideo, IVideoModel } from "./videos.interface";

const videoDetails = {
  name: String,
  Key: String,
  path: String,
  date: Date,
};

export const VideoSchema: Schema = new Schema(
  {
    title: String,
    description: String,
    videoInfo: [videoDetails],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);

VideoSchema.statics = {
  addVideo: async function (data) {
    try {
      const videoData = new Video(data);
      const videoDoc = await videoData.save();
      return videoDoc;
    } catch (err) {
      throw err;
    }
  },
  getVideoById: async function (id) {
    try {
      const video = await this.findById(id);
      return video;
    } catch (err) {
      throw err;
    }
  },
  getVideoList: async function (matchQuery = {}) {
    try {
      const video = await this.find(matchQuery);
      return video;
    } catch (err) {
      throw err;
    }
  },
};

const Video: IVideoModel = model<IVideo, IVideoModel>("Video", VideoSchema);
export default Video;
