// =======================
// SEO HELPER (PRO LEVEL)
// =======================

export function updateSeo({
  title = "Kognivex | Web Development & SaaS Solutions",
  description = "Kognivex builds scalable web applications, SaaS platforms, and enterprise software.",
  keywords = "web development, SaaS, software development, IT company",
  image = "/og-image.jpg",
  url = window.location.href
}) {

  // TITLE
  document.title = title;

  // META HELPER
  const setMeta = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // OPEN GRAPH HELPER
  const setOG = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("property", property);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // BASIC SEO
  setMeta("description", description);
  setMeta("keywords", keywords);

  // OPEN GRAPH
  setOG("og:title", title);
  setOG("og:description", description);
  setOG("og:image", image);
  setOG("og:url", url);
  setOG("og:type", "website");

  // TWITTER
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", image);

  // CANONICAL
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}