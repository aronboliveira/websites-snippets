/**
 *  Open the archived for quick check and then return
 *  @return {void}
 **/
function checkArchived() {
    const q = () => {
        const pane = document.getElementById("pane-side");
        if (!pane?.isConnected) return;
        const ac = [...pane.getElementsByTagName("button")]
            .filter((b) => {
                const al = b.getAttribute("aria-label"),
                    t = b.innerText;
                return [
                    "arquivado",
                    "arquivados",
                    "arquivada",
                    "arquivadas",
                    "archived",
                    "archive",
                    "archivado",
                    "archivados",
                    "archivada",
                    "archivadas",
                    "archivé",
                    "archivée",
                    "archivés",
                    "archivées",
                    "archiviato",
                    "archiviati",
                    "archiviata",
                    "archiviate",
                    "arquivado",
                    "arquivada",
                    "arq.",
                    "arch.",
                ].some((l) =>
                    [al, t].some(
                        (t) =>
                            t?.toString().trim().toLowerCase() ===
                            l.trim().toLowerCase()
                    )
                );
            })
            .at(0);
        ac?.click();
        return { pane, ac };
    };
    const { pane, ac } = q();
    if (!ac || !pane) return;
    const interv = 100,
        timeout = 1000;
    const start_1 = performance.now();
    setTimeout(() => {
        const step = 5,
            cancel = (ev) => {
                if (!ev.isTrusted) return;
                down = true;
            };
        let down = false,
            acc = 0;
        const scr = setInterval((it) => {
                if (down) {
                    it && clearInterval(it);
                    return;
                }
                const _2pane = [
                    ...document.querySelectorAll('[role="listitem"]'),
                ]
                    .at(0)
                    ?.closest(".copyable-area")
                    ?.querySelector("header")?.nextElementSibling;
                if (!_2pane?.isConnected) return;
                if (_2pane.dataset.cancelable !== "true") {
                    addEventListener("click", cancel);
                    _2pane.dataset.cancelable = "true";
                }
                const end = _2pane.scrollHeight - _2pane.clientHeight;
                _2pane.scrollTop += step;
                if (_2pane.scrollTop >= end) {
                    down = true;
                    setTimeout(() => {
                        if (
                            !_2pane?.isConnected ||
                            !(
                                getComputedStyle(_2pane).overflowY === "auto" ||
                                getComputedStyle(_2pane).overflowY === "scroll"
                            )
                        )
                            return;
                        _2pane.scrollTo({ top: 0, behavior: "smooth" });
                    }, 500);
                    clearInterval(it);
                    removeEventListener("click", cancel);
                    void _2pane.dataset.cancelable;
                }
            }, interv),
            listItems = [...document.querySelectorAll('[role="listitem"]')]
                .map(
                    (e) =>
                        e.querySelector("._ap1-") ??
                        e.querySelector("._ap1_") ??
                        e.children[0].children[0]
                )
                .map((e) => {
                    return { e, top: e.getBoundingClientRect().top };
                })
                .sort((a, b) => a.top - b.top)
                .map(({ e }) => e),
            checkChats = setInterval((it) => {
                if (down) {
                    it && clearInterval(it);
                    return;
                }
                pLi = listItems.at(acc);
                if (!pLi) return;
                pLi.click();
                acc += 2;
            }, 2000);
        setTimeout(() => {
            if (scr) clearInterval(scr);
            if (checkChats) clearInterval(checkChats);
            removeEventListener("click", cancel);
            void [...document.querySelectorAll('[role="listitem"]')]
                .at(0)
                ?.closest(".copyable-area")
                ?.querySelector("header")?.nextElementSibling?.dataset
                ?.cancelable;
        }, 60000);
    }, timeout);
    const start_2 = performance.now();
    let done = false;
    setTimeout(() => {
        const scrlChk = setInterval(() => {
            if (done) return;
            [...document.getElementsByTagName("header")]
                .filter(
                    (h) =>
                        h.getElementsByTagName("button") ||
                        h.querySelector('[role="button"]')
                )
                .flatMap((h) => [
                    ...h.getElementsByTagName("button"),
                    ...h.querySelectorAll('[role="button"]'),
                ])
                .filter((b) =>
                    [
                        b.getAttribute("aria-label"),
                        b.getAttribute("data-icon"),
                    ].some(
                        (l) =>
                            l?.toLowerCase().trim() === "back" ||
                            l?.toLowerCase().trim().startsWith("back-")
                    )
                )
                .at(0)
                ?.click();
            done = true;
        }, interv * 2);
        setTimeout(() => scrlChk && clearInterval(scrlChk), 60000);
    }, timeout * 24 - Math.min(Math.max(0, start_2 - start_1), timeout));
}
// javascript:(function(){  })();
