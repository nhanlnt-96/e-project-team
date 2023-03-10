export const imageLinkGeneration = (storageName: string, imageName: string) => `${process.env.REACT_APP_API_BASE_URL}/image/${storageName}/${imageName}`;
