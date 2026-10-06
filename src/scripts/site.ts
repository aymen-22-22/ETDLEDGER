const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealed = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (reduce || !("IntersectionObserver" in window)) {
  revealed.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  revealed.forEach((el) => io.observe(el));
}

document.addEventListener("click", async (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>("[data-copy]");
  if (!btn) return;
  const pre = btn.closest(".code")?.querySelector("pre");
  if (!pre) return;
  const text = [...pre.innerText.split("\n")].filter((l) => !l.trim().startsWith("#")).join("\n").trim();
  try {
    await navigator.clipboard.writeText(text);
    const label = btn.querySelector("span");
    if (label) {
      label.textContent = "Copied";
      setTimeout(() => (label.textContent = "Copy"), 1600);
    }
  } catch {}
});
