return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options, {
      highlight: "nord",
      font: "Marcher",
    });
  }

  style = async () => {
    const { modes } = this;
    return modes.render();
  };
};
