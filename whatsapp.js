function addWhatsAppKbShortcuts() {
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
          e.ctrlKey
        )
      )
        return;
      e.preventDefault();
      [...(document.body?.getElementsByTagName("button") || [])]
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
        .at(0)
        ?.click();
    },
    backCb = (e) => {
      if (
        !(
          (e.key === "ArrowLeft" || e.key === "Left" || e.keyCode === 37) &&
          e.ctrlKey
        )
      )
        return;
      e.preventDefault();
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
          [b.getAttribute("aria-label"), b.getAttribute("data-icon")].some(
            (l) =>
              l?.toLowerCase().trim() === "back" ||
              l?.toLowerCase().trim().startsWith("back-")
          )
        )
        .at(0)
        ?.click();
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
      if (!((e.key?.toLowerCase() === "a" || e.keyCode === 65) && e.altKey))
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
      if (!((e.key?.toLowerCase() === "s" || e.keyCode === 83) && e.altKey))
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
    {
      e: archive,
      cb: archiveCb,
    },
    {
      e: back,
      cb: backCb,
    },
    {
      e: all,
      cb: allCb,
    },
    {
      e: unread,
      cb: unreadCb,
    },
    {
      e: favourites,
      cb: fvtCb,
    },
    {
      e: groups,
      cb: groupsCb,
    },
    {
      e: more,
      cb: moreCb,
    },
    {
      e: ngrp,
      cb: ngrpCb,
    },
    {
      e: close,
      cb: closeCb,
    },
    {
      e: search,
      cb: searchCb,
    },
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
      {
        e: archive,
        cb: archiveCb,
      },
      {
        e: back,
        cb: backCb,
      },
      {
        e: all,
        cb: allCb,
      },
      {
        e: unread,
        cb: unreadCb,
      },
      {
        e: favourites,
        cb: fvtCb,
      },
      {
        e: groups,
        cb: groupsCb,
      },
      {
        e: more,
        cb: moreCb,
      },
      {
        e: ngrp,
        cb: ngrpCb,
      },
      {
        e: close,
        cb: closeCb,
      },
      {
        e: search,
        cb: searchCb,
      },
    ]) {
      if (e instanceof HTMLElement && e.dataset.listening !== "true") {
        window.addEventListener("keydown", cb);
        e.dataset.listening = "true";
      }
    }
  }, 500);
}
/**
* Version with shortcuts only for tab buttons for types of messages
**/
function addWhatsAppKbShortcuts__TabBtnsOnly() {
  const queryAllElements = () => {
      const tabBtns = [...document.body.querySelectorAll('button[role="tab"]')],
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
          });
      return {
        all,
        unread,
        favourites,
        groups,
      };
    },
    allCb = (e) => {
      if (!((e.key.toLowerCase() === "q" || e.keyCode === 81) && e.altKey))
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
      if (!((e.key.toLowerCase() === "w" || e.keyCode === 87) && e.altKey))
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
      if (!((e.key.toLowerCase() === "a" || e.keyCode === 65) && e.altKey))
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
      if (!((e.key.toLowerCase() === "s" || e.keyCode === 83) && e.altKey))
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
    };
  const { all, unread, favourites, groups } = queryAllElements();
  for (const { e, cb } of [
    {
      e: all,
      cb: allCb,
    },
    {
      e: unread,
      cb: unreadCb,
    },
    {
      e: favourites,
      cb: fvtCb,
    },
    {
      e: groups,
      cb: groupsCb,
    },
  ]) {
    if (e instanceof HTMLElement && e.dataset.listening === "true") {
      e.removeAttribute("data-listening");
      window.removeEventListener("keydown", cb);
    }
  }
  setInterval(() => {
    const { all, unread, favourites, groups } = queryAllElements();
    for (const { e, cb } of [
      {
        e: all,
        cb: allCb,
      },
      {
        e: unread,
        cb: unreadCb,
      },
      {
        e: favourites,
        cb: fvtCb,
      },
      {
        e: groups,
        cb: groupsCb,
      },
    ]) {
      if (e instanceof HTMLElement && e.dataset.listening !== "true") {
        window.addEventListener("keydown", cb);
        e.dataset.listening = "true";
      }
    }
  }, 500);
}

/**
* Version with shortcuts only for archives
**/

function addWhatsAppKbShortcuts__ArchiveOnly() {
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
          .at(0);
      return {
        archive,
        back,
      };
    },
    archiveCb = (e) => {
      if (
        !(
          (e.key === "ArrowRight" || e.key === "Right" || e.keyCode === 39) &&
          e.ctrlKey
        )
      )
        return;
      e.preventDefault();
      [...(document.body?.getElementsByTagName("button") || [])]
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
        .at(0)
        ?.click();
    },
    backCb = (e) => {
      if (
        !(
          (e.key === "ArrowLeft" || e.key === "Left" || e.keyCode === 37) &&
          e.ctrlKey
        )
      )
        return;
      e.preventDefault();
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
          [b.getAttribute("aria-label"), b.getAttribute("data-icon")].some(
            (l) =>
              l?.toLowerCase().trim() === "back" ||
              l?.toLowerCase().trim().startsWith("back-")
          )
        )
        .at(0)
        ?.click();
    };
  const { archive, back } = queryAllElements();
  for (const { e, cb } of [
    {
      e: archive,
      cb: archiveCb,
    },
    {
      e: back,
      cb: backCb,
    },
  ]) {
    if (e instanceof HTMLElement && e.dataset.listening === "true") {
      e.removeAttribute("data-listening");
      window.removeEventListener("keydown", cb);
    }
  }
  setInterval(() => {
    const { archive, back } = queryAllElements();
    for (const { e, cb } of [
      {
        e: archive,
        cb: archiveCb,
      },
      {
        e: back,
        cb: backCb,
      },
    ]) {
      if (e instanceof HTMLElement && e.dataset.listening !== "true") {
        window.addEventListener("keydown", cb);
        e.dataset.listening = "true";
      }
    }
  }, 500);
}

// Version only for searching
function addWhatsAppShortcuts__SearchOnly() {
  const queryAllElements = () => {
      const search = [
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
        search,
      };
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
    };
  const { search } = queryAllElements();
  for (const { e, cb } of [
    {
      e: search,
      cb: searchCb,
    },
  ]) {
    if (e instanceof HTMLElement && e.dataset.listening === "true") {
      e.removeAttribute("data-listening");
      window.removeEventListener("keydown", cb);
    }
  }
  setInterval(() => {
    const { search } = queryAllElements();
    for (const { e, cb } of [
      {
        e: search,
        cb: searchCb,
      },
    ]) {
      if (e instanceof HTMLElement && e.dataset.listening !== "true") {
        window.addEventListener("keydown", cb);
        e.dataset.listening = "true";
      }
    }
  }, 500);
}
