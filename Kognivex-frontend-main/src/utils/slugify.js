// =======================
// SLUGIFY (SEO FRIENDLY)
// =======================

export default function slugify(text = "") {
  return text
    .toString()
    .normalize("NFD") // remove accents
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dash
    .replace(/-+/g, "-") // multiple dashes → single
    .replace(/^-+|-+$/g, ""); // trim dashes
}