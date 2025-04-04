// THESE FUNCTIONS ARE STILL UNDER DEVELOPMENT, DO NOT USE THEM

/* ChatGPT model change */
javascript:(() => {
  const button = [
    ...[...document.querySelectorAll(".sticky")]
      .find((e) => e.querySelector("img") && e.querySelector("svg"))
      ?.querySelectorAll(".truncate"),
  ]
    .find((e) => e.nextElementSibling instanceof SVGSVGElement)
    ?.closest("button");
  if (!button) return "Did not found button";
  if (button.dataset.state === "open" && !button.dataset.controls) {
    button.dataset.state = "closed";
    button.setAttribute("aria-expanded", "false");
  }
  const { width, height, bottom, right } = button.getBoundingClientRect(),
    cx = width + right * 0.5,
    cy = height + bottom * 0.5,
    attempt = () => {
      for (const ev of ["mousedown", "mouseup", "click"])
        for (const el of [
          window,
          document,
          document.body,
          button,
          button.querySelector(".truncate"),
        ]) {
          console.log(
            `Trying for ${
              el.tagName ?? el instanceof Document ? "Document" : "Window"
            }`
          );
          el?.dispatchEvent(
            new MouseEvent(ev, {
              bubbles: true,
              cancelable: true,
              view: window,
              clientX: cx,
              clientY: cy,
            })
          );
          el instanceof HTMLElement && el.click();
          const reactPropsKey = Object.keys(button).find(
            (k) =>
              k.startsWith("__reactProps") ||
              k.startsWith("__reactEventHandlers")
          );
          if (reactPropsKey) button[reactPropsKey]?.onClick?.();
        }
    };
  if (button.dataset.state === "closed" || !button.dataset.state) {
    attempt();
    if (button.dataset.state === "closed") {
      button.dataset.state = "open";
      button.setAttribute("aria-expanded", "true");
      attempt();
    }
  } else return "Could not read dataset";
  return "Done";
})();
