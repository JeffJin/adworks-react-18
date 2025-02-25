export function calcFileSize(fileSize: number): string {
  const sizeInKb = fileSize / 1024;

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`;
  } else {
    return `${sizeInKb.toFixed(0)} kb`;
  }
}

export function getImageInfo(url: string): Promise<ImageInfo | null> {
  const img = new Image();
  const promise = new Promise<ImageInfo | null>((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = err => {
      reject(err);
    };
    img.src = url;
  });
  return promise;
}

interface ImageInfo {
  naturalWidth: number;
  naturalHeight: number;
  localName: string,
  longDesc: string,
}
