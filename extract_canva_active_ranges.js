javascript:(()=>{const content=Array.from(document.querySelectorAll("input[type='range']")).reduce((acc,e)=>{return acc+`Name: ${e.labels[0]?.innerText??"#NOLABEL"}; Value: ${e.value}\n`;},"");const anchor=document.createElement("a");anchor.href=URL.createObjectURL(new Blob([content],{type:"text/plain"}));anchor.download="range-input-values-canva-"+Date.now()+".txt";document.body.appendChild(anchor);anchor.click();document.body.removeChild(anchor);URL.revokeObjectURL(anchor.href);})();
/* REMOVE EVERYTHING HERE AND BELOW AFTER DOWNLOADING OR COPYING 
Simple snippet to copy the range input values from a Canva editor panel into a downloadable .txt
*/
