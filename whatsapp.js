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
                        "arq.",
                        "archived",
                        "archive",
                        "arch.",
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
                        "archiviert",
                        "archiv",
                        "архив",
                        "архивирован",
                        "архивировано",
                        "архивированы",
                        "архивирована",
                        "已归档",
                        "归档",
                        "存档",
                        "已歸檔",
                        "歸檔",
                        "存檔",
                        "アーカイブ",
                        "アーカイブ済み",
                        "保存済み",
                        "保管済み",
                        "보관됨",
                        "아카이브",
                        "보관",
                        "مؤرشف",
                        "أرشفة",
                        "محفوظ",
                        "الملفات المؤرشفة",
                        "arşivlendi",
                        "arşiv",
                        "gearchiveerd",
                        "archief",
                        "आर्काइव्ड",
                        "संग्रहित",
                        "अभिलेखागार",
                        "diarsipkan",
                        "arsip",
                        "đã lưu trữ",
                        "lưu trữ",
                        "ที่เก็บถาวร",
                        "เก็บถาวร",
                        "בארכיון",
                        "ארכיון",
                        "αρχειοθετημένα",
                        "αρχειοθέτηση",
                        "arc.",
                        "archd",
                        "archv",
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
// javascript: (function(){const q=()=>{const e=document.getElementById("pane-side");if(!e?.isConnected)return;const t=[...e.getElementsByTagName("button")].filter(e=>{const t=e.getAttribute("aria-label"),n=e.innerText;return["arquivado","arquivados","arquivada","arquivadas","archived","archive","archivado","archivados","archivada","archivadas","archivé","archivée","archivés","archivées","archiviato","archiviati","archiviata","archiviate","arquivado","arquivada","arq.","arch."].some(e=>[t,n].some(t=>t?.toString().trim().toLowerCase()===e.trim().toLowerCase()))}.at(0);t?.click();return{pane:e,ac:t}};const{pane:e,ac:t}=q();if(!t||!e)return;const n=100,o=1e3,c=performance.now();setTimeout(()=>{const e=5,r=t=>{t.isTrusted&&(d=!0)},d=!1,l=0,i=setInterval(t=>{if(d)return void(t&&clearInterval(t));const o=[...document.querySelectorAll('[role="listitem"]')].at(0)?.closest(".copyable-area")?.querySelector("header")?.nextElementSibling;if(!o?.isConnected)return;o.dataset.cancelable!=="true"&&(addEventListener("click",r),o.dataset.cancelable="true");const c=o.scrollHeight-o.clientHeight;o.scrollTop+=e,o.scrollTop>=c&&(d=!0,setTimeout(()=>{o?.isConnected&&["auto","scroll"].includes(getComputedStyle(o).overflowY)&&o.scrollTo({top:0,behavior:"smooth"})},500),clearInterval(t),removeEventListener("click",r),void o.dataset.cancelable)},n),a=[...document.querySelectorAll('[role="listitem"]')].map(e=>e.querySelector("._ap1-")??e.querySelector("._ap1_")??e.children[0].children[0]).map(e=>({e:e,top:e.getBoundingClientRect().top})).sort((e,t)=>e.top-t.top).map(({e:e})=>e),m=setInterval(t=>{if(d)return void(t&&clearInterval(t));const e=a.at(l);e&&(e.click(),l+=2)},2e3);setTimeout(()=>{clearInterval(i),clearInterval(m),removeEventListener("click",r),delete[...document.querySelectorAll('[role="listitem"]')].at(0)?.closest(".copyable-area")?.querySelector("header")?.nextElementSibling?.dataset.cancelable},6e4)},o);const p=performance.now();let s=!1;setTimeout(()=>{const e=setInterval(()=>{if(s)return;[...document.getElementsByTagName("header")].filter(e=>e.getElementsByTagName("button").length||e.querySelector('[role="button"]')).flatMap(e=>[...e.getElementsByTagName("button"),...e.querySelectorAll('[role="button"]')]).filter(e=>["back","back-"].some(t=>[e.getAttribute("aria-label"),e.getAttribute("data-icon")].some(e=>e?.toLowerCase().trim().startsWith(t))))?.at(0)?.click(),s=!0},2*n);setTimeout(()=>clearInterval(e),6e4)},24*o-Math.min(Math.max(0,p-c),o))})();
/**
*    Add event listeners for keyboards in Whatsapp Web
**/
function addWhatsAppKbShortcuts() {
    setInterval(() => {
        const archive = [
                ...(document.body?.getElementsByTagName("button") || []),
            ]
                .filter((b) => {
                    const al = b.getAttribute("aria-label"),
                        t = b.innerText;
                    return [
                        "arquivado",
                        "arquivados",
                        "arquivada",
                        "arquivadas",
                        "arq.",
                        "archived",
                        "archive",
                        "arch.",
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
                        "archiviert",
                        "archiv",
                        "архив",
                        "архивирован",
                        "архивировано",
                        "архивированы",
                        "архивирована",
                        "已归档",
                        "归档",
                        "存档",
                        "已歸檔",
                        "歸檔",
                        "存檔",
                        "アーカイブ",
                        "アーカイブ済み",
                        "保存済み",
                        "保管済み",
                        "보관됨",
                        "아카이브",
                        "보관",
                        "مؤرشف",
                        "أرشفة",
                        "محفوظ",
                        "الملفات المؤرشفة",
                        "arşivlendi",
                        "arşiv",
                        "gearchiveerd",
                        "archief",
                        "आर्काइव्ड",
                        "संग्रहित",
                        "अभिलेखागार",
                        "diarsipkan",
                        "arsip",
                        "đã lưu trữ",
                        "lưu trữ",
                        "ที่เก็บถาวร",
                        "เก็บถาวร",
                        "בארכיון",
                        "ארכיון",
                        "αρχειοθετημένα",
                        "αρχειοθέτηση",
                        "arc.",
                        "archd",
                        "archv",
                    ].some((l) =>
                        [al, t].some(
                            (t) =>
                                t?.toString().trim().toLowerCase() ===
                                l.trim().toLowerCase()
                        )
                    );
                })
                .at(0),
            back = [...document.getElementsByTagName("header")]
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
                .at(0),
            archiveCb = (e) => {
                if (
                    (e.key === "ArrowRight" ||
                        e.key === "Right" ||
                        e.keyCode === 39) &&
                    e.altKey
                ) {
                    e.preventDefault();
                    archive?.click();
                }
            },
            backCb = (e) => {
                if (
                    (e.key === "ArrowLeft" ||
                        e.key === "Left" ||
                        e.keyCode === 37) &&
                    e.altKey
                ) {
                    e.preventDefault();
                    back?.click();
                }
            };
        if (
            archive instanceof HTMLElement &&
            archive.dataset.listening !== "true"
        ) {
            addEventListener("keyup", archiveCb, { bubbles: false });
            archive.dataset.listening = "true";
        }
        if (back instanceof HTMLElement && back.dataset.listening !== "true") {
            addEventListener("keyup", backCb, { bubbles: false });
            back.dataset.listening = "true";
        }
    }, 500);
}
// javascript:(()=>{function a(){setInterval(()=>{const o=[...(document.body?.getElementsByTagName("button")||[])].filter(e=>["arquivado","arquivados","arquivada","arquivadas","archived","archive","archivado","archivados","archivada","archivadas","archivé","archivée","archivés","archivées","archiviato","archiviati","archiviata","archiviate","arquivado","arquivada","arq.","arch.","архив","архивирован","архивировано","архивированы","архивирована","已归档","归档","存档","已歸檔","歸檔","存檔","アーカイブ","アーカイブ済み","保存済み","保管済み","보관됨","아카이브","보관","مؤرشف","أرشفة","محفوظ","الملفات المؤرشفة","arşivlendi","arşiv","gearchiveerd","archief","आर्काइव्ड","संग्रहित","अभिलेखागार","diarsipkan","arsip","đã lưu trữ","lưu trữ","ที่เก็บถาวร","เก็บถาวร","בארכיון","ארכיון","αρχειοθετημένα","αρχειοθέτηση","arc.","archd","archv"].some(t=>[e.getAttribute("aria-label"),e.innerText].some(e=>(e?.toString().trim().toLowerCase())===t.trim().toLowerCase()))[0],n=[...document.getElementsByTagName("header")].filter(e=>e.getElementsByTagName("button")||e.querySelector('[role="button"]')).flatMap(e=>[...e.getElementsByTagName("button"),...e.querySelectorAll('[role="button"]')]).filter(e=>["back","back-"].some(t=>[e.getAttribute("aria-label"),e.getAttribute("data-icon")].some(e=>e?.toLowerCase().trim().startsWith(t))))[0],c=t=>{(t.key==="ArrowRight"||t.key==="Right"||t.keyCode===39)&&t.altKey&&(t.preventDefault(),o?.click())},d=t=>{(t.key==="ArrowLeft"||t.key==="Left"||t.keyCode===37)&&t.altKey&&(t.preventDefault(),n?.click())};o instanceof HTMLElement&&o.dataset.listening!=="true"&&(addEventListener("keyup",c,{bubbles:!1},o.dataset.listening="true"),n instanceof HTMLElement&&n.dataset.listening!=="true"&&(addEventListener("keyup",d,{bubbles:!1},n.dataset.listening="true")))},500)}a()})();
