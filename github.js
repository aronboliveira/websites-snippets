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
const functions = 'openSettings, openDevSettings, openTokens, openNewToken, fillForm';
console.log(functions);
