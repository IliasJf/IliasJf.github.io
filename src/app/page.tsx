/* eslint-disable @next/next/no-img-element -- static export: plain images, sized and lazy */
import { ARCHIVE, EXPERIENCE, FEATURED, LINKS, MORE, STACK, type Project } from "@/content";

const img = (name: string) => `/img/${name}.webp`;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function Header() {
  return (
    <>
      <a href="#work" className="skip">
        Skip to work
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <div className="wrap flex h-[var(--header-h)] items-center gap-6">
          <a href="#top" className="text-[1.125rem] font-extrabold tracking-[-0.03em] uppercase">
            Ilias Jafaoui
          </a>
          <nav aria-label="Sections" className="ms-auto hidden gap-7 font-semibold sm:flex">
            {[
              ["#work", "Work"],
              ["#about", "About"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="relative py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-200 hover:after:scale-x-100">
                {label}
              </a>
            ))}
          </nav>
          <a href={LINKS.linkedin} className="btn ms-auto !min-h-10 !px-5 sm:ms-0">
            Hire me
          </a>
        </div>
      </header>
    </>
  );
}

function Peek({ p, priority = false }: { p: Project; priority?: boolean }) {
  return (
    <a href={`#p-${p.slug}`} className="group block">
      <span className="block overflow-hidden rounded-[var(--radius)] bg-surface">
        <img src={img(p.image)} alt={p.alt} width={1440} height={900} fetchPriority={priority ? "high" : undefined} className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]" />
      </span>
      <span className="mt-2 flex items-center justify-between gap-3 text-small font-semibold">
        {p.name}
        <span className="text-muted transition-colors group-hover:text-ink">{p.stack[0]}</span>
      </span>
    </a>
  );
}

function Hero() {
  return (
    <section id="top" aria-labelledby="name" className="wrap grid items-center gap-10 pt-10 pb-[var(--gap-section)] lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[5fr_6fr] lg:gap-14 lg:pt-6">
      <div data-reveal>
        <p className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-small font-semibold">
          <span className="h-2 w-2 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-[#16a34a]" aria-hidden="true" />
          Open to remote work · Morocco
        </p>
        <h1 id="name" className="display mt-6 text-display">
          Ilias
          <br />
          Jafaoui
        </h1>
        <p className="mt-6 max-w-[34ch] text-lead font-semibold">Front-end developer. I build stores, booking apps and dashboards in React, Next.js and TypeScript that feel fast on every phone.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="btn">
            See my work
          </a>
          <a href={LINKS.linkedin} className="btn btn--plain">
            Message me on LinkedIn
          </a>
        </div>
        <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
          {[
            ["6", "live projects"],
            ["61", "automated tests"],
            ["3", "languages, incl. Arabic"],
          ].map(([n, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block text-[2.25rem] leading-none font-extrabold tracking-[-0.04em]">{n}</span>
                <span className="mt-1 block text-small text-muted">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The three featured projects at a glance, each a way in. */}
      <div className="grid gap-4" data-reveal>
        <Peek p={FEATURED[0]} priority />
        <div className="grid grid-cols-2 gap-3">
          <Peek p={FEATURED[1]} />
          <Peek p={FEATURED[2]} />
        </div>
      </div>
    </section>
  );
}

function Featured({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16" aria-labelledby={`p-${p.slug}`}>
      <a href={p.live ?? p.code} className={`group block overflow-hidden rounded-[var(--radius)] bg-surface ${flip ? "lg:order-2" : ""}`} data-reveal>
        <img src={img(p.image)} alt={p.alt} width={1440} height={900} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]" />
      </a>
      <div data-reveal>
        <p className="text-small font-semibold text-muted">
          {String(i + 1).padStart(2, "0")} · {p.year}
        </p>
        <h3 id={`p-${p.slug}`} className="mt-2 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-none font-extrabold tracking-[-0.035em] uppercase">
          {p.name}
        </h3>
        <p className="mt-4 max-w-[44ch] text-lead">{p.pitch}</p>
        <ul className="mt-6 grid gap-2.5">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.live && (
            <a href={p.live} className="btn">
              Open live demo <Arrow />
            </a>
          )}
          <a href={p.code} className="btn btn--plain">
            Read the code
          </a>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="wrap">
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-[var(--gap-section)]" data-reveal>
        <h2 id="work-title" className="head">
          Selected work
        </h2>
        <p className="max-w-[36ch] text-muted">Real apps you can open and use, each with its code and README on GitHub.</p>
      </div>
      <div className="mt-14 grid gap-[var(--gap-section)]">
        {FEATURED.map((p, i) => (
          <Featured key={p.slug} p={p} i={i} />
        ))}
      </div>

      <h2 className="head mt-[var(--gap-section)]" data-reveal>
        More projects
      </h2>
      <ul className="mt-10 grid gap-x-4 gap-y-12 md:grid-cols-3">
        {MORE.map((p) => (
          <li key={p.slug} data-reveal>
            <a href={p.live ?? p.code} className="group block overflow-hidden rounded-[var(--radius)] bg-surface">
              <img src={img(p.image)} alt={p.alt} width={1440} height={900} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]" />
            </a>
            <div>
              <h3 className="mt-4 text-[1.375rem] font-extrabold tracking-[-0.02em] uppercase">{p.name}</h3>
              <p className="mt-1 text-muted">{p.pitch}</p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-semibold">
                {p.live && (
                  <a href={p.live} className="link">
                    Live demo
                  </a>
                )}
                <a href={p.code} className="link">
                  Code
                </a>
                <span className="text-small font-normal text-muted">{p.stack.join(" · ")}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14" data-reveal>
        <h3 className="font-extrabold uppercase">Earlier work</h3>
        <ul className="mt-3 border-t border-line">
          {ARCHIVE.map((a) => (
            <li key={a.name}>
              <a href={a.code} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-4 transition-colors hover:text-muted sm:grid-cols-[1.2fr_1.5fr_1fr_auto]">
                <span className="font-bold">{a.name}</span>
                <span className="col-start-1 text-muted sm:col-start-auto">{a.what}</span>
                <span className="hidden text-muted sm:block">{a.stack}</span>
                <span className="col-start-2 row-span-2 row-start-1 self-center tabular-nums sm:col-start-auto sm:row-span-1">{a.year}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="wrap mt-[var(--gap-section)]">
      <div className="grid gap-12 border-t border-line pt-[var(--gap-section)] lg:grid-cols-[4fr_7fr] lg:gap-16">
        <div data-reveal>
          <img src={img("perfil")} alt="Ilias Jafaoui" width={700} height={700} loading="lazy" className="aspect-square w-full max-w-sm rounded-[var(--radius)] bg-surface object-cover" />
        </div>
        <div>
          <div data-reveal>
            <h2 id="about-title" className="head">
              About me
            </h2>
            <p className="mt-6 max-w-[56ch] text-lead">
              I&rsquo;m a front-end developer in Ben Slimane, Morocco. By day I&rsquo;m a Store Délégué at BIM, so I watch every day what makes a customer buy or walk out, and I bring that to every interface I build: answer people&rsquo;s questions before they have to ask.
            </p>
            <p className="mt-4 max-w-[56ch] text-muted">
              I care about the parts users never see but always feel: interfaces that are fast on a cheap phone, work with a keyboard and a screen reader, speak Arabic right to left, and logic covered by tests so it doesn&rsquo;t break.
            </p>
          </div>

          <h3 className="mt-14 font-extrabold uppercase" data-reveal>
            Experience
          </h3>
          <ol className="mt-4 border-t border-line">
            {EXPERIENCE.map((e) => (
              <li key={e.role} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8" data-reveal>
                <p className="text-small font-semibold text-muted tabular-nums">{e.when}</p>
                <div>
                  <p className="font-extrabold">
                    {e.role} <span className="font-normal text-muted">· {e.place}</span>
                  </p>
                  <p className="mt-1 max-w-[60ch] text-muted">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 font-extrabold uppercase" data-reveal>
            What I work with
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2" data-reveal>
            {STACK.map((s) => (
              <li key={s} className="chip !px-4 !py-2">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mt-[var(--gap-section)] bg-ink text-white">
      <div className="wrap grid gap-10 py-[var(--gap-section)] lg:grid-cols-[7fr_5fr] lg:items-end" data-reveal>
        <div>
          <h2 id="contact-title" className="display text-[clamp(3rem,1rem+7vw,8rem)]">
            Let&rsquo;s build
            <br />
            something
          </h2>
          <p className="mt-6 max-w-[40ch] text-lead text-[#c9c9cf]">Open to remote front-end roles and freelance projects, in any time zone. I usually reply within a day.</p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <a href={LINKS.linkedin} className="btn btn--light !min-h-14 w-full !text-lead sm:w-auto">
            Message me on LinkedIn <Arrow />
          </a>
          <a href={LINKS.github} className="btn btn--plain !min-h-14 w-full !border-white/40 !text-white hover:!border-white sm:w-auto">
            See my GitHub
          </a>
        </div>
      </div>
      <footer className="wrap flex flex-col gap-2 border-t border-white/15 py-6 text-small text-[#9a9aa2] sm:flex-row sm:justify-between">
        <p>© 2026 Ilias Jafaoui</p>
        <p>
          Built with Next.js and Tailwind ·{" "}
          <a className="link" href="https://github.com/IliasJf/IliasJf.github.io">
            Source
          </a>
        </p>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Contact />
    </>
  );
}
