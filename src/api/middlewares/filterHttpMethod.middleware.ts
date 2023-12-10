const allowedMethods = ["GET", "DELETE", "POST", "PUT", "PATCH"];

export default function (req, res, next) {
  if (!allowedMethods.includes(req.method))
    return res.status(503).send("Method Not Allowed");
  next();
}
