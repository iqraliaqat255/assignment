const multer = require("multer")
const fs = require('fs');

// multer code
const data = multer({
  storage: multer.diskStorage({
    destination:  function (req, file, cb) {

      let dir = "./uploads/"+ email;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true}, err => {});
      }
      cb(null, dir);
    },
    
    filename: function (req, file, cb) {
    
      let extenstion = file.originalname.split('.')
      let dir = "./uploads/"+ email;
      req.data = dir+"/" +file.fieldname + "-" + Date.now() + "."+[extenstion[1]];
      cb(null, file.fieldname + "-" + Date.now() + "."+[extenstion[1]]);  
      
    }
  })
});
module.exports = data;