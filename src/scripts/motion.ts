import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const ease = "power3.out";

  gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      duration: 1.1,
      ease: "power2.inOut",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
    gsap.from(el, {
      y: 16,
      opacity: 0,
      duration: 0.7,
      ease,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((el) => {
    const rows = el.querySelectorAll(".ui-tr:not(.ui-th)");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true } });
    tl.from(el, { y: 28, opacity: 0, filter: "blur(8px)", duration: 0.9, ease, clearProps: "filter" });
    if (rows.length) tl.from(rows, { opacity: 0, x: -6, duration: 0.4, stagger: 0.06, ease }, "-=0.45");
  });

  const line = document.querySelector<SVGPathElement>("[data-chart-line]");
  if (line) {
    const len = line.getTotalLength();
    gsap.fromTo(
      line,
      { strokeDasharray: len, strokeDashoffset: len },
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: line, start: "top 80%", once: true },
      },
    );
  }
});

mm.add("(hover: hover) and (pointer: fine)", () => {
  const onMove = (e: PointerEvent) => {
    const frame = (e.target as Element | null)?.closest<HTMLElement>(".frame");
    if (!frame) return;
    const r = frame.getBoundingClientRect();
    frame.style.setProperty("--mx", `${e.clientX - r.left}px`);
    frame.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  document.addEventListener("pointermove", onMove, { passive: true });
  return () => document.removeEventListener("pointermove", onMove);
});
