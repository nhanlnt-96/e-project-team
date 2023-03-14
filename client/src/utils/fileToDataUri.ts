export const fileToDataUri = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event?.target?.result);
    };

    reader.readAsDataURL(file);
  });
};
