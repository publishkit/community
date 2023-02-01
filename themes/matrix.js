return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options);
    this.defaults({
      primary: "#0F0",
      animate: 35,
      font: "monospace",
      headings: {
        font: "Gosper",
      },
    });

    this.setup();
  }

  style = this.theme.render;

  render = async () => {
    // add canvas to body
    if (this.options.animate)
      this.ui.addElement("body", "canvas", `<canvas></canvas>`);
  };

  bind = async () => {
    if (this.options.animate) this.matrix();
  };

  allMode = ({ options }) => `
    --bg: #000;
    --fs: 1rem;
    --color: var(--primary);
    --secondary: hsl(var(--primary-hue) 100% 60% / .3);
    --secondary-hover: hsl(var(--primary-hue) 100% 60% / .6);
    --card-background-color: hsl(var(--color-hue) 0% 0% / 0.8);
    --dropdown-hover-background-color: var(--primary);
    --dropdown-hover-color: #000;
    --border-radius: 0;
    --mark-color: #000;

    [role="document"], .left-bar, .right-bar {
        background: var(--card-background-color);
    }

    @media (min-width: 576px) {
        [role="document"] {
            margin-top: 20px;
        }
    }

    [id="body.theme.canvas"] canvas {
        position: absolute; 
        z-index: -1;
    }
  `;

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
