return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options);
    this.options = this.utils.o.merge(
      {
        highlight: "an-old-hope",
        font: "Marcher",
        headings: {
          font: "Marcher",
        },
      },
      this.options
    );
  }

  bind = async () => {
    const { options, utils } = this;

    const font = options.font?.trim().replaceAll(" ", "-").toLowerCase();
    const headingsFont = options.headings?.font
      ?.trim()
      .replaceAll(" ", "-")
      .toLowerCase();

    if (font) utils.dom.addStylesheet(`https://fonts.cdnfonts.com/css/${font}`);

    if (headingsFont && headingsFont != font)
      utils.dom.addStylesheet(`https://fonts.cdnfonts.com/css/${headingsFont}`);

    if (options.highlight) {
      await utils.dom.addScript(
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"
      );
      await utils.dom.addStylesheet(
        `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/${options.highlight}.min.css`
      );
      (function wait() {
        if (!window.hljs) {
          setTimeout(wait, 100);
        } else {
          window.hljs.configure({
            ignoreUnescapedHTML: true,
          });

          document.querySelectorAll("pre code").forEach((el) => {
            window.hljs.highlightElement(el);
          });
        }
      })();
    }
  };

  style = async () => {
    const { options, utils } = this;

    const primary = utils.w.colorToHsl(options.primary);

    const css = `
      :root[data-theme=dark], :root:not([data-theme=dark]), [data-theme=dark], [data-theme=light] { 
        --font-family: ${options.font}, sans-serif;
        --headings-font-family: ${options.headings?.font}, sans-serif;

        ${
          options.primary
            ? `
            --primary-hue: ${primary.h};
            --primary-sat: ${primary.s}%;
            --primary-lig: ${primary.l}%;
            `
            : ""
        }

        .left-bar {
          background: var(--card-background-color);
        }

        --icon-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${primary.hex.replace(
          "#",
          "%23"
        )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        
        --icon-date: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${primary.hex.replace(
          "#",
          "%23"
        )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
        
        --icon-search: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${primary.hex.replace(
          "#",
          "%23"
        )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
        
        --icon-time: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${primary.hex.replace(
          "#",
          "%23"
        )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E");

        --icon-close: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${primary.hex.replace(
          "#",
          "%23"
        )}' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E");
      }
    `;

    return css;
  };
};
