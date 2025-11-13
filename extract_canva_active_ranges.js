/*
Simple snippet to extract and save the menus on screen from a Canva editor panel.
Save it as a bookmark and click on it to trigger.
*/
javascript: (() => {
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(
    new Blob([
      Array.from(document.querySelectorAll("input[type='range']")).reduce(
        (acc, e) => {
          return (
            acc +
            `Name: ${e.labels[0]?.innerText ?? "#NOLABEL"}; Value: ${
              e.value
            }    \n`
          );
        },
        ""
      ),
    ]),
    { type: "text/plain" }
  );
  anchor.download = "range-input-values-canva-" + Date.now() + ".txt";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(anchor.href);
})();
