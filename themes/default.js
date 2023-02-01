return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options);
    this.defaults({
      highlight: "an-old-hope",
      font: "Marcher",
    });

    this.setup();
  }
  
  style = this.theme.render;

  allMode = ({ options }) => `
    .left-bar {
        background: var(--card-background-color);
    }
  `;
};
