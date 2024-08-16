import multer from 'multer';

// const storage = multer.memoryStorage(); 
// const upload = multer({ storage });

// export default upload;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/videos");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileNameArray = file.originalname.split(".");
      const fileExtension = fileNameArray[fileNameArray.length - 1];
      cb(null, uniqueSuffix + "." + fileExtension);
    },
  });
  
  const upload = multer({ storage: storage });
  
export default upload;
