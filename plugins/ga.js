return class Plugin extends BasePlugin {
  constructor(id, options) {
    super(id, options);
    this.defaults({
      id: "", // google tracking id
      //pageview: false
    });
  }

  init = async () => {
    const { options, utils } = this;
    const byPassLocahost = utils.w.isLocalhost() ? options.localhost : true;
    return !!(byPassLocahost && this.options.id);
  };

  bind = async () => {
    const { id } = this.options;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    // @ts-ignore
    gtag("js", new Date());
    // @ts-ignore
    gtag("config", id);

    if (this.options.pageview) gtag("event", "page_view");

    this.utils.dom.load(
      `https://www.googletagmanager.com/gtag/js?id=${id}`
    );
  };
};
