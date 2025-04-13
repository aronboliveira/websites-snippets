// ! THESE FUNCTIONS ARE STILL UNDER DEVELOPMENT, DO NOT USE THEM

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


