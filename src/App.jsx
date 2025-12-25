import { useEffect, useState } from "react";
import ar from "./locales/ar.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const translations = { en, ar, ru };
const languageOptions = [
  { code: "en", label: en.meta.label, name: en.meta.name },
  { code: "ar", label: ar.meta.label, name: ar.meta.name },
  { code: "ru", label: ru.meta.label, name: ru.meta.name }
];

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "en";
  }
  const stored = window.localStorage.getItem("lang");
  if (stored && translations[stored]) {
    return stored;
  }
  const browserLang = window.navigator.languages?.[0] || window.navigator.language || "en";
  const normalized = browserLang.toLowerCase();
  if (normalized.startsWith("ar")) {
    return "ar";
  }
  if (normalized.startsWith("ru")) {
    return "ru";
  }
  return "en";
};

export default function App() {
  const base = import.meta.env.BASE_URL || "/";
  const asset = (path) => `${base}assets/${path}`;
  const projectImageStyle = (path) => ({ "--project-image": `url('${asset(path)}')` });

  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = translations[language] || translations.en;
  const menuClass = menuOpen ? "menu-links open" : "menu-links";
  const iconClass = menuOpen ? "hamburger-icon open" : "hamburger-icon";
  const themeClass = theme === "dark" ? "theme-toggle theme-toggle--dark" : "theme-toggle";
  const themeLabel = theme === "dark" ? t.ui.themeDark : t.ui.themeLight;
  const experienceGroups = [t.experience.llm, t.experience.automation, t.experience.frontend];

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = t.meta.code;
    document.documentElement.dir = t.meta.dir;
  }, [t.meta.code, t.meta.dir]);

  const handleMenuToggle = () => {
    setMenuOpen((open) => !open);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", next);
      }
      return next;
    });
  };

  const handleLanguageChange = (code) => {
    setLanguage(code);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", code);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {t.ui.skip}
      </a>

      <nav id="desktop-nav" className="nav">
        <div className="nav-content">
          <a className="logo" href="#profile">
            MAJID
          </a>
          <div className="nav-actions">
            <ul className="nav-links">
              <li>
                <a href="#about">{t.nav.about}</a>
              </li>
              <li>
                <a href="#experience">{t.nav.experience}</a>
              </li>
              <li>
                <a href="#projects">{t.nav.projects}</a>
              </li>
              <li>
                <a href="#contact">{t.nav.contact}</a>
              </li>
            </ul>
            <div className="nav-controls">
              <div className="lang-switch" role="group" aria-label={t.ui.language}>
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={
                      option.code === language ? "lang-switch__btn is-active" : "lang-switch__btn"
                    }
                    aria-pressed={option.code === language}
                    title={option.name}
                    onClick={() => handleLanguageChange(option.code)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <button
                className={themeClass}
                type="button"
                aria-pressed={theme === "dark"}
                aria-label={t.ui.themeToggle}
                onClick={handleThemeToggle}
              >
                <span className="theme-toggle__label">{themeLabel}</span>
                <span className="theme-toggle__track" aria-hidden="true">
                  <span className="theme-toggle__thumb"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav id="hamburger-nav" className="nav">
        <div className="nav-content">
          <a className="logo" href="#profile">
            MAJID
          </a>
          <div className="nav-actions">
            <div className="nav-controls">
              <div className="lang-switch lang-switch--compact" role="group" aria-label={t.ui.language}>
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={
                      option.code === language ? "lang-switch__btn is-active" : "lang-switch__btn"
                    }
                    aria-pressed={option.code === language}
                    title={option.name}
                    onClick={() => handleLanguageChange(option.code)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <button
                className={`${themeClass} theme-toggle--compact`}
                type="button"
                aria-pressed={theme === "dark"}
                aria-label={t.ui.themeToggle}
                onClick={handleThemeToggle}
              >
                <span className="theme-toggle__label">{themeLabel}</span>
                <span className="theme-toggle__track" aria-hidden="true">
                  <span className="theme-toggle__thumb"></span>
                </span>
              </button>
            </div>
            <div className="hamburger-menu">
              <button
                className={iconClass}
                type="button"
                aria-label={t.ui.menuToggle}
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                onClick={handleMenuToggle}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <ul className={menuClass} id="mobile-menu">
                <li>
                  <a href="#about" onClick={handleMenuClose}>
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#experience" onClick={handleMenuClose}>
                    {t.nav.experience}
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={handleMenuClose}>
                    {t.nav.projects}
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={handleMenuClose}>
                    {t.nav.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main id="main">
        <section id="profile">
          <div className="section__pic-container profile-media">
            <img
              src={asset("photo_2025-01-19_05-14-39.jpg")}
              alt={t.hero.imageAlt}
              width="320"
              height="320"
              decoding="async"
            />
          </div>
          <div className="section__text">
            <p className="section__text__p1">{t.hero.eyebrow}</p>
            <div className="hero-badges">
              {t.hero.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={badge.variant === "outline" ? "pill pill--outline" : "pill"}
                >
                  {badge.label}
                </span>
              ))}
            </div>
            <h1 className="title">{t.hero.name}</h1>
            <p className="section__text__p2">{t.hero.title}</p>
            <p className="section__text__p3">{t.hero.subtitle}</p>
            <div className="btn-container">
              <a
                className="btn btn-color-2"
                href={asset("majid-albadwi-resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.cta.resume}
              </a>
              <a className="btn btn-color-1" href="#contact">
                {t.hero.cta.contact}
              </a>
            </div>
            <div className="hero-highlights">
              {t.hero.highlights.map((item) => (
                <div className="highlight-card" key={item.value}>
                  <p className="highlight-value">{item.value}</p>
                  <p className="highlight-label">{item.label}</p>
                </div>
              ))}
            </div>
            <div id="socials-container">
              <a
                href="https://www.linkedin.com/in/majid-albadwi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img
                  src={asset("linkedin.png")}
                  alt=""
                  className="icon"
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href="https://github.com/ALBADWIMAJID"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <img
                  src={asset("github.png")}
                  alt=""
                  className="icon"
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </section>

        <section id="about">
          <p className="section__text__p1">{t.about.eyebrow}</p>
          <h2 className="title">{t.about.title}</h2>
          <div className="section-container">
            <div className="section__pic-container">
              <div className="about-card" aria-label={t.about.card.role}>
                <div className="about-card__top">
                  <div className="about-card__avatar" aria-hidden="true">
                    MA
                  </div>
                  <div>
                    <p className="about-card__name">{t.about.card.name}</p>
                    <p className="about-card__role">{t.about.card.role}</p>
                  </div>
                </div>
                <div className="about-card__meta">
                  {t.about.card.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="about-card__divider" aria-hidden="true"></div>
                <ul className="about-card__list">
                  {t.about.card.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="about-card__footer">{t.about.card.footer}</div>
              </div>
            </div>
            <div className="about-details-container">
              <div className="about-containers">
                <div className="details-container">
                  <img
                    src={asset("experience.png")}
                    alt=""
                    className="icon"
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t.about.info.experienceTitle}</h3>
                  <p>{t.about.info.experienceText}</p>
                </div>
                <div className="details-container">
                  <img
                    src={asset("education.png")}
                    alt=""
                    className="icon"
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t.about.info.educationTitle}</h3>
                  <p>{t.about.info.educationText}</p>
                </div>
              </div>
              <div className="text-container">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience">
          <p className="section__text__p1">{t.experience.eyebrow}</p>
          <h2 className="title">{t.experience.title}</h2>
          <div className="experience-details-container">
            <div className="about-containers">
              {experienceGroups.map((group) => (
                <div className="details-container" key={group.title}>
                  <h3 className="experience-sub-title">{group.title}</h3>
                  <div className="article-container">
                    {group.skills.map((skill) => (
                      <article key={skill.name}>
                        <img
                          src={asset("checkmark.png")}
                          alt=""
                          className="icon"
                          width="20"
                          height="20"
                          loading="lazy"
                          decoding="async"
                        />
                        <div>
                          <h4>{skill.name}</h4>
                          <p>{skill.level}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <p className="section__text__p1">{t.projects.eyebrow}</p>
          <h2 className="title">{t.projects.title}</h2>
          <div className="experience-details-container">
            <div className="projects-grid">
              {t.projects.items.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-media" style={projectImageStyle(project.image)}>
                    <img
                      src={asset(project.image)}
                      alt={project.alt}
                      className="project-img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="project-badges">
                      {project.badges.map((badge, index) => (
                        <span
                          className={index === 1 ? "project-badge project-badge--accent" : "project-badge"}
                          key={badge}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="project-body">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      {project.links.map((link) => (
                        <a
                          key={link.url}
                          className="btn btn-color-2 project-btn"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact">
          <p className="section__text__p1">{t.contact.eyebrow}</p>
          <h2 className="title">{t.contact.title}</h2>
          <div className="contact-info-upper-container">
            <div className="contact-info-container">
              <img
                src={asset("email.png")}
                alt=""
                className="icon contact-icon email-icon"
                width="28"
                height="28"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{t.contact.email}</h3>
                <p>
                  <a href="mailto:albadwimajid755@gmail.com">albadwimajid755@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="contact-info-container">
              <img
                src={asset("whatsapp.png")}
                alt=""
                className="icon contact-icon"
                width="28"
                height="28"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{t.contact.whatsapp}</h3>
                <p>
                  <a href="https://wa.me/79197995592" target="_blank" rel="noopener noreferrer">
                    +7 919 799 5592
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-info-container">
              <img
                src={asset("vk.png")}
                alt=""
                className="icon contact-icon"
                width="28"
                height="28"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{t.contact.vk}</h3>
                <p>
                  <a href="https://vk.com/albadwi0" target="_blank" rel="noopener noreferrer">
                    vk.com/albadwi0
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-info-container">
              <img
                src={asset("instagram.png")}
                alt=""
                className="icon contact-icon"
                width="28"
                height="28"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{t.contact.instagram}</h3>
                <p>
                  <a href="https://www.instagram.com/majid.albadwi" target="_blank" rel="noopener noreferrer">
                    @majid.albadwi
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <nav>
          <div className="nav-links-container">
            <ul className="nav-links">
              <li>
                <a href="#about">{t.nav.about}</a>
              </li>
              <li>
                <a href="#experience">{t.nav.experience}</a>
              </li>
              <li>
                <a href="#projects">{t.nav.projects}</a>
              </li>
              <li>
                <a href="#contact">{t.nav.contact}</a>
              </li>
            </ul>
          </div>
        </nav>
        <p>{t.footer.copyright}</p>
      </footer>
    </>
  );
}
