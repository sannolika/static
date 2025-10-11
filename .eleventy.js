const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Static assets
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});

  // Nunjucks date filter: supports "now" or any Date/string
  eleventyConfig.addNunjucksFilter("date", (value, format = "yyyy") => {
    let d;
    if (!value || value === "now") d = new Date();
    else if (value instanceof Date) d = value;
    else d = new Date(value);
    return DateTime.fromJSDate(d).toFormat(format);
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
