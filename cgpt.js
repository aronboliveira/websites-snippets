/**
*
* Opens the radix floating menu for changing the menu with Alt + '
* Choose the model with indexed menuitems by using Alt + [number, from 1 to 9]
* returns {void}
**/
function openGPTModelsRadixDropDown() {
  let id = "",
    id2 = "",
    shouldTryHover = true,
    pageCase = 1;
  const limit = 2000,
    modelsLabelList =
      /(model|modelo|modèle|modello|Modell|μοντέλο|モデル|모델|โมเดล|mô[\s-]?hình|модель|نموذج|מודל|मॉडल|মডেল|模型|模型)/gi,
    endingCleanup = () => {
      cleanUpRadixDropDown();
      const btn = queryForButton();
      if (btn) {
        btn.dataset.state = "closed";
        btn.setAttribute("aria-expanded", "false");
      }
      shouldTryHover = true;
      for (const v in ["id", "id2", "shouldTryHover", "pageCase"])
        delete window[v];
      if (id) id = "";
      if (id2) id2 = "";
      if (typeof shouldTryHover === "boolean") shouldTryHover = true;
      if (pageCase) pageCase = 1;
    },
    queryForSecondaryRadixMenu = () => {
      return Array.from(
        document.querySelectorAll("[data-radix-popper-content-wrapper]")
      )
        .find(e =>
          /(more|más|plus|altro|mehr|meer|περισσότερα|もっと|더|เพิ่มเติม|lainnya|thêm|ещё|المزيد|עוד|अधिक|আরও|更多|更多)/gi.test(
            e.innerText
          )
        )
        ?.querySelectorAll('[role="menuitem"]');
    },
    queryForButton = () => {
      let btn = [
        ...([...(document.querySelectorAll(".sticky") ?? [])]
          .find(
            e =>
              e.querySelector("img") &&
              e.querySelector("svg") &&
              !e.querySelector(".snorlax-heading") &&
              !e.querySelector(".bg-token-sidebar-surface-primary")
          )
          ?.querySelectorAll(".truncate") ?? []),
      ]
        .find(e => e.nextElementSibling instanceof SVGSVGElement)
        ?.closest("button");
      if (!btn) {
        pageCase = 2;
        btn = [
          ...document.querySelectorAll("button"),
          ...document.querySelectorAll('[role="button"]'),
        ].find(
          b =>
            b.id.startsWith(
              "radix-" || ["model"].includes(b.getAttribute("aria-label"))
            ) &&
            b.classList.contains("group") &&
            b.getBoundingClientRect().top
        );
      }
      return btn;
    },
    queryForRadixDropDown = () => {
      const rps = Array.from(document.body.querySelectorAll("*")).filter(e =>
        e.hasAttribute("data-radix-popper-content-wrapper")
      );
      if (rps.length <= 1) return null;
      queryForButton();
      return document.getElementById(id);
    },
    queryForRadixMenuItem = () => {
      const rpdd = queryForRadixDropDown();
      if (
        !rpdd ||
        (rpdd &&
          !/(new[\s-]?chat|nuevo[\s-]?chat|nueva[\s-]?conversa(c|ç)(ión|ões)|nouveau[\s-]?chat|nuova[\s-]?chat|neuer[\s-]?Chat|nieuwe[\s-]?chat|νέο[\s-]?chat|新しい[\s-]?チャット|새[\s-]?채팅|แชท[\s-]?ใหม่|obrolan[\s-]?baru|trò[\s-]?chuyện[\s-]?mới|новый[\s-]?чат|دردشة[\s-]?جديدة|צ'אט[\s-]?חדש|नया[\s-]?चैट|নতুন[\s-]?চ্যাট|新[\s-]?聊天)/gi.test(
            rpdd.innerText || ""
          ))
      )
        return null;
      const rmi = Array.from(rpdd.querySelectorAll('[role="menuitem"]')).find(
        e =>
          modelsLabelList.test(e.innerText || "") &&
          e.getAttribute("aria-controls") &&
          !e.closest(".snorlax-heading")
      );
      id2 = rmi?.getAttribute("aria-controls");
      return rmi ?? null;
    },
    cleanUpRadixDropDown = () => {
      const rpdd = queryForRadixDropDown(),
        rmi = queryForRadixMenuItem(rpdd);
      if (!rmi && rpdd?.dataset.state === "open") rpdd.dataset.state = "false";
    },
    setRadixAttrs = el => {
      el.setAttribute("data-state", "open");
      el.setAttribute("data-highlighted", "true");
      if (el.getAttribute("data-radix-collection-item")) {
        document.querySelectorAll("[data-radix-collection]").forEach(erc => {
          if (erc._radixCollectionState)
            erc._radixCollectionState.highlightedItem = el;
        });
      }
      const iv = setInterval(() => {
        const ctrld = el.getAttribute("aria-controls");
        if (!ctrld) return;
        const ctrlEl = document.getElementById(ctrld);
        if (!ctrlEl && el.getAttribute("data-state") === "open") {
          el.setAttribute("data-state", "closed");
          el.setAttribute("data-highlighted", "false");
        }
      }, 100);
      setTimeout(() => {
        clearInterval(iv);
        el.setAttribute("data-state", "closed");
        el.setAttribute("data-highlighted", "false");
        const idf1 = document.getElementById(id);
        if (!idf1?.isConnected) id = "";
        const idf2 = document.getElementById(id2);
        if (!idf2?.isConnected) id2 = "";
      }, 5000);
    },
    openDDHandle = ev => {
      if (!((ev.key === "'" || ev.keyCode === 192) && ev.altKey)) return;
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
          for (const el of [button]) {
            for (const ev of ["pointerdown"]) {
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
              }, 100);
            }
          }
        };
      if (button.dataset.state === "closed" || !button.dataset.state) attempt();
      setTimeout(() => {
        if (button.dataset.state === "closed") {
          button.dataset.state = "open";
          button.setAttribute("aria-expanded", "true");
          attempt();
        }
        const hvInterv = setInterval(() => {
            if (pageCase === 2) return;
            const hoverAttempt = () => {
              if (!shouldTryHover) return;
              const rmi = queryForRadixMenuItem();
              if (!rmi) return;
              const rm = rmi?.closest('[role="menu"]');
              if (!rm) return;
              const { width, height, left, top } = rmi.getBoundingClientRect();
              for (const el of [rm, ...rm.getElementsByTagName("div")]) {
                if (!el?.isConnected) continue;
                for (const ev of ["pointermove"]) {
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
            if (document.getElementById(id2)) shouldTryHover = false;
            else shouldTryHover = true;
          }, 100);
        setTimeout(() => {
          clearInterval(hvInterv);
          clearInterval(chkInterv);
          endingCleanup();
        }, limit * 1.25);
      }, 250);
    },
    choseModelHandle = ev => {
      const singleNums = Array.from({ length: 9 }).map((_, i) => i + 1),
        parsed = parseInt(ev.key, 10);
      if (
        !(
          singleNums.map(i => i.toString()).includes(ev.key) ||
          singleNums.map(i => i + 48).includes(ev.keyCode)
        ) ||
        !Number.isFinite(parsed)
      )
        return;
      const target = queryForSecondaryRadixMenu()?.[parsed - 1];
      if (!(target instanceof HTMLElement)) return;
      if (target.dataset.highlighted === "true")
        target.dataset.highlighted = "false";
      const { width, height, bottom, right } = target.getBoundingClientRect(),
        cx = width - right * 0.5,
        cy = height - bottom * 0.5,
        attempt = () => {
          setTimeout(() => {
            const target = queryForSecondaryRadixMenu()?.[parsed - 1];
            if (!(target instanceof HTMLElement)) return;
            target.dataset.highlighted = "false";
          }, limit);
          for (const el of [target]) {
            for (const ev of ["pointerdown"]) {
              setTimeout(() => {
                if (!(el instanceof EventTarget)) return;
                const target = queryForSecondaryRadixMenu()?.[parsed - 1];
                if (
                  !(target instanceof HTMLElement) ||
                  !target?.dataset?.testid
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
              }, 100);
              setTimeout(() => {
                if (el instanceof HTMLElement) el.click();
              }, 100);
            }
          }
        };
      if (
        target.dataset.highlighted === "false" ||
        !target.dataset.highlighted
      ) {
        attempt();
        target.dataset.highlighted = "true";
      }
      setTimeout(() => {
        if (
          target.dataset.highlighted === "false" ||
          !target.dataset.highlighted
        )
          attempt();
      }, 100);
      setTimeout(() => {
        if (queryForSecondaryRadixMenu()) return;
        endingCleanup();
      }, 1000);
    };
  window.removeEventListener("keydown", openDDHandle);
  window.removeEventListener("keydown", choseModelHandle);
  window.addEventListener("keydown", openDDHandle);
  window.addEventListener("keydown", choseModelHandle);
}

function addGPTAltEnter() {
  const hd = kEv => {
    if (!kEv.altKey) return;
    if (!(kEv.key?.toLowerCase().trim() == "enter" || kEv.keyCode === 13)) return;
    const btns = Array.from(document.body.getElementsByTagName("button")),
      sb =
        document.getElementById("composer-submit-button") ||
        btns.find(
          e =>
            e instanceof HTMLElement &&
            e.dataset.testid?.toLowerCase() === "send-button"
        );
    if (!sb?.isConnected) return;
    const aside = Array.from(
        document.getElementsByClassName("bg-token-sidebar-surface-primary")
      ).find(
        e =>
          e.nextElementSibling instanceof HTMLElement &&
          (e.nextElementSibling.classList.contains("h-full") ||
            (e.nextElementSibling.querySelector("main") &&
              e.nextElementSibling.querySelector("textarea")))
      ),
      sbBtn =
        btns.find(
          e => e.dataset.testid?.toLowerCase() === "open-sidebar-button"
        ) ||
        Array.from(
          document.getElementsByClassName("hover:text-token-text-primary")
        ).filter(e => {
          const pt = e.querySelector("path");
          return (
            pt?.getAttribute("d") ===
            "M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
          );
        });
    if (
      (!aside?.isConnected ||
        (aside.isConnected &&
          !getComputedStyle(aside).width.startsWith("0"))) &&
      sbBtn?.isConnected &&
      !getComputedStyle(sbBtn).width.startsWith("0")
    ) {
      const { right, bottom, width, height, x, y } = sb.getBoundingClientRect(),
        cx = right - width ** 0.5,
        cy = bottom - height ** 0.5;
      for (const el of document.elementsFromPoint(x, y)) {
        for (const ev of [
          "pointerdown",
          "mousedown",
          "pointerup",
          "mouseup",
          "click",
        ]) {
          try {
            el.dispatchEvent(
              new MouseEvent(ev, {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: cx,
                clientY: cy,
                screenX: (window.screenX || 0) + cx,
                screenY: (window.screenY || 0) + cy,
                isTrusted: true,
                target: sb,
                currentTarget: sb,
                detail: 1,
                ...(ev.startsWith("pointer") && {
                  pointerId: "1",
                  pointerType: "mouse",
                  isPrimary: true,
                }),
              })
            );
            for (const b of [sb, ...Array.from(sb.querySelectorAll("*"))]) {
              if (typeof b?.click !== "function") return;
              b.click();
            }
          } catch (evEr) {}
        }
      }
    }
  };
  window.removeEventListener("keydown", hd);
  window.addEventListener("keydown", hd);
}


