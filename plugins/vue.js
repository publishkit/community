return class Plugin extends BasePlugin {
  constructor(id, options) {
    super(id, options, {
      mount: "#app",
    });
  }

  deps = ["https://unpkg.com/vue@3/dist/vue.global.js"];

  bind = async () => {
    const { Vue } = window;
    const { options } = this;

    const data = () => {
      message: "Hello Vue!";
    };

    Vue.createApp({ data }).mount(options.mount);
  };
};
