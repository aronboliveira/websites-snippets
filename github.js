/** 
*  Profile click 
*  @return {void}
**/
const openSettings = () => {
  document.querySelector('.avatar.circle')?.click(); 
  setTimeout(() => window.open(document.querySelector('a[href="/settings/profile"]')?.href, '_self'), 2000);
}
// javascript:(function(){ document.querySelector('.avatar.circle')?.click(); setTimeout(() => window.open(document.querySelector('a[href="/settings/profile"]')?.href, '_self'), 2000);})();
/**
* Repository click
* @return {void}
**/
const openRepositories = () => {
  document.querySelector('.avatar.circle')?.click();
  setTimeout(() => window.open([...document.querySelectorAll('a[class^="prc-ActionList-ActionListContent"]')].filter(a => a.innerText?.trim().toLowerCase().includes('your repositories')).at(0)?.href, '_self'), 2000);
}
// javascript:(function(){ document.querySelector('.avatar.circle')?.click();setTimeout(() => window.open([...document.querySelectorAll('a[class^="prc-ActionList-ActionListContent"]')].filter(a => a.innerText?.trim().toLowerCase().includes('your repositories')).at(0)?.href, '_self'), 2000); })()
/** 
*  Developer settings click 
*  @return {void}
**/
const openDevSettings = () => {
  setTimeout(() => window.open(document.querySelector('a[href="/settings/apps"]')?.href, '_self'), 2000);
}
/** 
*  Personal access tokens click
*  @return {void}
**/
const openTokens = () => {
  setTimeout(() => window.open(document.querySelector('a[href="/settings/tokens"]')?.href, '_self'), 2000);
}
/** 
*  Generate new classic token 
*  @return {void}
**/
const openNewToken = () => {
  /* Details for generating new token */
  setTimeout(() => document.querySelector('.details-reset.details-overlay.d-inline-block.position-relative')?.click(), 2000);
  /* Generate new token */
  setTimeout(() => window.open(document.querySelector('a[href="/settings/tokens/new"]')?.href, '_self'), 2000);
}
// javascript:(function(){setTimeout(() => document.querySelector('.details-reset.details-overlay.d-inline-block.position-relative')?.click(), 2000);setTimeout(() => window.open(document.querySelector('a[href="/settings/tokens/new"]')?.href, '_self'), 2000);})();
/** 
*  Fillings
*  @return {void}
**/
const fillForm = () => {
  const scrolling = { behavior: 'smooth', block: 'center',  inline: 'center' };
  setTimeout(() => {
    const nt = document.getElementById('oauth_access_description');
    if (nt && 'value' in nt) {
      nt.scrollIntoView(scrolling);
      nt.value = 'Access to private repos';
    }
    setTimeout(() => {
      const rp = document.getElementsByName('oauth_access[scopes][]')[0];
      if (rp && 'checked' in rp) {
        rp.scrollIntoView(scrolling);
        if (!rp.checked) {
          rp.dispatchEvent(new MouseEvent('click', { bubbles: false }));
          rp.checked = true;
        }
        setTimeout(() => {
          [...document.querySelectorAll('.btn-primary.btn[type="submit"]')].filter(b => b.innerText.toLowerCase().trim() === 'generate token').at(0)?.click();
        }, 1000);
      }
    }, 500);
  }, 2000);
}
// javascript:(() => { const scrolling = { behavior: 'smooth', block: 'center', inline: 'center' }; setTimeout(() => { const nt = document.getElementById('oauth_access_description'); if (nt && 'value' in nt) { nt.scrollIntoView(scrolling); nt.value = 'Access to private repos'; } setTimeout(() => { const rp = document.getElementsByName('oauth_access[scopes][]')[0]; if (rp && 'checked' in rp) { rp.scrollIntoView(scrolling); if (!rp.checked) { rp.dispatchEvent(new MouseEvent('click', { bubbles: false })); rp.checked = true; } setTimeout(() => { [...document.querySelectorAll('.btn-primary.btn[type="submit"]')].filter(b => b.innerText.toLowerCase().trim() === 'generate token').at(0)?.click();%20},%201000);%20}%20},%20500);%20},%202000);%20})();
const checkBranchRules = () => {
    const markRelatedCheckbox = (l) => {
        if (!(l instanceof HTMLElement)) return;
        let cb;
        if (l instanceof HTMLLabelElement)
            cb = l.closest("fieldset").querySelector(`#${l.htmlFor}`);
        if (!cb)
            cb = l
                .closest("[class^=prc-FormControl-ControlHorizontalLayout]")
                ?.querySelector('input[type="checkbox"]');
        if (!(cb instanceof HTMLInputElement && cb.type === "checkbox")) return;
        if (!cb.checked) cb.click();
        cb.checked = true;
    };
    [...document.getElementsByTagName("label")]
        .filter((l) => {
            const t = l.innerText?.toLowerCase().trim();
            if (!t) return false;
            return [
                "restrict creations",
                "restringir creaciones",
                "restringir création",
                "restreindre les créations",
                "restringi creazioni",
                "restringir criações",
                "ограничить создание",
                "निर्माण प्रतिबंधित करें",
                "تقييد الإنشاءات",
                "作成を制限",
                "생성 제한",
                "限制创建",
                "restrict updates",
                "restringir actualizaciones",
                "restreindre mises à jour",
                "restringi aggiornamenti",
                "restringir atualizações",
                "ограничить обновления",
                "अपडेट प्रतिबंधित करें",
                "تقييد التحديثات",
                "更新を制限",
                "업데이트 제한",
                "限制更新",
                "restrict deletions",
                "restringir eliminaciones",
                "restreindre suppressions",
                "restringi eliminazioni",
                "restringir exclusões",
                "ограничить удаление",
                "हटाना प्रतिबंधित करें",
                "تقييد الحذف",
                "削除を制限",
                "삭제 제한",
                "限制删除",
                "require a pull request before merging",
                "requerir solicitud de extracción antes de fusionar",
                "exiger demande d'extraction avant fusion",
                "richiedi pull request prima del merge",
                "exigir pull request antes de mesclar",
                "требовать запрос на включение перед слиянием",
                "मर्ज करने से पहले पुल अनुरोध आवश्यक है",
                "يتطلب طلب سحب قبل الدمج",
                "マージ前にプルリクエストを必須にする",
                "병합 전 풀 요청 필요",
                "合并前需要拉取请求",
                "block force pushes",
                "bloquear empujes forzados",
                "bloquer pushes forcés",
                "blocca push forzati",
                "bloquear pushes forçados",
                "блокировать принудительные отправки",
                "जबरदस्ती धकेलना अवरुद्ध करें",
                "منع الدفع القسري",
                "強制プッシュをブロック",
                "강제 푸시 차단",
                "阻止强制推送",
            ].includes(t);
        })
        .forEach((l) => markRelatedCheckbox(l));
    setTimeout(() => {
        const ra = [...document.getElementsByTagName("label")]
            .filter((l) =>
                [
                    "required approvals",
                    "aprobaciones requeridas",
                    "approbations requises",
                    "approvazioni richieste",
                    "aprovações necessárias",
                    "требуемые утверждения",
                    "आवश्यक स्वीकृतियाँ",
                    "الموافقات المطلوبة",
                    "必要な承認",
                    "필수 승인",
                    "需要的批准",
                ].includes(l.innerText?.toLowerCase().trim())
            )
            .at(0)
            .parentElement.querySelector("button");
        if (!ra) return;
        ra.click();
        setTimeout(() => {
            [
                ...document.querySelectorAll(
                    'span[class^="prc-ActionList-ItemLabel"]'
                ),
            ]
                .filter((o) => o.innerText?.toLowerCase().trim() === "1")
                .at(0)
                .closest('[role="menuitemradio"]')
                .click();
        }, 250);
    }, 1000);
};
// javascript:(function(){const e=()=>{const e=t=>{if(!(t instanceof HTMLElement))return;let e;e=t instanceof HTMLLabelElement?t.closest("fieldset").querySelector(`#${t.htmlFor}`):t.closest("[class^=prc-FormControl-ControlHorizontalLayout]")?.querySelector('input[type="checkbox"]'),e instanceof HTMLInputElement&&"checkbox"===e.type&&(e.checked||(e.dispatchEvent("click",{bubbles:!1}),e.checked=!0)};[...document.getElementsByTagName("label")].filter(t=>{const n=t.innerText?.toLowerCase().trim();return!!n&&["restrict creations","restringir creaciones","restringir création","restreindre les créations","restringi creazioni","restringir criações","ограничить создание","निर्माण प्रतिबंधित करें","تقييد الإنشاءات","作成を制限","생성 제한","限制创建","restrict updates","restringir actualizaciones","restreindre mises à jour","restringi aggiornamenti","restringir atualizações","ограничить обновления","अपडेट प्रतिबंधित करें","تقييد التحديثات","更新を制限","업데이트 제한","限制更新","restrict deletions","restringir eliminaciones","restreindre suppressions","restringi eliminazioni","restringir exclusões","ограничить удаление","हटाना प्रतिबंधित करें","تقييد الحذف","削除を制限","삭제 제한","限制删除","require a pull request before merging","requerir solicitud de extracción antes de fusionar","exiger demande d'extraction avant fusion","richiedi pull request prima del merge","exigir pull request antes de mesclar","требовать запрос на включение перед слиянием","मर्ज करने से पहले पुल अनुरोध आवश्यक है","يتطلب طلب سحب قبل الدمج","マージ前にプルリクエストを必須にする","병합 전 풀 요청 필요","合并前需要拉取请求","block force pushes","bloquear empujes forzados","bloquer pushes forcés","blocca push forzati","bloquear pushes forçados","блокировать принудительные отправки","जबरदस्ती धकेलना अवरुद्ध करें","منع الدفع القسري","強制プッシュをブロック","강제 푸시 차단","阻止强制推送"].includes(n)}).forEach(t=>e(t)),setTimeout(()=>{const t=[...document.getElementsByTagName("label")].filter(t=>["required approvals","aprobaciones requeridas","approbations requises","approvazioni richieste","aprovações necessárias","требуемые утверждения","आवश्यक स्वीकृतियाँ","الموافقات المطلوبة","必要な承認","필수 승인","需要的批准"].includes(t.innerText?.toLowerCase().trim())).at(0)?.parentElement?.querySelector("button");t&&(t.click(),setTimeout(()=>{[...document.querySelectorAll('span[class^="prc-ActionList-ItemLabel"]')].filter(t=>"1"===t.innerText?.toLowerCase().trim()).at(0)?.closest('[role="menuitemradio"]')?.click()},250))},1e3)})();

