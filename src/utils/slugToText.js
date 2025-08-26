export const slugToText = (slug = "") => {
  const text = slug
    .trim()
    .replace(/~dash~+/g, "-")
    .replace(/-+/g, " ");
  const decodedText = decodeURIComponent(text);

  return decodedText;
};
