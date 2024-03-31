const jwt = require("jsonwebtoken");

export function auth(req, res, next) {
  // console.log("hy",req.cookies.authToken);

  const jwtToken = req.cookies.authToken;

  if (!jwtToken) {
    return res.status(401).send("Access Denied: No Token Provided");
  }
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWTPRIVATEKEY);
    req.user = decoded; //payload
    // res.send(decoded)
    next();
  } catch (ex) {
    res.status(401).send("Invalid Token");
  }
}
