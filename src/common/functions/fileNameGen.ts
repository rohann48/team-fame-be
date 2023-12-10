import crypto from "crypto";
export default function fileNameGen(originalFileName) {
    let time = new Date().getTime();
    let randomStr = crypto.randomBytes(20).toString("hex");
    let fileName = `${time}${randomStr}_${originalFileName}`;
    return fileName;
}
