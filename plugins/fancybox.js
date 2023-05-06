// author: zdaar
// email: daveloper@protonmail.com
return class FancyBoxPlugin extends BasePlugin {
  constructor(id, options) {
    super(id, options);
    this.deps = [
      "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js",
      "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css",
    ];
  }

  transform = async () => {
    const { $dom } = window;
    const { log } = this
    // this plugin only transforms images in the content area
    const images = $dom.body.find(".ui-content img");

    images.each(function () {
      const img = $(this);
      const src = img.attr("src");
      img.wrap(`<a href="${src}" data-fancybox="image-gallery"></a>`);
    });
  };

  bind = async () => {
    Fancybox.bind('[data-fancybox="image-gallery"]', {
      resizeDuration: 200,
      wrapAround: true,
    });
  };
};
