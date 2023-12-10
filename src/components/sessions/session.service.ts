import Session from "./session.model";

export class SessionService {
  async destroySpecificUserSessionById(userId) {
    try {
      const session = await Session.deleteMany({
        "session.userInfo._id": userId,
      });
      return session;
    } catch (err) {
      throw err;
    }
  }
}
