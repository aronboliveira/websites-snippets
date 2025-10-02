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
    }
  };
  setTimeout(() => {
    runCode();
    document.querySelectorAll("button.notice-dismiss").forEach((btn) => {
      btn.click();
    });
  }, 1000);
})();
