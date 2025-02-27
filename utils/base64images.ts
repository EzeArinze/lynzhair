export const convertImagesToBase64 = async (
  images: File[]
): Promise<string[]> => {
  const imageBase64Promises = images.map((image) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });
  });

  return await Promise.all(imageBase64Promises);
};
