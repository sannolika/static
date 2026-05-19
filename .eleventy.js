const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets → /_site/assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Date filter (used e.g. for "now" | date("yyyy"))
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    const d =
      !value || value === "now"
        ? new Date()
        : value instanceof Date
        ? value
        : new Date(value);
    return DateTime.fromJSDate(d).toFormat(format);
  });

  // ✅ Force a reliable global `site` object (merges with src/_data/site.* if present)
eleventyConfig.addGlobalData("site", (data) => {
  const existing = (data && data.site) ? data.site : {}; // guard undefined
  return {
    // sensible defaults:
    title: "Sanna Fogelvik",
    author: "Sanna Fogelvik",
    url: "https://example.netlify.app",
    year: new Date().getFullYear(),
    // let any src/_data/site.* values override defaults:
    ...existing,
  };
});

 // All works (any .md/.njk under src/works/)
eleventyConfig.addCollection("worksAll", (c) =>
  c.getFilteredByGlob("./src/works/**/*.{md,njk}")
);

// Current works: tag your pages with `tags: ["work", "current"]`
eleventyConfig.addCollection("worksCurrent", (c) =>
  c.getFilteredByGlob("./src/works/**/*.{md,njk}")
   .filter(w => (w.data.tags || []).includes("current"))
   .sort((a,b) => (b.data.year || b.date) - (a.data.year || a.date))
);

// Earlier works: tagged "work" but NOT "current"
eleventyConfig.addCollection("worksEarlier", (c) =>
  c.getFilteredByGlob("./src/works/**/*.{md,njk}")
   .filter(w => (w.data.tags || []).includes("work") && !(w.data.tags || []).includes("current"))
   .sort((a,b) => (b.data.year || b.date) - (a.data.year || a.date))
);

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
