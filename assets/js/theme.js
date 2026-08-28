(function () {
  const storageKey = "theme";
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function readStoredTheme() {
    try {
      const theme = window.localStorage.getItem(storageKey);
      return theme === "light" || theme === "dark" ? theme : null;
    } catch (_error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (_error) {
      // The selected theme still applies for the current page.
    }
  }

  function applyTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;

    if (persist) storeTheme(theme);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  function getTheme() {
    return document.documentElement.dataset.theme;
  }

  const storedTheme = readStoredTheme();
  applyTheme(storedTheme || (mediaQuery.matches ? "dark" : "light"));

  mediaQuery.addEventListener("change", (event) => {
    if (!readStoredTheme()) applyTheme(event.matches ? "dark" : "light");
  });

  window.siteTheme = {
    get: getTheme,
    toggle: function () {
      const theme = getTheme() === "dark" ? "light" : "dark";
      applyTheme(theme, true);
      return theme;
    },
  };
})();
