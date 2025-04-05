/**
*
* Opens the radix floating menu for changing the menu with Alt + '
* CURRENTLY ONLY WORKS WITH PROJECTS
* returns {void}
**/
function openGPTModelsRadixDropDown() {
  handle = ev => {
    if (!((ev.key === "'" || ev.keyCode === 192) && ev.altKey)) return;
    let id = "",
      id2 = "",
      shouldTryHover = true;
    const limit = 2000,
      modelsLabelList = /model/gi,
      queryForButton = () => {
        return [
          ...([...(document.querySelectorAll(".sticky") ?? [])]
            .find(e => e.querySelector("img") && e.querySelector("svg"))
            ?.querySelectorAll(".truncate") ?? []),
        ]
          .find(e => e.nextElementSibling instanceof SVGSVGElement)
          ?.closest("button");
      },
      queryForRadixDropDown = () => {
        const rps = Array.from(document.body.querySelectorAll("*")).filter(e =>
          e.hasAttribute("data-radix-popper-content-wrapper")
        );
        if (rps.length <= 1) return null;
        return document.getElementById(id);
      },
      queryForRadixMenuItem = rpdd => {
        if (!rpdd?.isConnected) rpdd = queryForRadixDropDown();
        if (!rpdd || (rpdd && !/new chat/gi.test(rpdd.innerText || "")))
          return null;
        const rmi = Array.from(rpdd.querySelectorAll('[role="menuitem"]')).find(
          e =>
            modelsLabelList.test(e.innerText || "") &&
            e.getAttribute("aria-controls") &&
            e.getAttribute("aria-haspopup")
        );
        id2 = rmi?.getAttribute("aria-controls");
        return rmi ?? null;
      },
      cleanUpRadixDropDown = () => {
        const rpdd = queryForRadixDropDown(),
          rmi = queryForRadixMenuItem(rpdd);
        if (!rmi && rpdd.dataset.state === "open") rpdd.dataset.state = "false";
      },
      setRadixAttrs = el => {
        el.setAttribute("data-state", "open");
        el.setAttribute("data-highlighted", "true");
        if (el.getAttribute("data-radix-collection-item")) {
          document.querySelectorAll("[data-radix-collection]").forEach(erc => {
            if (erc._radixCollectionState)
              erc._radixCollectionState.highlightedItem = item;
          });
        }
      };
    queryForRadixSecondaryMenuDropDown = () => {};
    let button = queryForButton();
    if (!button) return;
    if (button.dataset.state === "open" && !button.dataset.controls) {
      button.dataset.state = "closed";
      button.setAttribute("aria-expanded", "false");
    }
    const { width, height, bottom, right } = button.getBoundingClientRect(),
      cx = width - right * 0.5,
      cy = height - bottom * 0.5,
      attempt = () => {
        setTimeout(() => {
          const button = queryForButton();
          if (
            !(button instanceof HTMLElement) ||
            /radix/gi.test(button.getAttribute("aria-controls") || "")
          )
            return;
          button.dataset.state = "closed";
          button.setAttribute("aria-expanded", "false");
        }, limit);
        for (const el of [
          button, // * This one works just fine. The others are just fallback.
          // window,
          // document,
          // document.body,
          // document.querySelectorAll('.composer-parent[role="presentation"]')[0],
          // button.querySelector(".truncate"),
        ]) {
          for (const ev of [
            "pointerdown", // * This is the one that works currently. The other ones are fallbacks for future compatibility, including the react synthetic events.
            // "mousedown",
            // "pointerup",
            // "mouseup",
            // "click",
          ]) {
            setTimeout(() => {
              if (!(el instanceof EventTarget)) return;
              const button = queryForButton();
              if (
                !(button instanceof HTMLElement) ||
                /radix/gi.test(button.getAttribute("aria-controls") || "")
              )
                return;
              try {
                typeof el.focus === "function" && el.focus();
                el?.dispatchEvent(
                  new MouseEvent(ev, {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: cx,
                    clientY: cy,
                    target: el,
                    currentTarget: el,
                  })
                );
              } catch (e) {}
              if (
                button instanceof HTMLElement &&
                /radix/gi.test(button.getAttribute("aria-controls")) &&
                document.getElementById(button.getAttribute("aria-controls"))
              )
                id = button.getAttribute("aria-controls");
            }, 100);
            setTimeout(() => {
              if (el instanceof HTMLElement) el.click();
              // const reactPropsKey = Object.keys(el).find(
              //   k =>
              //     k.startsWith("__reactProps") ||
              //     k.startsWith("__reactEventHandlers")
              // );
              // if (reactPropsKey) {
              //   for (const re of [
              //     "onPointerDown",
              //     "onMouseDown",
              //     "onPointUp",
              //     "onMouseUp",
              //     "onClick",
              //   ]) {
              //     try {
              //       el[reactPropsKey]?.[`${re}`]?.({
              //         preventDefault: () => {},
              //         stopPropagation: () => {},
              //         nativeEvent: { clientX: x, clientY: y },
              //         target: el,
              //         currentTarget: el,
              //       });
              //     } catch (e) {}
              //     if (
              //       button instanceof HTMLElement &&
              //       /radix/gi.test(button.getAttribute("aria-controls")) &&
              //       document.getElementById(button.getAttribute("aria-controls"))
              //     )
              //       id = button.getAttribute("aria-controls");
              //   }
              // }
            }, 100);
          }
        }
      };
    if (button.dataset.state === "closed" || !button.dataset.state) {
      attempt();
    }
    setTimeout(() => {
      if (button.dataset.state === "closed") {
        button.dataset.state = "open";
        button.setAttribute("aria-expanded", "true");
        attempt();
      }
      const hvInterv = setInterval(() => {
          const hoverAttempt = () => {
            if (!shouldTryHover) return;
            const rmi = queryForRadixMenuItem(),
              rm = rmi?.closest('[role="menu"]');
            if (!rmi || !rm?.getAttribute("data-state")) return;
            const { width, height, left, top } = rmi.getBoundingClientRect();
            for (const el of [rm, ...rm.getElementsByTagName("div")]) {
              if (!el?.isConnected) continue;
              for (const ev of [
                "pointermove",
                // "pointerover",
                // "pointerenter",
                // "mousemove",
                // "mouseover",
                // "mouseenter",
              ]) {
                try {
                  if (el.className === rmi.className) {
                    let step = 4;
                    for (
                      let w = Math.floor(left - 10);
                      w < left + Math.ceil(width + 10);
                      w += step
                    ) {
                      for (
                        let h = Math.floor(top - 10);
                        h < top + Math.ceil(height + 10);
                        h += step
                      ) {
                        try {
                          if (!shouldTryHover) break;
                          typeof el.focus === "function" &&
                            el === rmi &&
                            el.focus();
                          const d2 = () => {
                            el.dispatchEvent(
                              new MouseEvent(ev, {
                                bubbles: true,
                                cancelable: true,
                                view: window,
                                clientX: w,
                                clientY: h,
                                target: el,
                                currentTarget: el,
                                isTrusted: true,
                                screenX: window.screenX + w,
                                screenY: window.screenY + h,
                                ...(ev.startsWith("pointer") && {
                                  pointerId: 1,
                                  pointerType: "mouse",
                                  isPrimary: true,
                                }),
                              })
                            );
                          };
                          if (rmi.hasAttribute("data-state")) {
                            setRadixAttrs(rmi);
                            setTimeout(d2, 25);
                          } else d2();
                          typeof el.click === "function" &&
                            el === rmi &&
                            el.click();
                        } catch (e) {}
                      }
                    }
                  }
                } catch (e) {}
              }
            }
          };
          hoverAttempt();
          setTimeout(() => {
            const rm = queryForRadixMenuItem()?.closest('[role="menu"]');
            if (
              !rm ||
              (rm instanceof HTMLElement && rm.dataset.state === "open")
            )
              return;
            rm.dataset.state = "open";
            hoverAttempt();
          }, 25);
        }, 25),
        chkInterv = setInterval(() => {
          const btn = queryForButton();
          if (
            !(btn instanceof HTMLElement) ||
            (btn instanceof HTMLElement &&
              !/radix/gi.test(button.getAttribute("aria-controls") || "")) ||
            document.getElementById(id2)
          )
            shouldTryHover = false;
        }, 100);
      setTimeout(() => {
        clearInterval(hvInterv);
        clearInterval(chkInterv);
        cleanUpRadixDropDown();
      }, limit * 1.25);
    }, 250);
  };
  window.addEventListener("keydown", handle);
}
