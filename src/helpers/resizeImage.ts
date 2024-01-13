// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Resizer from "react-image-file-resizer";

export const resizeImage = (file) => {
  let imageType = "JPEG";

  if (file.type === "image/png") {
    imageType = "PNG";
  }

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1400,
      1000,
      imageType,
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });
};
