export const convertDate = (dateString: string, locale = 'vi-VN') => {
  const convertString = new Date(dateString);
  const date = convertString.toLocaleDateString(locale);
  const time = convertString.toLocaleTimeString(locale);

  return `${date} - ${time}`;
};
