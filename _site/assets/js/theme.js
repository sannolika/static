
(function () {
  const KEY="theme", root=document.documentElement, btn=document.getElementById("theme");
  const stored=localStorage.getItem(KEY), prefers=matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefers ? "dark" : "light");
  if (initial==="dark") root.setAttribute("data-theme","dark");
  btn && btn.addEventListener("click", ()=>{
    const isDark = root.getAttribute("data-theme")==="dark";
    if (isDark){ root.removeAttribute("data-theme"); localStorage.setItem(KEY,"light"); }
    else { root.setAttribute("data-theme","dark"); localStorage.setItem(KEY,"dark"); }
  });
})();
