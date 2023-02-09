return class Plugin extends BasePlugin {
  constructor(id, options) {
    super(id, options, {
      id: "", // google tracking id
      events: [], // trigger extra events on load (ex: page_view)
      localhost: false // include script on localhost
    });
  }

  init = async () => {
    const { options, utils } = this;
    const byPassLocahost = utils.w.isLocalhost() ? options.localhost : true;
    return !!(byPassLocahost && options.id);
  };

  bind = async () => {
    const { options, utils } = this;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    // @ts-ignore
    gtag("js", new Date());
    // @ts-ignore
    gtag("config", options.id);

    // trigger events
    options.events.map((event) => gtag("event", event));

    // load gtag lib
    utils.dom.load(`https://www.googletagmanager.com/gtag/js?id=${options.id}`);
  };
};
