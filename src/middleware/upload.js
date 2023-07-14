import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) !== -1) {
      const filename = Date.now() + "-" + file.originalname;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: Date.now() + "-" + file.originalname,
    };
  },
});

const upload = multer({ storage });

export { upload };
