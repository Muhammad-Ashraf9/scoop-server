const fs = require("fs");
const path = require("path");
exports.removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

// exports.getImageFullPath = (imgName) => {
//   console.log("__dirname :>> ", __dirname);
//   return path.join(__dirname, "images", imgName);
// };
