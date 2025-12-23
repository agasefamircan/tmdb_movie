export const getApiLanguage = (lang: string) => {
  switch (lang) {
    // case "az":
    //   return "en-US";
    case 'ru':
      return 'ru-RU';
    case 'tr':
      return 'tr-TR';
    default:
      return 'en-US';
  }
};
