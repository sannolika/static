
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-email-user][data-email-domain]").forEach(node => {
    const user = node.getAttribute("data-email-user");
    const domain = node.getAttribute("data-email-domain");
    const address = `${user}@${domain}`;

    // Replace href only — keep visible text unchanged
    node.setAttribute("href", `mailto:${address}`);
  });
});
