document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- the website check: a receipt that prints as you answer ---------- */
(() => {
  const form = document.getElementById("checkForm");
  if (!form) return;
  const labels = ["Google Maps", "Website", "Works on a phone", "Opening hours", "One-tap call", "Products and prices"];
  const fixes = [
    "Put your business on Google Maps with photos and the right hours. It is free and it is where most people look first.",
    "Get a one-page website that says what you sell, where you are and how to reach you.",
    "Make your site easy to read on a phone. That is where almost every customer will open it.",
    "Put your opening hours online and keep them correct, so nobody arrives at a closed door.",
    "Add a button that calls you or opens WhatsApp with one tap.",
    "Show a few products or prices, so people know you have what they need before they come.",
  ];
  const name = document.getElementById("shopName");
  const rShop = document.getElementById("rShop");
  const rItems = document.querySelectorAll("#rItems dd");
  const rScore = document.getElementById("rScore");
  const rFix = document.getElementById("rFix");
  const rSend = document.getElementById("rSend");
  const rNote = document.getElementById("rNote");
  const rDate = document.getElementById("rDate");

  rDate.textContent = "Website check · " + new Date().toLocaleDateString("fr-MA");

  const read = () => labels.map((_, i) => {
    const v = form.querySelector(`input[name="q${i}"]:checked`);
    return v ? v.value === "1" : null;
  });

  const summary = () => {
    const answers = read();
    const lines = answers.map((a, i) => `${labels[i]}: ${a === null ? "?" : a ? "OK" : "to fix"}`);
    return `Hi Ilias, here is my website check for ${name.value.trim() || "my business"}.\n${lines.join("\n")}\nScore: ${rScore.textContent}`;
  };

  const update = () => {
    const answers = read();
    rShop.textContent = name.value.trim() || "Your business";
    let score = 0;
    answers.forEach((a, i) => {
      const dd = rItems[i];
      dd.classList.toggle("is-ok", a === true);
      dd.classList.toggle("is-fix", a === false);
      dd.textContent = a === null ? "—" : a ? "OK" : "Fix";
      if (a) score++;
    });
    rScore.textContent = `${score} / 6`;
    const first = answers.findIndex((a) => a === false);
    const done = answers.every((a) => a !== null);
    if (first >= 0) rFix.textContent = "First fix: " + fixes[first];
    else if (done) rFix.textContent = "Everything is in place. Send it over and I'll look for smaller wins, like speed and photos.";
    else rFix.textContent = "Answer the questions to see the first thing to fix.";
  };

  form.addEventListener("input", update);
  form.addEventListener("change", (e) => {
    update();
    if (window.gsap && e.target.type === "radio" && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const dd = rItems[Number(e.target.name.slice(1))];
      gsap.fromTo(dd, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
    }
  });
  form.addEventListener("submit", (e) => e.preventDefault());

  rSend.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summary());
      rNote.textContent = "Copied. Paste it in a message to me on LinkedIn.";
    } catch {
      rNote.textContent = "Opening LinkedIn. Tell me your business name and your score.";
    }
  });
})();

/* ---------- motion ---------- */
(() => {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("js");

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // The receipt prints: the paper feeds out from the top, then each line lands.
    const card = document.querySelector(".hero__card");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(card, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "steps(14)" })
      .from(card.querySelectorAll("[data-print]"), { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.7")
      .from(".hero__photo", { scale: 1.12, duration: 2.4, ease: "power2.out" }, 0);

    gsap.to(".hero__photo", {
      yPercent: 12, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    gsap.fromTo(".visit__photo", { scale: 1.15 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: ".visit", start: "top bottom", end: "bottom top", scrub: true },
    });

    // Each section's parts rise in turn: heading, text, picture.
    ScrollTrigger.batch("[data-rise]", {
      start: "top 88%", once: true,
      onEnter: (els) => gsap.from(els, { y: 28, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }),
    });

  });

  // Services: cards slide in from the right and fold the earlier ones into spines.
  mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
    document.documentElement.classList.add("js-deck");
    const section = document.querySelector(".deck");
    const wrap = section.querySelector(".deck__cards");
    const cards = gsap.utils.toArray(".deck .card");
    const n = cards.length;
    let cardW = 620, spine = 120, W = 0;

    const layout = () => {
      W = wrap.clientWidth;
      cardW = Math.min(620, W * 0.62);
      spine = Math.min(120, (W - cardW) / (n - 1));
      cards.forEach((c) => { c.style.width = cardW + "px"; c.style.setProperty("--spine", spine + "px"); c.dataset.spine = c.querySelector("h3").textContent; });
    };

    const place = (p) => {
      const k = p * (n - 1);
      cards.forEach((c, i) => {
        const t = i === 0 ? 1 : gsap.utils.clamp(0, 1, k - (i - 1));
        const x = gsap.utils.interpolate(W + 40, i * spine, gsap.parseEase("power2.inOut")(t));
        gsap.set(c, { x, zIndex: i + 1 });
        c.classList.toggle("is-spine", k - i >= 0.55);
      });
    };

    layout();
    const st = ScrollTrigger.create({
      trigger: section, start: "top top", end: "bottom bottom", scrub: 0.4,
      onUpdate: (self) => place(self.progress),
      onRefresh: (self) => { layout(); place(self.progress); },
    });
    place(0);

    const onClick = (e) => {
      const c = e.target.closest(".card");
      if (!c || !c.classList.contains("is-spine") || e.target.closest("a")) return;
      const i = cards.indexOf(c);
      window.scrollTo({ top: st.start + (i / (n - 1)) * (st.end - st.start), behavior: "smooth" });
    };
    wrap.addEventListener("click", onClick);

    return () => {
      wrap.removeEventListener("click", onClick);
      document.documentElement.classList.remove("js-deck");
      cards.forEach((c) => { c.style.width = ""; gsap.set(c, { clearProps: "all" }); c.classList.remove("is-spine"); });
    };
  });
})();
