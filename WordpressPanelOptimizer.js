javascript: (() => {
  const runCode = () => {
    const listElement = document.getElementById("the-list");
    if (listElement) {
      const links = listElement.querySelectorAll("a");
      links.forEach((a) => {
        a.target = "_blank";
      });
      const wpManager = document.querySelector(
        "a[href$='page=wp_file_manager']"
      );
      if (wpManager) {
        wpManager.target = "_blank";
      }
      const MEDIA_TERMS = {
        pt: ["mídia", "media"],
        en: ["media"],
        es: ["medios", "multimedia"],
        fr: ["médias", "médiathèque"],
        de: ["medien"],
        it: ["media", "multimedia"],
        nl: ["media"],
        ru: ["медиа", "медиафайлы"],
        ja: ["メディア"],
        zh: ["媒体", "媒體"],
        ko: ["미디어"],
        ar: ["وسائط"],
        pl: ["media", "multimedia"],
        tr: ["medya"],
        sv: ["media"],
        da: ["medier"],
        no: ["media"],
        fi: ["media"],
        cs: ["média"],
        hu: ["média"],
        ro: ["media"],
        uk: ["медіа"],
        he: ["מדיה"],
      };

      const allMediaTerms = Object.values(MEDIA_TERMS).flat();
      const wpMedia = Array.from(
        document.getElementsByClassName("wp-menu-name")
      ).find((e) =>
        allMediaTerms.some((it) =>
          e.innerText.trim().toLowerCase().startsWith(it)
        )
      );
      if (wpMedia) {
        const mediaAnchor = wpMedia.closest("a");
        if (mediaAnchor) mediaAnchor.target = "_blank";
        wpMedia.target = "_blank";
      }
    }
  };
  setTimeout(() => {
    runCode();
    document.querySelectorAll("button.notice-dismiss").forEach((btn) => {
      btn.click();
    });
  }, 1000);
})();
