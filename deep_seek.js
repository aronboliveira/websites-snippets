/*
* Use Alt + Q for activating it; Alt + W for deactivating 
* (it is recommended to use right before sending at the moment, since there is a watcher that deactivates it in the storage)
* return {void}
**/
function addToggleForDeepThink() {
  const queryForDtBtn = () => {
      return Array.from(document.getElementsByClassName("ds-button")).find(
        e => {
          const p = e.querySelector("path");
          if (!p?.isConnected) return false;
          return (
            p.getAttribute("d") ===
            "M2.656 17.344c-1.016-1.015-1.15-2.75-.313-4.925.325-.825.73-1.617 1.205-2.365L3.582 10l-.033-.054c-.5-.799-.91-1.596-1.206-2.365-.836-2.175-.703-3.91.313-4.926.56-.56 1.364-.86 2.335-.86 1.425 0 3.168.636 4.957 1.756l.053.034.053-.034c1.79-1.12 3.532-1.757 4.957-1.757.972 0 1.776.3 2.335.86 1.014 1.015 1.148 2.752.312 4.926a13.892 13.892 0 0 1-1.206 2.365l-.034.054.034.053c.5.8.91 1.596 1.205 2.365.837 2.175.704 3.911-.311 4.926-.56.56-1.364.861-2.335.861-1.425 0-3.168-.637-4.957-1.757L10 16.415l-.053.033c-1.79 1.12-3.532 1.757-4.957 1.757-.972 0-1.776-.3-2.335-.86zm13.631-4.399c-.187-.488-.429-.988-.71-1.492l-.075-.132-.092.12a22.075 22.075 0 0 1-3.968 3.968l-.12.093.132.074c1.308.734 2.559 1.162 3.556 1.162.563 0 1.006-.138 1.298-.43.3-.3.436-.774.428-1.346-.008-.575-.159-1.264-.449-2.017zm-6.345 1.65l.058.042.058-.042a19.881 19.881 0 0 0 4.551-4.537l.043-.058-.043-.058a20.123 20.123 0 0 0-2.093-2.458 19.732 19.732 0 0 0-2.458-2.08L10 5.364l-.058.042A19.883 19.883 0 0 0 5.39 9.942L5.348 10l.042.059c.631.874 1.332 1.695 2.094 2.457a19.74 19.74 0 0 0 2.458 2.08zm6.366-10.902c-.293-.293-.736-.431-1.298-.431-.998 0-2.248.429-3.556 1.163l-.132.074.12.092a21.938 21.938 0 0 1 3.968 3.968l.092.12.074-.132c.282-.504.524-1.004.711-1.492.29-.753.442-1.442.45-2.017.007-.572-.129-1.045-.429-1.345zM3.712 7.055c.202.514.44 1.013.712 1.493l.074.13.092-.119a21.94 21.94 0 0 1 3.968-3.968l.12-.092-.132-.074C7.238 3.69 5.987 3.262 4.99 3.262c-.563 0-1.006.138-1.298.43-.3.301-.436.774-.428 1.346.007.575.159 1.264.448 2.017zm0 5.89c-.29.753-.44 1.442-.448 2.017-.008.572.127 1.045.428 1.345.293.293.736.431 1.298.431.997 0 2.247-.428 3.556-1.162l.131-.074-.12-.093a21.94 21.94 0 0 1-3.967-3.968l-.093-.12-.074.132a11.712 11.712 0 0 0-.71 1.492z"
          );
        }
      );
    },
    dtHandler = kEv => {
      const lcKEv = kEv.key?.toLowerCase();
      if (
        lcKEv !== "q" &&
        lcKEv !== "w" &&
        kEv.keyCode !== 81 &&
        kEv.keyCode !== 87 &&
        !kEv.altKey
      )
        return;
      const dtBtn = queryForDtBtn();
      if (!dtBtn) return;
      const { right, bottom, width, height, x, y } =
          dtBtn.getBoundingClientRect(),
        cx = right - width * 0.5,
        cy = bottom - height * 0.5;
      for (const el of document.elementsFromPoint(x, y)) {
        for (const ev of [
          "pointerdown",
          "mousedown",
          "pointerup",
          "mouseup",
          "click",
        ]) {
          try {
            const tei = "thinkingEnabled",
              te = localStorage.getItem(tei);
            if (!te) continue;
            const pTe = JSON.parse(te);
            if (!("value" in pTe)) continue;
            let v = pTe.value;
            if (v === "true" || v === "false") {
              if (v === "true") v = true;
              else v = false;
            } else if (typeof v !== "boolean") continue;
            if ((lcKEv === "q" && v === true) || (lcKEv === "w" && v === false))
              continue;
            try {
              let vs = pTe.version;
              if (lcKEv === "q") {
                localStorage.setItem(
                  tei,
                  JSON.stringify({
                    value: true,
                    __version: vs || "2",
                  })
                );
                dtBtn.setAttribute(
                  "style",
                  `--ds-button-color: rgba(77, 107, 254, 0.40); --button-text-color: #4CAEFF; --button-border-color: rgba(0, 122, 255, 0.15); --ds-button-hover-color: rgba(77, 107, 254, 0.2);`
                );
                dtBtn
                  .querySelector(".ds-icon")
                  ?.setAttribute(
                    "style",
                    `font-size: 19px; width: 19px; height: 19px; color: rgb(76, 174, 255);`
                  );
              } else {
                localStorage.setItem(
                  tei,
                  JSON.stringify({
                    value: false,
                    __version: vs || "2",
                  })
                );
                dtBtn.setAttribute(
                  "style",
                  `--ds-button-color: transparent; --button-text-color: #F8FAFF; --button-border-color: #626262; --ds-button-hover-color: #424451;`
                );
                dtBtn
                  .querySelector(".ds-icon")
                  ?.setAttribute(
                    "style",
                    `font-size: 19px; width: 19px; height: 19px; color: rgb(248, 250, 255);`
                  );
              }
              el.dispatchEvent(
                new MouseEvent(ev, {
                  bubbles: true,
                  cancelable: true,
                  clientX: cx,
                  clientY: cy,
                  screenX: (window.screenX || 0) + cx,
                  screenY: (window.screenY || 0) + cy,
                  isTrusted: true,
                  target: dtBtn,
                  currentTarget: dtBtn,
                  detail: 1,
                  ...(ev.startsWith("pointer") && {
                    pointerType: "mouse",
                    pointerId: "1",
                    isPrimary: true,
                  }),
                })
              );
              setTimeout(() => {
                if (
                  (lcKEv === "q" && v === true) ||
                  (lcKEv === "w" && v === false) ||
                  !el?.isConnected ||
                  !dtBtn?.isConnected
                )
                  return;
                el.closest(`.${dtBtn.className.replace(/\s/g, ".")}`) &&
                  typeof el.click === "function" &&
                  el.click();
              }, 200);
            } catch (evEr) {}
          } catch (eJ) {}
        }
      }
    };
  for (const cb of [dtHandler]) {
    window.removeEventListener("keydown", cb);
    window.addEventListener("keydown", cb);
  }
}
