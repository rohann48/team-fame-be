import Video from "./videos.model";
export class VideoService {
  async addVideo(newVideo) {
    const Data = await Video.addVideo(newVideo);
    return Data;
  }
  async getAllVideoList() {
    const data = await Video.getVideoList({});
    return data;
  }
  async getVideoById(videoId) {
    const data = await Video.getVideoById(videoId);
    return data;
  }
}
