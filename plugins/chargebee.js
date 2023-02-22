return class Plugin extends BasePlugin {
  constructor(id, options) {
    super(id, options, { site: "" });
  }

  instance = {};
  portal = {};

  bind = async () => {
    const { options, utils } = this;
    if (!options.site) return;
    const script = await utils.dom.load(`https://js.chargebee.com/v2/chargebee.js`, {
      props: { "data-cb-site": options.site },
    });

    this.instance = Chargebee.getInstance();
    this.portal = this.instance.createChargebeePortal()
  };

  style = async () => `
    #cb-container {
        backdrop-filter: var(--modal-overlay-backdrop-filter);
        background: var(--modal-overlay-background-color) !important;
    }
  `
};