return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options);
    this.options = this.utils.o.merge(
      {
        primary: "#0F0",
        animate: 35,
        font: "monospace",
        headings: {
          font: "Gosper",
        },
      },
      this.options
    );
  }

  render = async () => {
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

    // add canvas to body
    if (options.animate)
      this.ui.addElement("body", "canvas", `<canvas></canvas>`);
  };

  bind = async () => {
    const { options } = this;

    if (options.animate)
      setTimeout(() => {
        this.matrix();
      }, 1000);
  };

  style = async () => {
    const { options, utils } = this;

    const hasPrimary = options.pill || options.primary;
    const primary = hasPrimary && utils.w.colorToHsl(hasPrimary);

    const css = `
      [id="body.theme.canvas"] canvas {
        position: absolute; 
        z-index: -1;
      }

      :root[data-theme=dark], :root:not([data-theme=dark]), [data-theme=dark], [data-theme=light] { 
        --font-family: ${options.font}, sans-serif;
        --headings-font-family: ${options.headings?.font}, sans-serif;

        ${
          primary
            ? `
            --color-hue: ${primary.h};
            --color-sat: ${primary.s}%;
            --color-lig: ${primary.l}%;
            --primary-hue: ${primary.h};
            --primary-sat: ${primary.s}%;
            --primary-lig: ${primary.l}%;
            `
            : ""
        }
      
        --bg: #000;
        --fs: 1rem;
        --secondary: hsl(var(--primary-hue) 100% 60% / .3);
        --card-background-color: hsl(var(--color-hue) 0% 0% / 0.8);
        --border-radius: 0;
        --dropdown-hover-background-color: var(--primary);
        --dropdown-hover-color: #000;

        [role="document"], .left-bar, .right-bar {
          background: var(--card-background-color);
        }

        @media (min-width: 576px) {
          [role="document"] {
            margin-top: 24px;
          }
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

  // this function is credited to some dude on reddit, it has been forked many times so can trace oriagnal. nice work !
  matrix = () => {
    const { ui, utils, options } = this;

    var c = ui.getElement("body", "canvas").el.find("canvas").get(0);
    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = utils.w.pageHeight();
    c.width = window.innerWidth;

    //chinese characters - taken from the unicode charset
    var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    //converting the string into an array of single characters
    matrix = matrix.split("");

    var fontsize = options.fontsize || 10;
    var columns = c.width / fontsize; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++) drops[x] = 1;

    //drawing the characters
    function draw() {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = options.pill || options.primary; //green text
      ctx.font = fontsize + "px arial";
      //looping over drops
      for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        //x = i*fontsize, y = value of drops[i]*fontsize
        ctx.fillText(text, i * fontsize, drops[i] * fontsize);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontsize > c.height && Math.random() > 0.975)
          drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
      }
    }

    setInterval(draw, options.animate);
  };
};
