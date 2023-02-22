# Community plugins & themes

Use any of the plugins by refencing them in your `kitrc`:

```
plugins:
  theme: "@matrix"
  ga: "@ga"
  stripe: "@stripe"
```

And add options like this:

```
theme:
  bg: red
  primary: "#0f0"
  headings.font: monospace

stripe:
  id: xxx
  currency: eur
```