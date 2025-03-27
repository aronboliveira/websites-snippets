const scrolling = { behavior: 'smooth', block: 'center',  inline: 'center' };
/* Profile click */
const ca = document.querySelector('.avatar.circle');
ca.click();
/* Settings click */
const st = document.getElementById(':r22:');
setTimeout(() => window.open(st?.href, '_self'), 2000);
/* Developer settings click */
setTimeout(() => window.open(document.querySelector('a[href="/settings/apps"]')?.href, '_self'), 2000);
/* Personal access tokens click */
setTimeout(() => window.open(document.querySelector('a[href="/settings/tokens")')?.href, '_self'), 2000));
/* Details for generating new token */
setTimeout(() => document.querySelector('.details-reset.details-overlay.d-inline-block.position-relative')?.click(), 2000);
/* Generate new token */
setTimeout(() => window.open(document.querySelector('a[href="/settings/tokens/new"]')?.href, '_self'), 2000));
/* Fillings */
setTimeout(() => {
  const nt = document.getElementById('oauth_access_description');
  if (nt && 'value' in nt) {
      nt.scrollIntoView(scrolling);
      nt.value = 'Access to private repos';
  }
  setTimeout(() => {
    const rp = document.getElementsByName('oauth_access[scopes][]')[0];
    if (rp && 'checked' in nt) {
      rp.scrollIntoView(scrolling);
      if (!nt.chcked) {
        nt.dispatchEvent(new MouseEvent('click', { bubbles: false });
        nt.checked = true;
      }
    }
  }, 500);
  document.getElementById('oauth_access_description')?.value = 'Access to private repos';
}, 2000);

