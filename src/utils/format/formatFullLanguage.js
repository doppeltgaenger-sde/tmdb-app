const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

export const formatFullLanguage = (code) => {
  if (!code) return "";

  try {
    return languageNames.of(code);
  } catch (error) {
    return code.toUpperCase();
  }
};
