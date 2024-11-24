// const Greenlock = require("greenlock-express");
// const path = require("path");
// const app = require("./app");

// // Resolve absolute paths for packageRoot and configDir
// const packageRoot = path.resolve(__dirname, ".."); // Ensure it's the root directory

// const configDir = path.join(packageRoot, "../greenlock.d"); // Absolute path for configDir

// // Initialize Greenlock
// const greenlock = Greenlock.init({
//   version: "draft-11",
//   packageRoot: packageRoot, // Root of your project
//   configDir: configDir, // Directory to store configurations
//   maintainerEmail: "rohann48@gmail.com", // Your email for notifications
//   cluster: false,
//   staging: false, // Set to 'false' for production
//   store: require("greenlock-store-fs").create({
//     configDir: configDir, // Use the same configDir path for storage
//     webrootPath: "/tmp/acme-challenges", // Directory to store challenge files
//   }),
//   sites: [
//     {
//       subject: "api.team-fame.com", // Main domain
//       altnames: ["api.team-fame.com"], // Alternative domain names
//     },
//   ],
// }).ready((glx) => {
//   const httpsServer = glx.httpsServer(null, app);
//   httpsServer.listen(443, () => {
//     console.log("Greenlock HTTPS server listening on port 443");
//     console.info("Listening on ", httpsServer.address());
//   });
// });

// // function httpsWorker(glx) {
// //   var httpsServer = glx.httpsServer(null, app);
// //   httpsServer.listen(9001, "0.0.0.0", function () {
// //   });
// // }

// // Export Greenlock for use in other modules
// module.exports = greenlock;
