// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const checkImageWidth = (file): Promise<number> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target!.result as string;
      image.onload = () => {
        resolve(image.width);
      };
    };
    reader.onerror = (error) => reject(error);
  });
