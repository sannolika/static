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

  // Collections (works)
  eleventyConfig.addCollection("worksAll", c =>
    c.getFilteredByGlob("src/works/*.md").sort((a,b) => {
      const ao = a.data.order ?? 999, bo = b.data.order ?? 999;
      if (ao !== bo) return ao - bo;
      const ay = a.data.year ?? 0, by = b.data.year ?? 0;
      if (ay !== by) return by - ay;
      return a.data.title.localeCompare(b.data.title);
    })
  );
  eleventyConfig.addCollection("worksCurrent", c =>
    c.getFilteredByGlob("src/works/*.md").filter(p => !!p.data.current)
  );
  eleventyConfig.addCollection("worksEarlier", c =>
    c.getFilteredByGlob("src/works/*.md").filter(p => !p.data.current)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
