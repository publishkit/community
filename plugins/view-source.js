return class Plugin extends BasePlugin {
    constructor(id, options) {
      super(id, options, {
        base: "https://github.com/publishkit/vault/blob/main",
      });
    }

    render = async () => {
        const { options, ui, app } = this;
    
        ui.addAction("run", {
          text: "view on github",
          icon: "bx-code"
        });
      };
    
      bind = async () => {
        const { options, ui } = this;
        const action = ui.get("run");

        
        action.el.on("click", (e) => {
          e.preventDefault();
          console.log('helllo')
        });
    
        // select.on("change", function () {
        //   code.html(options.data[this.value]);
        //   window.$theme?.highlightCode(code[0])
        // });
      };
  };
  