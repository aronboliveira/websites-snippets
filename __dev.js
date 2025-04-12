// ! THESE FUNCTIONS ARE STILL UNDER DEVELOPMENT, DO NOT USE THEM

javascript: (() => {
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
  // ! ASIDE IS UNRENDERED, NOT HIDDEN
  return [sbBtn?.dataset.testid ?? "", aside?.dataset.testid ?? ""];
})();


javascript: (() => {
  let done = false;
  const tx = document.querySelectorAll("textarea[placeholder]")[0],
    dtx =
      document.getElementById("prompt-textarea") ??
      Array.from(document.querySelectorAll(".ProseMirror")).find(
        d =>
          d instanceof HTMLElement &&
          d.contentEditable === "true" &&
          d.parentElement?.querySelector("textarea[placeholder]")
      );
  if (!tx || !dtx) return;
  const pTx = tx.parentElement,
    csTx = getComputedStyle(tx);
  let targ = tx;
  if (
    csTx.display === "none" ||
    csTx.width.replace(/[^0-9]/g) === "0" ||
    csTx.height.replace(/[^0-9]/g) === "0"
  )
    targ = dtx;
  const csDtx = getComputedStyle(dtx);
  if (
    csDtx.display === "none" ||
    csDtx.width.replace(/[^0-9]/g) === "0" ||
    csDtx.height.replace(/[^0-9]/g) === "0"
  )
    targ = pTx;
  const { x, y, right, bottom, width, height } = targ.getBoundingClientRect(),
    cx = right - width * 0.5,
    cy = bottom - height * 0.5;
  for (const el of [tx, ...document.elementsFromPoint(x, y)]) {
    el.focus();
    setTimeout(() => {
      for (const ev of [
        "pointerdown",
        "mousedown",
        "pointerup",
        "mouseup",
        "click",
      ]) {
        if (!el?.isConnected) continue;
        if (done || !dtx?.isConnected) return;
        if (
          [...dtx.classList]
            .map(c => c.toLowerCase().trim())
            .includes("prosemirror-focused")
        ) {
          done = true;
          return;
        }
        el.dispatchEvent(
          new MouseEvent(ev, {
            bubbles: true,
            cancelable: true,
            clientX: cx,
            clientY: cy,
            screenX: screenX + width,
            screenY: screenY + height,
            detail: 1,
            target: el,
            currentTarget: el,
            isTrusted: true,
            ...(() => {
              return ev.startsWith("pointer")
                ? {
                    pointerType: "mouse",
                    pointerId: 1,
                    isPrimary: true,
                  }
                : {};
            })(),
          })
        );
      }
      el.click();
    }, 50);
  }
})();


