// THESE FUNCTIONS ARE STILL UNDER DEVELOPMENT, DO NOT USE THEM

/* ChatGPT model change */
javascript: (() => {
  const queryForButton = () => {
    return [
      ...([...(document.querySelectorAll(".sticky") ?? [])]
        .find(
          e =>
            e.querySelector("img") && e.querySelector("svg")
        )
        ?.querySelectorAll(".truncate") ?? []),
    ]
      .find(
        e => e.nextElementSibling instanceof SVGSVGElement
      )
      ?.closest("button");
  };
  const button = queryForButton();
  if (!button) return "Did not found button";
  if (
    button.dataset.state === "open" &&
    !button.dataset.controls
  ) {
    button.dataset.state = "closed";
    button.setAttribute("aria-expanded", "false");
  }
  const { width, height, bottom, right } =
      button.getBoundingClientRect(),
    cx = width + right * 0.5,
    cy = height + bottom * 0.5,
    attempt = () => {
      setTimeout(() => {
        const button = queryForButton();
        if (
          !(button instanceof HTMLElement) ||
          /radix/gi.test(
            button.getAttribute("aria-controls") || ""
          )
        )
          return;
        button.dataset.state = "closed";
        button.setAttribute("aria-expanded", "false");
      }, 2_000);
      for (const ev of [
        "pointerdown",
        "mousedown",
        "pointerup",
        "mouseup",
        "click",
      ])
        for (const el of [
          window,
          document,
          document.body,
          document.querySelectorAll(
            '.composer-parent[role="presentation"]'
          )[0],
          button,
          button.querySelector(".truncate"),
        ]) {
          setTimeout(() => {
            if (!(el instanceof EventTarget)) return;
            const idf =
              el instanceof Element
                ? el.classList?.length > 0
                  ? `${el.tagName}.${el.className}`
                  : el.tagName
                : el instanceof Document
                ? "Document"
                : "Window";
            console.log(`Trying for ${idf}`);
            typeof el.focus === "function" && el.focus();
            el?.dispatchEvent(
              new MouseEvent(ev, {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: cx,
                clientY: cy,
              })
            );
            console.log(`Dispatched ${ev} for ${idf}`);
            if (el instanceof HTMLElement) {
              el.click();
              console.log("Directly clicked on " + idf);
            }
            const reactPropsKey = Object.keys(el).find(
              k =>
                k.startsWith("__reactProps") ||
                k.startsWith("__reactEventHandlers")
            );
            if (reactPropsKey) {
              for (const re of [
                onClick,
                onPointerDown,
                onMouseDown,
                onPointUp,
                onMouseUp,
              ]) {
                el[reactPropsKey]?.[`${re}`]?.({
                  preventDefault: () => {},
                  stopPropagation: () => {},
                  nativeEvent: { clientX: x, clientY: y },
                });
              }
              console.log(
                `Called React.SyntheticEvents on ${idf}`
              );
            }
          }, 100);
        }
    };
  if (
    button.dataset.state === "closed" ||
    !button.dataset.state
  ) {
    attempt();
    if (button.dataset.state === "closed") {
      button.dataset.state = "open";
      button.setAttribute("aria-expanded", "true");
      attempt();
    }
  } else return "Could not read dataset";
  return "Done";
})();

