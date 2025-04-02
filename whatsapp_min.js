/**
  Installs listeners for keyboard shortcuts in Whatsapp Web
  1. Crtl + Alt + Right Arrow => Archived messages
  2. Ctrl + Alt + Left Arrow => Unarchived messages
  3. Alt + q => All messages tab
  4. Alt + w => Unread messages tab
  5. Alt + a => Favourites messages tab
  6. Alt + s => Group messages tab
  7. Alt + m => More options click
  8. Alt + n = Create new group
  9. Alt + b => Close new group drawer
  10. Alt + l => Focus in search bar (for typing)
  11. Alt + [Number] => Move between chats using keyboard numbers (Alt + 1, Alt + 2, etc...)
  NOTE: !! THIS NEEDS TO BE REACTIVATED EVERY TIME YOU LOAD THE WEBPAGE !!
  -> Pick the version of your preference and copy ONLY one line starting with javascript
**/

// 1. Complete version (all shortcuts available, except for moving specific chats using indexes)
javascript: (() => {const queryAllElements=()=>{const archive=[...(document.body?.getElementsByTagName("button")||[])].filter(b=>{const al=b.getAttribute("aria-label"),t=b.innerText;return["arquivado","arquivados","arquivada","arquivadas","arq.","archived","archive","arch.","archivado","archivados","archivada","archivadas","archivé","archivée","archivés","archivées","archiviato","archiviati","archiviata","archiviate","archiviert","archiv","архив","архивирован","архивировано","архивированы","архивирована","已归档","归档","存档","已歸檔","歸檔","存檔","アーカイブ","アーカイブ済み","保存済み","保管済み","보관됨","아카이브","보관","مؤرشف","أرشفة","محفوظ","الملفات المؤرشفة","arşivlendi","arşiv","gearchiveerd","archief","आर्काइव्ड","संग्रहित","अभिलेखागार","diarsipkan","arsip","đã lưu trữ","lưu trữ","ที่เก็บถาวร","เก็บถาวร","בארכיון","ארכיון","αρχειοθετημένα","αρχειοθέτηση","arc.","archd","archv"].some(l=>[al,t].some(t=>t?.toString().trim().toLowerCase()===l.trim().toLowerCase()))}).at(0),back=[...document.getElementsByTagName("header")].filter(h=>h.getElementsByTagName("button")||h.querySelector('[role="button"]')).flatMap(h=>[...h.getElementsByTagName("button"),...h.querySelectorAll('[role="button"]')]).filter(b=>[b.getAttribute("aria-label"),b.getAttribute("data-icon")].some(l=>l?.toLowerCase().trim()==="back"||l?.toLowerCase().trim().startsWith("back-"))).at(0),tabBtns=[...document.body.querySelectorAll('button[role="tab"]')],all=document.getElementById("all-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["all","todos","tout","alle","tutti","все","全部","すべて","전체","الكل","सभी","সব","تمام","semua","tất cả","tümü","wszystko","allemaal","all"].includes(t)}),unread=document.getElementById("unread-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["unread","não lidos","no leídos","non lus","ungelesen","non letti","непрочитанные","未读","未讀","未読","읽지 않음","غير المقروء","अनपढ़","অপঠিত","انپڑھی","belum dibaca","chưa đọc","okunmamış","nieprzeczytane","ongelezen"].includes(t)}),favourites=document.getElementById("favorites-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["favourites","favorites","favoritos","favoritas","favoris","favoriten","preferiti","избранное","收藏","お気に入り","즐겨찾기","المفضلة","पसंदीदा","পছন্দের","پسندیدہ","favorit","yêu thích","favoriler","ulubione","favorieten"].includes(t)}),groups=document.getElementById("group-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["groups","grupos","groupes","gruppen","gruppi","группы","群组","群組","グループ","그룹","مجموعات","समूह","গ্রুপ","گروپ","grup","nhóm","gruplar","grupy","groepen"].includes(t)}),more=[...document.getElementsByTagName("button")].filter(b=>b.title?.trim().toLowerCase()==="menu"&&(b.firstElementChild?.getAttribute("data-icon")?.trim().toLowerCase().startsWith("more-")||b.firstElementChild?.getAttribute("data-icon")?.trim().toLowerCase()==="more")).at(0),ngrp=[...document.getElementsByTagName("li")].flatMap(e=>[...e.querySelectorAll("span"),...e.querySelectorAll("div")]).find(el=>{const txt=el.innerText?.trim().toLowerCase();return["new group","novo grupo","nuevo grupo","nouveau groupe","neue gruppe","nuovo gruppo","новая группа","新群组","新群組","新しいグループ","새 그룹","مجموعة جديدة","नया समूह","নতুন গ্রুপ","نیا گروپ","grup baru","nhóm mới","yeni grup","nowa grupa","nieuwe groep"].includes(txt)}),close=[...document.querySelectorAll('div[role="button"]')].find(b=>["close","cerrar","fermer","chiudi","schließen","sluiten","关闭","بستن","إغلاق","κλείσιμο","закрыть","閉じる","닫기","fechar","बंद","বন্ধ","మూసివేయి","திற","അടയ്ക്കു","বন্ধ কৰক","بند","ปิด","đóng","luk","sulje","zavrieť","lukke","bezár","закрити","סגור","sulge","ປິດ"].includes(b.getAttribute("aria-label")?.trim().toLowerCase())||[...b.getElementsByTagName("span")].some(c=>["close-","cerrar-","fermer-","chiudi-","schließen-","sluiten-","关闭-","بستن-","إغلاق-","κλείσιμο-","закрыть-","閉じる-","닫기-","fechar-","बंद-","বন্ধ-","మూసివేయి-","திற-","അടയ്ക്കു-","বন্ধ-","بند-","ปิด-","đóng-","luk-","sulje-","zavrieť-","lukke-","bezár-","закрити-","סגור-","sulge-","ປິດ-"].includes(c.getAttribute("data-icon")?.trim().toLowerCase()))),search=[...document.querySelectorAll("p.selectable-text.copyable-text")].find(p=>p?.parentElement?.getAttribute("aria-label")?.trim().toLowerCase().replace(/\s.*/g,"")&&["pesquisar","busca","procurar","buscar","búsqueda","search","find","lookup","srch","recherche","rechercher","cerca","ricerca","suche","suchen","поиск","искать","搜索","查找","搜寻","搜尋","查找","搜尋","検索","探す","검색","찾기","بحث","البحث","ara","arama","zoeken","zoek","खोज","तलाश","cari","tìm kiếm","ค้นหา","חיפוש","αναζήτηση","archd","archv"].includes(p.parentElement?.getAttribute("aria-label")?.trim().toLowerCase().replace(/\s.*/g,"")));return{archive,back,all,unread,favourites,groups,more,ngrp,close,search}}; archiveCb=(e)=>{if(!((e.key==="ArrowRight"||e.key==="Right"||e.keyCode===39)&&e.ctrlKey&&e.altKey))return;e.preventDefault();[...(document.body?.getElementsByTagName("button")||[])].filter(b=>{const al=b.getAttribute("aria-label"),t=b.innerText;return["arquivado","arquivados","arquivada","arquivadas","arq.","archived","archive","arch.","archivado","archivados","archivada","archivadas","archivé","archivée","archivés","archivées","archiviato","archiviati","archiviata","archiviate","archiviert","archiv","архив","архивирован","архивировано","архивированы","архивирована","已归档","归档","存档","已歸檔","歸檔","存檔","アーカイブ","アーカイブ済み","保存済み","保管済み","보관됨","아카이브","보관","مؤرشف","أرشفة","محفوظ","الملفات المؤرشفة","arşivlendi","arşiv","gearchiveerd","archief","आर्काइव्ड","संग्रहित","अभिलेखागार","diarsipkan","arsip","đã lưu trữ","lưu trữ","ที่เก็บถาวร","เก็บถาวร","בארכיון","ארכיון","αρχειοθετημένα","αρχειοθέτηση","arc.","archd","archv"].some(l=>[al,t].some(t=>t?.toString().trim().toLowerCase()===l.trim().toLowerCase()))}).at(0)?.click();},backCb=(e)=>{if(!((e.key==="ArrowLeft"||e.key==="Left"||e.keyCode===37)&&e.ctrlKey&&e.altKey))return;e.preventDefault();[...document.getElementsByTagName("header")].filter(h=>h.getElementsByTagName("button")||h.querySelector('[role="button"]')).flatMap(h=>[...h.getElementsByTagName("button"),...h.querySelectorAll('[role="button"]')]).filter(b=>[b.getAttribute("aria-label"),b.getAttribute("data-icon")].some(l=>l?.toLowerCase().trim()==="back"||l?.toLowerCase().trim().startsWith("back-"))).at(0)?.click();},allCb=(e)=>{if(!((e.key?.toLowerCase()==="q"||e.keyCode===81)&&e.altKey))return;(document.getElementById("all-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["all","todos","tout","alle","tutti","все","全部","すべて","전체","الكل","सभी","সব","تمام","semua","tất cả","tümü","wszystko","allemaal","all"].includes(t)}))?.click();},unreadCb=(e)=>{if(!((e.key?.toLowerCase()==="w"||e.keyCode===87)&&e.altKey))return;(document.getElementById("unread-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["unread","não lidos","no leídos","non lus","ungelesen","non letti","непрочитанные","未读","未讀","未読","읽지 않음","غير المقروء","अनपढ़","অপঠিত","انپڑھی","belum dibaca","chưa đọc","okunmamış","nieprzeczytane","ongelezen"].includes(t)}))?.click();},fvtCb=(e)=>{if(!((e.key?.toLowerCase()==="a"||e.keyCode===65)&&e.altKey))return;(document.getElementById("favorites-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["favourites","favorites","favoritos","favoritas","favoris","favoriten","preferiti","избранное","收藏","お気に入り","즐겨찾기","المفضلة","पसंदीदा","পছন্দের","پسندیدہ","favorit","yêu thích","favoriler","ulubione","favorieten"].includes(t)}))?.click();},groupsCb=(e)=>{if(!((e.key?.toLowerCase()==="s"||e.keyCode===83)&&e.altKey))return;(document.getElementById("group-filter")??tabBtns.find(b=>{const t=b.innerText?.trim().toLowerCase();return["groups","grupos","groupes","gruppen","gruppi","группы","群组","群組","グループ","그룹","مجموعات","समूह","গ্রুপ","گروپ","grup","nhóm","gruplar","grupy","groepen"].includes(t)}))?.click();},moreCb=(e)=>{if(!((e.key?.toLowerCase()==="m"||e.keyCode===77)&&e.altKey))return;[...document.getElementsByTagName("button")].filter(b=>b.title?.trim().toLowerCase()==="menu"&&(b.firstElementChild?.getAttribute("data-icon")?.trim().toLowerCase().startsWith("more-")||b.firstElementChild?.getAttribute("data-icon")?.trim().toLowerCase()==="more")).at(0)?.click();},ngrpCb=(e)=>{if(!((e.key?.toLowerCase()==="n"||e.keyCode===78)&&e.altKey))return;[...document.getElementsByTagName("li")].flatMap(e=>[...e.querySelectorAll("span"),...e.querySelectorAll("div")]).find(el=>{const txt=el.innerText?.trim().toLowerCase();return["new group","novo grupo","nuevo grupo","nouveau groupe","neue gruppe","nuovo gruppo","новая группа","新群组","新群組","新しいグループ","새 그룹","مجموعة جديدة","नया समूह","নতুন গ্রুপ","نیا گروپ","grup baru","nhóm mới","yeni grup","nowa grupa","nieuwe groep"].includes(txt)})?.click();},closeCb=(e)=>{if(!((e.key?.toLowerCase()==="b"||e.keyCode===66)&&e.altKey))return;const closeBtn=[...document.querySelectorAll('div[role="button"]')].find(b=>["close","cerrar","fermer","chiudi","schließen","sluiten","关闭","بستن","إغلاق","κλείσιμο","закрыть","閉じる","닫기","fechar","बंद","বন্ধ","మూసివేయి","திற","അടയ്ക്കു","বন্ধ কৰক","بند","ปิด","đóng","luk","sulje","zavrieť","lukke","bezár","закрити","סגור","sulge","ປິດ"].includes(b.getAttribute("aria-label")?.trim().toLowerCase())||[...b.getElementsByTagName("span")].some(c=>c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("close-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("cerrar-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("fermer-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("chiudi-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("schließen-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("sluiten-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("关闭-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("بستن-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("إغلاق-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("κλείσιμο-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("закрыть-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("閉じる-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("닫기-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("fechar-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("बंद-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("বন্ধ-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("మూసివేయి-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("திற-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("അടയ്ക്കു-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("বন্ধ-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("بند-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("ปิด-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("đóng-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("luk-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("sulje-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("zavrieť-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("lukke-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("bezár-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("закрити-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("סגור-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("sulge-")||c?.getAttribute("data-icon")?.trim().toLowerCase()?.startsWith("ປິດ-")));closeBtn?.click();},searchCb=(e)=>{if(!((e.key?.toLowerCase()==="l"||e.keyCode===76)&&e.altKey))return;const p=[...document.querySelectorAll("p.selectable-text.copyable-text")].find(p=>p?.parentElement?.getAttribute("aria-label")?.trim().toLowerCase().replace(/\s.*/g,"")&&["pesquisar","busca","procurar","buscar","búsqueda","search","find","lookup","srch","recherche","rechercher","cerca","ricerca","suche","suchen","поиск","искать","搜索","查找","搜寻","搜尋","查找","搜尋","検索","探す","검색","찾기","بحث","البحث","ara","arama","zoeken","zoek","खोज","तलाश","cari","tìm kiếm","ค้นหา","חיפוש","αναζήτηση","archd","archv"].includes(p?.parentElement?.getAttribute("aria-label")?.trim().toLowerCase().replace(/\s.*/g,"")));if(!p)return;const parents=[];let currEl=p.parentElement,acc=0;while(currEl){parents.push(currEl);if(acc>=10||currEl===document.body)break;currEl=currEl.parentElement;acc+=1}const editable=parents.filter(Boolean).find(p=>p.contentEditable==="true");if(!editable)return;editable.focus();setTimeout(()=>{if(!editable?.isConnected)return;editable.click();const prevTi=editable.getAttribute("tabindex");editable.setAttribute("tabindex","-1");setTimeout(()=>{if(!editable?.isConnected)return;editable.dispatchEvent(new KeyboardEvent("keydown",{key:"Tab",code:"Tab",bubbles:true}));editable.setAttribute("tabindex",prevTi||"0")},50)},50)}; const tabBtns=[...document.body.querySelectorAll('button[role="tab"]')];const{archive,back,all,unread,favourites,groups,more,ngrp,close,search}=queryAllElements();for(const{e,cb}of[{e:archive,cb:archiveCb},{e:back,cb:backCb},{e:all,cb:allCb},{e:unread,cb:unreadCb},{e:favourites,cb:fvtCb},{e:groups,cb:groupsCb},{e:more,cb:moreCb},{e:ngrp,cb:ngrpCb},{e:close,cb:closeCb},{e:search,cb:searchCb}]){if(e instanceof HTMLElement&&e.dataset.listening==="true"){e.removeAttribute("data-listening");window.removeEventListener("keydown",cb);}}setInterval(()=>{const{archive,back,all,unread,favourites,groups,more,ngrp,close,search}=queryAllElements();for(const{e,cb}of[{e:archive,cb:archiveCb},{e:back,cb:backCb},{e:all,cb:allCb},{e:unread,cb:unreadCb},{e:favourites,cb:fvtCb},{e:groups,cb:groupsCb},{e:more,cb:moreCb},{e:ngrp,cb:ngrpCb},{e:close,cb:closeCb},{e:search,cb:searchCb}]){if(e instanceof HTMLElement&&e.dataset.listening!=="true"){window.addEventListener("keydown",cb);e.dataset.listening="true";}}},500); })();

// 2. Version only for tab buttons, for filtering messages
javascript:(()=>{const a=()=>{const b=[...document.body.querySelectorAll('button[role="tab"]')],c=document.getElementById("all-filter")??b.find(a=>{const b=a.innerText?.trim().toLowerCase();return["all","todos","tout","alle","tutti","все","全部","すべて","전체","الكل","सभी","সব","تمام","semua","tất cả","tümü","wszystko","allemaal","all"].includes(b)}),d=document.getElementById("unread-filter")??b.find(a=>{const b=a.innerText?.trim().toLowerCase();return["unread","não lidos","no leídos","non lus","ungelesen","non letti","непрочитанные","未读","未讀","未読","읽지 않음","غير المقروء","अनपढ़","অপঠিত","انپڑھی","belum dibaca","chưa đọc","okunmamış","nieprzeczytane","ongelezen"].includes(b)}),e=document.getElementById("favorites-filter")??b.find(a=>{const b=a.innerText?.trim().toLowerCase();return["favourites","favorites","favoritos","favoritas","favoris","favoriten","preferiti","избранное","收藏","お気に入り","즐겨찾기","المفضلة","पसंदीदा","পছন্দের","پسندیدہ","favorit","yêu thích","favoriler","ulubione","favorieten"].includes(b)}),f=document.getElementById("group-filter")??b.find(a=>{const b=a.innerText?.trim().toLowerCase();return["groups","grupos","groupes","gruppen","gruppi","группы","群组","群組","グループ","그룹","مجموعات","समूह","গ্রুপ","گروپ","grup","nhóm","gruplar","grupy","groepen"].includes(b)});return{all:c,unread:d,favourites:e,groups:f}},b=a=>{(a.key.toLowerCase()==="q"||a.keyCode===81)&&a.altKey&&(document.getElementById("all-filter")??tabBtns.find(a=>{const b=a.innerText?.trim().toLowerCase();return["all","todos","tout","alle","tutti","все","全部","すべて","전체","الكل","सभी","সব","تمام","semua","tất cả","tümü","wszystko","allemaal","all"].includes(b)}))?.click()},c=a=>{(a.key.toLowerCase()==="w"||a.keyCode===87)&&a.altKey&&(document.getElementById("unread-filter")??tabBtns.find(a=>{const b=a.innerText?.trim().toLowerCase();return["unread","não lidos","no leídos","non lus","ungelesen","non letti","непрочитанные","未读","未讀","未読","읽지 않음","غير المقروء","अनपढ़","অপঠিত","انپڑھی","belum dibaca","chưa đọc","okunmamış","nieprzeczytane","ongelezen"].includes(b)}))?.click()},d=a=>{(a.key.toLowerCase()==="a"||a.keyCode===65)&&a.altKey&&(document.getElementById("favorites-filter")??tabBtns.find(a=>{const b=a.innerText?.trim().toLowerCase();return["favourites","favorites","favoritos","favoritas","favoris","favoriten","preferiti","избранное","收藏","お気に入り","즐겨찾기","المفضلة","पसंदीदा","পছন্দের","پسندیدہ","favorit","yêu thích","favoriler","ulubione","favorieten"].includes(b)}))?.click()},e=a=>{(a.key.toLowerCase()==="s"||a.keyCode===83)&&a.altKey&&(document.getElementById("group-filter")??tabBtns.find(a=>{const b=a.innerText?.trim().toLowerCase();return["groups","grupos","groupes","gruppen","gruppi","группы","群组","群組","グループ","그룹","مجموعات","समूह","গ্রুপ","گروپ","grup","nhóm","gruplar","grupy","groepen"].includes(b)}))?.click()};const{all:f,unread:g,favourites:h,groups:i}=a();for(const{e:a,cb:j}of[{e:f,cb:b},{e:g,cb:c},{e:h,cb:d},{e:i,cb:e}])a instanceof HTMLElement&&a.dataset.listening==="true"&&(a.removeAttribute("data-listening"),window.removeEventListener("keydown",j));setInterval(()=>{const{all:f,unread:g,favourites:h,groups:i}=a();for(const{e:a,cb:j}of[{e:f,cb:b},{e:g,cb:c},{e:h,cb:d},{e:i,cb:e}])a instanceof HTMLElement&&a.dataset.listening!=="true"&&(window.addEventListener("keydown",j),a.dataset.listening="true")},500)})();

// 3. Version only for archive shortcuts
javascript:(()=>{const e=()=>{const e=[...(document.body?.getElementsByTagName("button")||[])].filter(e=>{const t=e.getAttribute("aria-label"),n=e.innerText;return["arquivado","arquivados","arquivada","arquivadas","arq.","archived","archive","arch.","archivado","archivados","archivada","archivadas","archivé","archivée","archivés","archivées","archiviato","archiviati","archiviata","archiviate","archiviert","archiv","архив","архивирован","архивировано","архивированы","архивирована","已归档","归档","存档","已歸檔","歸檔","存檔","アーカイブ","アーカイブ済み","保存済み","保管済み","보관됨","아카이브","보관","مؤرشف","أرشفة","محفوظ","الملفات المؤرشفة","arşivlendi","arşiv","gearchiveerd","archief","आर्काइव्ड","संग्रहित","अभिलेखागार","diarsipkan","arsip","đã lưu trữ","lưu trữ","ที่เก็บถาวร","เก็บถาวร","בארכיון","ארכיון","αρχειοθετημένα","αρχειοθέτηση","arc.","archd","archv"].some(e=>[t,n].some(t=>t?.toString().trim().toLowerCase()===e.trim().toLowerCase()))}).at(0),t=[...document.getElementsByTagName("header")].filter(e=>e.getElementsByTagName("button")||e.querySelector('[role="button"]')).flatMap(e=>[...e.getElementsByTagName("button"),...e.querySelectorAll('[role="button"]')]).filter(e=>[e.getAttribute("aria-label"),e.getAttribute("data-icon")].some(e=>"back"===e?.toLowerCase().trim()||e?.toLowerCase().trim().startsWith("back-"))).at(0);return{archive:e,back:t}},t=t=>{if(!("ArrowRight"===t.key||"Right"===t.key||39===t.keyCode)&&t.ctrlKey&&t.altKey)return;t.preventDefault(),[...(document.body?.getElementsByTagName("button")||[])].filter(e=>{const t=e.getAttribute("aria-label"),n=e.innerText;return["arquivado","arquivados","arquivada","arquivadas","arq.","archived","archive","arch.","archivado","archivados","archivada","archivadas","archivé","archivée","archivés","archivées","archiviato","archiviati","archiviata","archiviate","archiviert","archiv","архив","архивирован","архивировано","архивированы","архивирована","已归档","归档","存档","已歸檔","歸檔","存檔","アーカイブ","アーカイブ済み","保存済み","保管済み","보관됨","아카이브","보관","مؤرشف","أرشفة","محفوظ","الملفات المؤرشفة","arşivlendi","arşiv","gearchiveerd","archief","आर्काइव्ड","संग्रहित","अभिलेखागार","diarsipkan","arsip","đã lưu trữ","lưu trữ","ที่เก็บถาวร","เก็บถาวร","בארכיון","ארכיון","αρχειοθετημένα","αρχειοθέτηση","arc.","archd","archv"].some(t=>[t,n].some(e=>e?.toString().trim().toLowerCase()===t.trim().toLowerCase()))}).at(0)?.click()},n=e=>{if(!("ArrowLeft"===e.key||"Left"===e.key||37===e.keyCode)&&e.ctrlKey&&e.altKey)return;e.preventDefault(),[...document.getElementsByTagName("header")].filter(e=>e.getElementsByTagName("button")||e.querySelector('[role="button"]')).flatMap(e=>[...e.getElementsByTagName("button"),...e.querySelectorAll('[role="button"]')]).filter(e=>[e.getAttribute("aria-label"),e.getAttribute("data-icon")].some(e=>"back"===e?.toLowerCase().trim()||e?.toLowerCase().trim().startsWith("back-"))).at(0)?.click()};const{archive:o,back:r}=e();for(const e of[{e:o,cb:t},{e:r,cb:n}])e.e instanceof HTMLElement&&"true"===e.e.dataset.listening&&(e.e.removeAttribute("data-listening"),window.removeEventListener("keydown",e.cb));setInterval(()=>{const{archive:o,back:r}=e();for(const e of[{e:o,cb:t},{e:r,cb:n}])e.e instanceof HTMLElement&&"true"!==e.e.dataset.listening&&(window.addEventListener("keydown",e.cb),e.e.dataset.listening="true")},500)})();

// 4. Version only for searchbar shortcut
javascript:(()=>{const a=()=>{const a=[...document.querySelectorAll("p.selectable-text.copyable-text")].find(a=>["pesquisar","busca","procurar","buscar","búsqueda","search","find","lookup","srch","recherche","rechercher","cerca","ricerca","suche","suchen","поиск","искать","搜索","查找","搜寻","搜尋","查找","搜尋","検索","探す","검색","찾기","بحث","البحث","ara","arama","zoeken","zoek","खोज","तलाश","cari","tìm kiếm","ค้นหา","חיפוש","αναζήτηση","archd","archv"].includes(a.parentElement?.getAttribute("aria-label")?.trim().toLowerCase().replace(/\s.*/g,"")));return{search:a}},b=a=>{if(!((a.key?.toLowerCase()==="l"||a.keyCode===76)&&a.altKey))return;const b=[...document.querySelectorAll("p.selectable-text.copyable-text")].find(a=>["pesquisar","busca","procurar","buscar","búsqueda","search","find","lookup","srch","recherche","rechercher","cerca","ricerca","suche","suchen","поиск","искать","搜索","查找","搜寻","搜尋","查找","搜尋","検索","探す","검색","찾기","بحث","البحث","ara","arama","zoeken","zoek","खोज","तलाश","cari","tìm kiếm","ค้นหา","חיפוש","αναζήτηση","archd","archv"].includes(a?.parentElement?.getAttribute("aria-label")?.trim().toLowerCase().replace(/\s.*/g,""))),c=[];let d=b.parentElement,e=0;for(;b&&d;){if(c.push(d),d=d?.parentElement,e>=10||d===document.body)break;e+=1}const f=c.filter(Boolean).find(a=>a.contentEditable);f?.focus(),setTimeout(()=>{if(!f?.isConnected)return;f.click();const a=f.getAttribute("tabindex");f.setAttribute("tabindex","-1"),setTimeout(()=>{f?.isConnected&&(f?.dispatchEvent(new KeyboardEvent("keydown",{key:"Tab",code:"Tab",bubbles:!0})),f.setAttribute("tabindex",a))},50)},50)};const{search:c}=a();for(const{e:a,cb:d}of[{e:c,cb:b}])a instanceof HTMLElement&&a.dataset.listening==="true"&&(a.removeAttribute("data-listening"),window.removeEventListener("keydown",d));setInterval(()=>{const{search:c}=a();for(const{e:a,cb:d}of[{e:c,cb:b}])a instanceof HTMLElement&&a.dataset.listening!=="true"&&(window.addEventListener("keydown",d),a.dataset.listening="true")},500)})();

// 5. Chats by index keybindings
javascript:(()=>{const a=["arquivado","arquivados","arquivada","arquivadas","arq.","archived","archive","arch.","archivado","archivados","archivada","archivadas","archivé","archivée","archivés","archivées","archiviato","archiviati","archiviata","archiviate","archiviert","archiv","архив","архивирован","архивировано","архивированы","архивирована","已归档","归档","存档","已歸檔","歸檔","存檔","アーカイブ","アーカイブ済み","保存済み","保管済み","보관됨","아카이브","보관","مؤرشف","أرشفة","محفوظ","الملفات المؤرشفة","arşivlendi","arşiv","gearchiveerd","archief","आर्काइव्ड","संग्रहित","अभिलेखागार","diarsipkan","arsip","đã lưu trữ","lưu trữ","ที่เก็บถาวร","เก็บถาวร","בארכיון","ארכיון","αρχειοθετημένα","αρχειοθέτηση","arc.","archd","archv"],b=()=>[...([...document.body.querySelectorAll("*")].filter(e=>(e instanceof HTMLHeadingElement||e.tagName==="HEADER")&&a.includes(e.innerText?.trim().toLowerCase())).at(0)?.closest(".copyable-area")?.querySelectorAll("*")??[])].find(e=>[...e.children].some(c=>c.role==="listitem")),c=()=>({g:[...(document.body?.querySelectorAll('div[role="grid"]')||[])].filter(gr=>{const t=gr.getAttribute("aria-label")?.trim().toLowerCase();return["chat list","conversation list","message list","lista de chats","lista de conversas","lista de conversaciones","liste de chats","liste de conversations","elenco chat","elenco conversazioni","Chat-Liste","Konversationsliste","lijst van chats","gesprekkenlijst","λίστα συνομιλιών","λίστα συζητήσεων","チャットリスト","会話リスト","채팅 목록","대화 목록","รายการแชท","รายการสนทนา","daftar obrolan","daftar percakapan","danh sách trò chuyện","danh sách hội thoại","список чатов","список бесед","قائمة الدردشة","قائمة المحادثات","רשימת צ'אטים","רשימת שיחות","चैट सूची","वार्तालाप सूची","চ্যাট তালিকা","কথোপকথন তালিকা","聊天列表","对话列表","聊天清單","對話清單"].includes(t)})[0]??document.body,ag:b()}),d=(ev,g)=>{const e=()=>[...(b()?.closest(".copyable-area")?.querySelectorAll("*")??[])].some(e=>(e instanceof HTMLHeadingElement||e?.tagName==="HEADER")&&a.includes(e.innerText?.trim().toLowerCase()));ev.altKey&&ev.preventDefault();const f=Array.from({length:9}).map((_,i)=>i+1),h=parseInt(ev.key,10);if(e())g=b();if(!(g instanceof HTMLElement&&g.isConnected&&ev.altKey&&(f.map(i=>i.toString()).includes(ev.key)||f.map(i=>i+48).includes(ev.keyCode)))||!Number.isFinite(h))return;let i=g.querySelectorAll('[role="listitem"]');if(i.length<h)return;i=Array.from(i).sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);const j=i[h-1];if(!j?.isConnected)return;const k=j.querySelectorAll("*"),l=[...k].filter(c=>["true","false"].includes(c.getAttribute("aria-selected")))[0]||(()=>{if(!(j.firstElementChild instanceof HTMLElement))return null;return[...j.firstElementChild.children].filter(c=>c.getAttribute("tabindex"))[0]})(),m=j.querySelector(".api1-")||[...j.querySelectorAll("._ap1_")].find(c=>[...(c.children||[])].some(cc=>cc?.classList?.contains("_ap1_")));[l,m].forEach(el=>{if(!(el instanceof HTMLElement)||!el?.isConnected)return;const n=el.getBoundingClientRect(),o=Math.round(n.x+n.width*0.5),p=Math.round(n.y+n.height*0.5),q={bubbles:true,cancelable:true,view:window,clientX:o,clientY:p},r=el.getAttribute("tabindex");el.tabIndex=0;el.focus();for(const e of["mousedown","mouseup","click"])el.dispatchEvent(new MouseEvent(e,q));r?el.setAttribute("tabindex",r):el.removeAttribute("tabindex")})};setInterval(()=>{const{g,ag}=c();for(const gr of[g,ag]){if(!(gr instanceof HTMLElement))return;if(!gr.isConnected){window.removeEventListener("keydown",d);gr.dataset.listening="false";return}if(gr.dataset.listening==="true")return;window.addEventListener("keydown",ev=>d(ev,gr));gr.dataset.listening="true"}},500)})();
