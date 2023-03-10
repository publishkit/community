return class Plugin extends BasePlugin {
  constructor(id, options) {
    super(id, options, {
      pill: "#0F0",
      speed: 35,
      fontsize: 10,
    });
  }

  render = async () => {
    this.ui.addElement("canvas", "body",`<canvas></canvas>`);
  };

  bind = async () => {
    this.matrix();
  };

  style = async () => `
    [id="matrix-bg.canvas"] {
      position: absolute; 
      z-index: -1;
    }
  `;

  matrix = () => {
    const { ui, utils, options } = this;

    var c = ui.get("canvas").el.get(0);
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

      ctx.fillStyle = options.pill; //green text
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

    setInterval(draw, options.speed);
  };
};
