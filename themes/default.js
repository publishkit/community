return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options, {
      highlight: "nord",
      font: "Marcher",
    });
  }

  style = async () => {
    const { modes } = this;

    modes.css("all", `
      .ui-left {
          background: var(--card-background-color);
      }
    `);

    return modes.render();
  };
};
