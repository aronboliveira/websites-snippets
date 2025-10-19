javascript: (() => {
  const queryAllElements = () => {
      const archive = [...(document.body?.getElementsByTagName("button") || [])]
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
                  t?.toString().trim().toLowerCase() === l.trim().toLowerCase()
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
            [b.getAttribute("aria-label"), b.getAttribute("data-icon")].some(
              (l) =>
                l?.toLowerCase().trim() === "back" ||
                l?.toLowerCase().trim().startsWith("back-")
            )
          )
          .at(0),
        tabBtns = [...document.body.querySelectorAll('button[role="tab"]')],
        all =
          document.getElementById("all-filter") ??
          tabBtns.find((b) => {
            const t = b.innerText?.trim().toLowerCase();
            return [
              "all",
              "todos",
              "tout",
              "alle",
              "tutti",
              "все",
              "全部",
              "すべて",
              "전체",
              "الكل",
              "सभी",
              "সব",
              "تمام",
              "semua",
              "tất cả",
              "tümü",
              "wszystko",
              "allemaal",
              "all",
            ].includes(t);
          }),
        unread =
          document.getElementById("unread-filter") ??
          tabBtns.find((b) => {
            const t = b.innerText?.trim().toLowerCase();
            return [
              "unread",
              "não lidos",
              "no leídos",
              "non lus",
              "ungelesen",
              "non letti",
              "непрочитанные",
              "未读",
              "未讀",
              "未読",
              "읽지 않음",
              "غير المقروء",
              "अनपढ़",
              "অপঠিত",
              "انپڑھی",
              "belum dibaca",
              "chưa đọc",
              "okunmamış",
              "nieprzeczytane",
              "ongelezen",
            ].includes(t);
          }),
        favourites =
          document.getElementById("favorites-filter") ??
          tabBtns.find((b) => {
            const t = b.innerText?.trim().toLowerCase();
            return [
              "favourites",
              "favorites",
              "favoritos",
              "favoritas",
              "favoris",
              "favoriten",
              "preferiti",
              "избранное",
              "收藏",
              "お気に入り",
              "즐겨찾기",
              "المفضلة",
              "पसंदीदा",
              "পছন্দের",
              "پسندیدہ",
              "favorit",
              "yêu thích",
              "favoriler",
              "ulubione",
              "favorieten",
            ].includes(t);
          }),
        groups =
          document.getElementById("group-filter") ??
          tabBtns.find((b) => {
            const t = b.innerText?.trim().toLowerCase();
            return [
              "groups",
              "grupos",
              "groupes",
              "gruppen",
              "gruppi",
              "группы",
              "群组",
              "群組",
              "グループ",
              "그룹",
              "مجموعات",
              "समूह",
              "গ্রুপ",
              "گروپ",
              "grup",
              "nhóm",
              "gruplar",
              "grupy",
              "groepen",
            ].includes(t);
          }),
        more = [...document.getElementsByTagName("button")]
          .filter(
            (b) =>
              b.title?.trim().toLowerCase() === "menu" &&
              (b.firstElementChild
                ?.getAttribute("data-icon")
                ?.trim()
                .toLowerCase()
                .startsWith("more-") ||
                b.firstElementChild
                  ?.getAttribute("data-icon")
                  ?.trim()
                  .toLowerCase() === "more")
          )
          .at(0),
        ngrp = [...document.getElementsByTagName("li")]
          .flatMap((e) => [
            ...e.querySelectorAll("span"),
            ...e.querySelectorAll("div"),
          ])
          .find((el) => {
            const txt = el.innerText?.trim().toLowerCase();
            return [
              "new group",
              "novo grupo",
              "nuevo grupo",
              "nouveau groupe",
              "neue gruppe",
              "nuovo gruppo",
              "новая группа",
              "新群组",
              "新群組",
              "新しいグループ",
              "새 그룹",
              "مجموعة جديدة",
              "नया समूह",
              "নতুন গ্রুপ",
              "نیا گروپ",
              "grup baru",
              "nhóm mới",
              "yeni grup",
              "nowa grupa",
              "nieuwe groep",
            ].includes(txt);
          }),
        close = [...document.querySelectorAll('div[role="button"]')].find(
          (b) =>
            [
              "close",
              "cerrar",
              "fermer",
              "chiudi",
              "schließen",
              "sluiten",
              "关闭",
              "بستن",
              "إغلاق",
              "κλείσιμο",
              "закрыть",
              "閉じる",
              "닫기",
              "fechar",
              "बंद",
              "বন্ধ",
              "మూసివేయి",
              "திற",
              "അടയ്ക്കു",
              "বন্ধ কৰক",
              "بند",
              "ปิด",
              "đóng",
              "luk",
              "sulje",
              "zavrieť",
              "lukke",
              "bezár",
              "закрити",
              "סגור",
              "sulge",
              "ປິດ",
            ].includes(b.getAttribute("aria-label")?.trim().toLowerCase()) ||
            [...b.getElementsByTagName("span")].some((c) =>
              [
                "close-",
                "cerrar-",
                "fermer-",
                "chiudi-",
                "schließen-",
                "sluiten-",
                "关闭-",
                "بستن-",
                "إغلاق-",
                "κλείσιμο-",
                "закрыть-",
                "閉じる-",
                "닫기-",
                "fechar-",
                "बंद-",
                "বন্ধ-",
                "మూసివేయి-",
                "திற-",
                "അടയ്ക്കു-",
                "বন্ধ-",
                "بند-",
                "ปิด-",
                "đóng-",
                "luk-",
                "sulje-",
                "zavrieť-",
                "lukke-",
                "bezár-",
                "закрити-",
                "סגור-",
                "sulge-",
                "ປິດ-",
              ].includes(c.getAttribute("data-icon")?.trim().toLowerCase())
            )
        ),
        search = [
          ...document.querySelectorAll("p.selectable-text.copyable-text"),
        ].find((p) =>
          [
            "pesquisar",
            "busca",
            "procurar",
            "buscar",
            "búsqueda",
            "search",
            "find",
            "lookup",
            "srch",
            "recherche",
            "rechercher",
            "cerca",
            "ricerca",
            "suche",
            "suchen",
            "поиск",
            "искать",
            "搜索",
            "查找",
            "搜寻",
            "搜尋",
            "查找",
            "搜尋",
            "検索",
            "探す",
            "검색",
            "찾기",
            "بحث",
            "البحث",
            "ara",
            "arama",
            "zoeken",
            "zoek",
            "खोज",
            "तलाश",
            "cari",
            "tìm kiếm",
            "ค้นหา",
            "חיפוש",
            "αναζήτηση",
            "archd",
            "archv",
          ].includes(
            p.parentElement
              ?.getAttribute("aria-label")
              ?.trim()
              .toLowerCase()
              .replace(/\s.*/g, "")
          )
        );
      return {
        archive,
        back,
        all,
        unread,
        favourites,
        groups,
        more,
        ngrp,
        close,
        search,
      };
    },
    archiveCb = (e) => {
      if (
        !(
          (e.key === "ArrowRight" || e.key === "Right" || e.keyCode === 39) &&
          e.ctrlKey &&
          e.altKey
        )
      )
        return;
      e.preventDefault();
      const paneSideContainer = [
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
                t?.toString().trim().toLowerCase() === l.trim().toLowerCase()
            )
          );
        })
        .at(0);
      if (paneSideContainer) {
        paneSideContainer.click();
        document.getElementById("pane-side")?.setAttribute("data-showing", "0");
      }
    },
    backCb = (e) => {
      if (
        !(
          (e.key === "ArrowLeft" || e.key === "Left" || e.keyCode === 37) &&
          e.ctrlKey &&
          e.altKey
        )
      )
        return;
      e.preventDefault();
      const paneSideContainer = [...document.getElementsByTagName("header")]
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
          [b.getAttribute("aria-label"), b.getAttribute("data-icon")].some(
            (l) =>
              l?.toLowerCase().trim() === "back" ||
              l?.toLowerCase().trim().startsWith("back-")
          )
        )
        .at(0);
      if (paneSideContainer) {
        paneSideContainer.click();
        document.getElementById("pane-side")?.setAttribute("data-showing", "1");
      }
    },
    allCb = (e) => {
      if (!((e.key?.toLowerCase() === "q" || e.keyCode === 81) && e.altKey))
        return;
      (
        document.getElementById("all-filter") ??
        tabBtns.find((b) => {
          const t = b.innerText?.trim().toLowerCase();
          return [
            "all",
            "todos",
            "tout",
            "alle",
            "tutti",
            "все",
            "全部",
            "すべて",
            "전체",
            "الكل",
            "सभी",
            "সব",
            "تمام",
            "semua",
            "tất cả",
            "tümü",
            "wszystko",
            "allemaal",
            "all",
          ].includes(t);
        })
      )?.click();
    },
    unreadCb = (e) => {
      if (!((e.key?.toLowerCase() === "w" || e.keyCode === 87) && e.altKey))
        return;
      (
        document.getElementById("unread-filter") ??
        tabBtns.find((b) => {
          const t = b.innerText?.trim().toLowerCase();
          return [
            "unread",
            "não lidos",
            "no leídos",
            "non lus",
            "ungelesen",
            "non letti",
            "непрочитанные",
            "未读",
            "未讀",
            "未読",
            "읽지 않음",
            "غير المقروء",
            "अनपढ़",
            "অপঠিত",
            "انپڑھی",
            "belum dibaca",
            "chưa đọc",
            "okunmamış",
            "nieprzeczytane",
            "ongelezen",
          ].includes(t);
        })
      )?.click();
    },
    fvtCb = (e) => {
      if (!((e.key?.toLowerCase() === "s" || e.keyCode === 83) && e.altKey))
        return;
      (
        document.getElementById("favorites-filter") ??
        tabBtns.find((b) => {
          const t = b.innerText?.trim().toLowerCase();
          return [
            "favourites",
            "favorites",
            "favoritos",
            "favoritas",
            "favoris",
            "favoriten",
            "preferiti",
            "избранное",
            "收藏",
            "お気に入り",
            "즐겨찾기",
            "المفضلة",
            "पसंदीदा",
            "পছন্দের",
            "پسندیدہ",
            "favorit",
            "yêu thích",
            "favoriler",
            "ulubione",
            "favorieten",
          ].includes(t);
        })
      )?.click();
    },
    groupsCb = (e) => {
      if (!((e.key?.toLowerCase() === "x" || e.keyCode === 88) && e.altKey))
        return;
      (
        document.getElementById("group-filter") ??
        tabBtns.find((b) => {
          const t = b.innerText?.trim().toLowerCase();
          return [
            "groups",
            "grupos",
            "groupes",
            "gruppen",
            "gruppi",
            "группы",
            "群组",
            "群組",
            "グループ",
            "그룹",
            "مجموعات",
            "समूह",
            "গ্রুপ",
            "گروپ",
            "grup",
            "nhóm",
            "gruplar",
            "grupy",
            "groepen",
          ].includes(t);
        })
      )?.click();
    },
    moreCb = (e) => {
      if (!((e.key?.toLowerCase() === "m" || e.keyCode === 77) && e.altKey))
        return;
      [...document.getElementsByTagName("button")]
        .filter(
          (b) =>
            b.title?.trim().toLowerCase() === "menu" &&
            (b.firstElementChild
              ?.getAttribute("data-icon")
              ?.trim()
              .toLowerCase()
              .startsWith("more-") ||
              b.firstElementChild
                ?.getAttribute("data-icon")
                ?.trim()
                .toLowerCase() === "more")
        )
        .at(0)
        ?.click();
    },
    ngrpCb = (e) => {
      if (!((e.key?.toLowerCase() === "n" || e.keyCode === 78) && e.altKey))
        return;
      [...document.getElementsByTagName("li")]
        .flatMap((e) => [
          ...e.querySelectorAll("span"),
          ...e.querySelectorAll("div"),
        ])
        .find((el) => {
          const txt = el.innerText?.trim().toLowerCase();
          return [
            "new group",
            "novo grupo",
            "nuevo grupo",
            "nouveau groupe",
            "neue gruppe",
            "nuovo gruppo",
            "новая группа",
            "新群组",
            "新群組",
            "新しいグループ",
            "새 그룹",
            "مجموعة جديدة",
            "नया समूह",
            "নতুন গ্রুপ",
            "نیا گروپ",
            "grup baru",
            "nhóm mới",
            "yeni grup",
            "nowa grupa",
            "nieuwe groep",
          ].includes(txt);
        })
        ?.click();
    },
    closeCb = (e) => {
      if (!((e.key?.toLowerCase() === "b" || e.keyCode === 66) && e.altKey))
        return;
      [...document.querySelectorAll('div[role="button"]')]
        .find(
          (b) =>
            [
              "close",
              "cerrar",
              "fermer",
              "chiudi",
              "schließen",
              "sluiten",
              "关闭",
              "بستن",
              "إغلاق",
              "κλείσιμο",
              "закрыть",
              "閉じる",
              "닫기",
              "fechar",
              "बंद",
              "বন্ধ",
              "మూసివేయి",
              "திற",
              "അടയ്ക്കു",
              "বন্ধ কৰক",
              "بند",
              "ปิด",
              "đóng",
              "luk",
              "sulje",
              "zavrieť",
              "lukke",
              "bezár",
              "закрити",
              "סגור",
              "sulge",
              "ປິດ",
            ].includes(b.getAttribute("aria-label")?.trim().toLowerCase()) ||
            [...b.getElementsByTagName("span")].some((c) =>
              [
                "close-",
                "cerrar-",
                "fermer-",
                "chiudi-",
                "schließen-",
                "sluiten-",
                "关闭-",
                "بستن-",
                "إغلاق-",
                "κλείσιμο-",
                "закрыть-",
                "閉じる-",
                "닫기-",
                "fechar-",
                "बंद-",
                "বন্ধ-",
                "మూసివేయి-",
                "திற-",
                "അടയ്ക്കു-",
                "বন্ধ-",
                "بند-",
                "ปิด-",
                "đóng-",
                "luk-",
                "sulje-",
                "zavrieť-",
                "lukke-",
                "bezár-",
                "закрити-",
                "סגור-",
                "sulge-",
                "ປິດ-",
              ].includes(c.getAttribute("data-icon")?.trim().toLowerCase())
            )
        )
        ?.click();
    },
    searchCb = (e) => {
      if (!((e.key?.toLowerCase() === "l" || e.keyCode === 76) && e.altKey))
        return;
      const p = [
          ...document.querySelectorAll("p.selectable-text.copyable-text"),
        ].find((p) =>
          [
            "pesquisar",
            "busca",
            "procurar",
            "buscar",
            "búsqueda",
            "search",
            "find",
            "lookup",
            "srch",
            "recherche",
            "rechercher",
            "cerca",
            "ricerca",
            "suche",
            "suchen",
            "поиск",
            "искать",
            "搜索",
            "查找",
            "搜寻",
            "搜尋",
            "查找",
            "搜尋",
            "検索",
            "探す",
            "검색",
            "찾기",
            "بحث",
            "البحث",
            "ara",
            "arama",
            "zoeken",
            "zoek",
            "खोज",
            "तलाश",
            "cari",
            "tìm kiếm",
            "ค้นหา",
            "חיפוש",
            "αναζήτηση",
            "archd",
            "archv",
          ].includes(
            p?.parentElement
              ?.getAttribute("aria-label")
              ?.trim()
              .toLowerCase()
              .replace(/\s.*/g, "")
          )
        ),
        parents = [];
      let currEl = p.parentElement,
        acc = 0;
      while (p && currEl) {
        parents.push(currEl);
        currEl = currEl?.parentElement;
        if (acc >= 10 || currEl === document.body) break;
        acc += 1;
      }
      const editable = parents.filter(Boolean).find((p) => p.contentEditable);
      editable?.focus();
      setTimeout(() => {
        if (!editable?.isConnected) return;
        editable.click();
        const prevTi = editable.getAttribute("tabindex");
        editable.setAttribute("tabindex", "-1");
        setTimeout(() => {
          if (!editable?.isConnected) return;
          editable?.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Tab",
              code: "Tab",
              bubbles: true,
            })
          );
          editable.setAttribute("tabindex", prevTi);
        }, 50);
      }, 50);
    },
    lexicalTypingCb = (e) => {
      if (!((e.key?.toLowerCase() === "z" || e.keyCode === 90) && e.altKey))
        return;

      const element = Array.from(
        document.querySelectorAll(
          ".lexical-rich-text-input:has(.copyable-text.selectable-text)"
        )
      )
        .filter((el) =>
          [
            "Type to",
            "Escrever para",
            "Escreva para",
            "Digite para",
            "Escribe a",
            "Escribir a",
            "Écrire à",
            "Écrivez à",
            "Scrivi a",
            "Schreiben an",
            "Schreibe an",
            "Написать",
            "Напишите",
            "写信给",
            "输入给",
            "發送訊息給",
            "輸入給",
            "メッセージを送信",
            "入力して",
            "메시지 보내기",
            "입력하여",
            "اكتب إلى",
            "الكتابة إلى",
            "Şuna yaz",
            "Typ om",
            "Schrijf naar",
            "लिखें",
            "संदेश भेजें",
            "Ketik untuk",
            "Tulis ke",
            "Nhập để",
            "Viết cho",
            "พิมพ์ถึง",
            "הקלד ל",
            "כתוב ל",
            "Πληκτρολογήστε για",
            "Γράψτε σε",
            "Type",
            "Write to",
            "Message",
          ].some((l) =>
            el.firstElementChild?.getAttribute("aria-label")?.startsWith(l)
          )
        )
        ?.at(0)
        ?.querySelector('[contenteditable="true"]');

      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;
      const t = e.currentTarget;
      const eventOptions = {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: centerX,
        clientY: centerY,
        target: t,
        currentTarget: t,
        isTrusted: true,
        screenX: window.screenX + centerX,
        screenY: window.screenY + centerY,
      };

      element.focus();
      element.dispatchEvent(new MouseEvent("mousedown", eventOptions));
      element.dispatchEvent(new MouseEvent("mouseup", eventOptions));
      element.dispatchEvent(new MouseEvent("click", eventOptions));
    };
  const {
    archive,
    back,
    all,
    unread,
    favourites,
    groups,
    more,
    ngrp,
    close,
    search,
  } = queryAllElements();
  for (const { e, cb } of [
    { e: archive, cb: archiveCb },
    { e: back, cb: backCb },
    { e: all, cb: allCb },
    { e: unread, cb: unreadCb },
    { e: favourites, cb: fvtCb },
    { e: groups, cb: groupsCb },
    { e: more, cb: moreCb },
    { e: ngrp, cb: ngrpCb },
    { e: close, cb: closeCb },
    { e: search, cb: searchCb },
  ]) {
    if (e instanceof HTMLElement && e.dataset.listening === "true") {
      e.removeAttribute("data-listening");
      window.removeEventListener("keydown", cb);
    }
  }
  setInterval(() => {
    const {
      archive,
      back,
      all,
      unread,
      favourites,
      groups,
      more,
      ngrp,
      search,
    } = queryAllElements();
    for (const { e, cb } of [
      { e: archive, cb: archiveCb },
      { e: back, cb: backCb },
      { e: all, cb: allCb },
      { e: unread, cb: unreadCb },
      { e: favourites, cb: fvtCb },
      { e: groups, cb: groupsCb },
      { e: more, cb: moreCb },
      { e: ngrp, cb: ngrpCb },
      { e: close, cb: closeCb },
      { e: search, cb: searchCb },
    ]) {
      if (e instanceof HTMLElement && e.dataset.listening !== "true") {
        window.addEventListener("keydown", cb);
        e.dataset.listening = "true";
      }
    }
  }, 500);
  const queryAttachDropdown = () =>
      Array.from(
        Array.from(document.getElementsByTagName("ul"))
          .find(
            (l) =>
              l.querySelector("[data-animate-dropdown-item]") &&
              l.closest('[role="application"]')
          )
          ?.querySelectorAll("li") ?? []
      ),
    queryForDataIcon = (icon) => {
      if (typeof icon !== "string") return;
      return queryAttachDropdown()
        .find((l) => l?.querySelector(`[data-icon^="${icon}-"]`))
        ?.closest("li")?.parentElement;
    },
    fireDataIconEvent = async (ic) => {
      const { width, height, bottom, right } = ic.getBoundingClientRect(),
        cx = bottom - width * 0.5,
        cy = right - height * 0.5,
        els = ic.querySelectorAll("*");
      for (const el of els)
        for (const ev of [
          "pointerdown",
          "mousedown",
          "pointerup",
          "mouseup",
          "click",
        ]) {
          for (const t of [ic, ic.firstElementChild]) {
            if (!t?.isConnected) return;
            t.focus();
            el.dispatchEvent(
              new MouseEvent({
                ev,
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: cx,
                clientY: cy,
                target: t,
                currentTarget: t,
                isTrusted: true,
                screenX: window.screenX + cx,
                screenY: window.screenY + cy,
                ...(ev.startsWith("pointer") && {
                  pointerId: 1,
                  pointerType: "mouse",
                  isPrimary: true,
                }),
              })
            );
            typeof el?.click === "function" && el.click();
          }
        }
    },
    clickDoc = (ev) => {
      if (!(ev.altKey && (ev.key?.toLowerCase() === "t" || ev.keyCode === 84)))
        return;
      const ic = queryForDataIcon("document");
      if (!ic) return;
      fireDataIconEvent(ic);
    },
    clickImg = (ev) => {
      if (!(ev.altKey && (ev.key?.toLowerCase() === "y" || ev.keyCode === 89)))
        return;
      const ic = queryForDataIcon("media");
      if (!ic) return;
      fireDataIconEvent(ic);
    },
    clickCamera = (ev) => {
      if (!(ev.altKey && (ev.key?.toLowerCase() === "u" || ev.keyCode === 85)))
        return;
      const ic = queryForDataIcon("camera");
      if (!ic) return;
      fireDataIconEvent(ic);
    },
    clickContact = (ev) => {
      if (!(ev.altKey && (ev.key?.toLowerCase() === "g" || ev.keyCode === 71)))
        return;
      const ic = queryForDataIcon("person");
      if (!ic) return;
      fireDataIconEvent(ic);
    },
    clickPoll = (ev) => {
      if (!(ev.altKey && (ev.key?.toLowerCase() === "j" || ev.keyCode === 74)))
        return;
      const ic = queryForDataIcon("poll");
      if (!ic) return;
      fireDataIconEvent(ic);
    },
    clickNewEvent = (ev) => {
      if (!(ev.altKey && (ev.key?.toLowerCase() === "c" || ev.keyCode === 67)))
        return;
      const ic = queryForDataIcon("calendar");
      if (!ic) return;
      fireDataIconEvent(ic);
    },
    clickNewSticker = (ev) => {
      if (!(ev.altKey && (ev.key?.toLowerCase() === "v" || ev.keyCode === 86)))
        return;
      const ic = queryForDataIcon("sticker");
      if (!ic) return;
      fireDataIconEvent(ic);
    };
  for (const cb of [
    clickDoc,
    clickImg,
    clickCamera,
    clickContact,
    clickPoll,
    clickNewEvent,
    clickNewSticker,
    lexicalTypingCb,
  ]) {
    window.removeEventListener("keydown", cb);
    window.addEventListener("keydown", cb, { passive: true });
  }
  const a = [
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
    ],
    b = () =>
      [
        ...([...document.body.querySelectorAll("*")]
          .filter(
            (e) =>
              (e instanceof HTMLHeadingElement || e.tagName === "HEADER") &&
              a.includes(e.innerText?.trim().toLowerCase())
          )
          .at(0)
          ?.closest(".copyable-area")
          ?.querySelectorAll("*") ?? []),
      ].find((e) => [...e.children].some((c) => c.role === "listitem")),
    c = () => ({
      g:
        [...(document.body?.querySelectorAll('div[role="grid"]') || [])].filter(
          (gr) => {
            const t = gr.getAttribute("aria-label")?.trim().toLowerCase();
            return [
              "chat list",
              "conversation list",
              "message list",
              "lista de chats",
              "lista de conversas",
              "lista de conversaciones",
              "liste de chats",
              "liste de conversations",
              "elenco chat",
              "elenco conversazioni",
              "Chat-Liste",
              "Konversationsliste",
              "lijst van chats",
              "gesprekkenlijst",
              "λίστα συνομιλιών",
              "λίστα συζητήσεων",
              "チャットリスト",
              "会話リスト",
              "채팅 목록",
              "대화 목록",
              "รายการแชท",
              "รายการสนทนา",
              "daftar obrolan",
              "daftar percakapan",
              "danh sách trò chuyện",
              "danh sách hội thoại",
              "список чатов",
              "список бесед",
              "قائمة الدردشة",
              "قائمة المحادثات",
              "רשימת צ'אטים",
              "רשימת שיחות",
              "चैट सूची",
              "वार्तालाप सूची",
              "চ্যাট তালিকা",
              "কথোপকথন তালিকা",
              "聊天列表",
              "对话列表",
              "聊天清單",
              "對話清單",
            ].includes(t?.toLowerCase().trim() ?? "###");
          }
        )[0] ?? document.body,
      ag: b(),
    }),
    d = (ev, g) => {
      const e = () =>
        [...(b()?.closest(".copyable-area")?.querySelectorAll("*") ?? [])].some(
          (e) =>
            (e instanceof HTMLHeadingElement || e?.tagName === "HEADER") &&
            a.includes(e.innerText?.trim().toLowerCase())
        );
      ev.altKey && ev.preventDefault();
      const f = Array.from({ length: 9 }).map((_, i) => i + 1),
        h = parseInt(ev.key, 10);
      if (e()) g = b();
      if (
        !(
          g instanceof HTMLElement &&
          g.isConnected &&
          ev.altKey &&
          (f.map((i) => i.toString()).includes(ev.key) ||
            f.map((i) => i + 48).includes(ev.keyCode))
        ) ||
        !Number.isFinite(h)
      )
        return;
      const paneSideShowing =
        document.getElementById("pane-side")?.getAttribute("data-showing") ??
        "1";
      let i =
        paneSideShowing === "0"
          ? g.querySelectorAll('[role="listitem"]')
          : g.querySelectorAll('[role="row"] > *');
      if (i.length < h) return;
      i = Array.from(i).sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      );
      const j = i[h - 1];
      if (!j?.isConnected) return;
      const k = j.querySelectorAll("*"),
        l =
          [...k].filter((c) =>
            ["true", "false"].includes(c.getAttribute("aria-selected"))
          )[0] ||
          (() => {
            if (!(j.firstElementChild instanceof HTMLElement)) return null;
            return [...j.firstElementChild.children].filter((c) =>
              c.getAttribute("tabindex")
            )[0];
          })(),
        m =
          j.querySelector(".api1-") ||
          [...j.querySelectorAll("._ap1_")].find((c) =>
            [...(c.children || [])].some((cc) =>
              cc?.classList?.contains("_ap1_")
            )
          );
      [l, m].forEach((el) => {
        if (!(el instanceof HTMLElement) || !el?.isConnected) return;
        const n = el.getBoundingClientRect(),
          o = Math.round(n.x + n.width * 0.5),
          p = Math.round(n.y + n.height * 0.5),
          q = {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: o,
            clientY: p,
          },
          r = el.getAttribute("tabindex");
        el.tabIndex = 0;
        el.focus();
        for (const e of ["mousedown", "mouseup", "click"])
          el.dispatchEvent(new MouseEvent(e, q));
        r ? el.setAttribute("tabindex", r) : el.removeAttribute("tabindex");
      });
    };
  setInterval(() => {
    const { g, ag } = c();
    for (const gr of [g, ag]) {
      if (!(gr instanceof HTMLElement)) return;
      if (!gr.isConnected) {
        window.removeEventListener("keydown", d);
        gr.dataset.listening = "false";
        return;
      }
      if (gr.dataset.listening === "true") return;
      window.addEventListener("keydown", (ev) => d(ev, gr));
      gr.dataset.listening = "true";
    }
  }, 500);
})();
