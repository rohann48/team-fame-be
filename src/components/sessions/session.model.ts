import { model, Schema } from "mongoose";

const sessionSchema = new Schema({
  expires: Date,
  session: { type: Object },
});

const Session = model("usersessions", sessionSchema);
export default Session;
