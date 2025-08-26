export const toUrlSlug = (text = "") => {
  const slug = text.trim().replace(/-+/g, "~dash~").replace(/\s+/g, "-");
  const encodedSlug = encodeURIComponent(slug);

  return encodedSlug;
};
