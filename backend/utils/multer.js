import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      'image' + "_" + Date.now() + "_" + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only images are allowed"), false);
    return;
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
