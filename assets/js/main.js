(function () {
  const script = document.currentScript;
  const scriptPath = script ? new URL(script.src, window.location.href).pathname : "";
  const basePath = scriptPath.replace(/\/assets\/js\/main\.js$/, "");

  const withBasePath = function (path) {
    return basePath + path;
  };

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const input = document.querySelector("#search-input");
  const results = document.querySelector("#search-results");
  const count = document.querySelector("#search-count");

  if (!input || !results || !count) {
    return;
  }

  const escapeHTML = function (value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  };

  const render = function (items) {
    if (!items.length) {
      results.innerHTML = "";
      count.textContent = input.value.trim() ? "No matching articles yet." : "Start typing to search the archive.";
      return;
    }

    count.textContent = items.length === 1 ? "1 article found." : items.length + " articles found.";
    results.innerHTML = items.map(function (item) {
      return [
        '<article class="article-card">',
        '<a class="card-image" href="' + item.url + '" aria-label="' + escapeHTML(item.title) + '">',
        '<img src="' + item.cover_image + '" alt="" loading="lazy">',
        "</a>",
        '<div class="card-body">',
        '<div class="eyebrow-row"><a href="' + withBasePath("/category/") + item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") + '/">' + escapeHTML(item.category) + "</a><time>" + escapeHTML(item.date) + "</time></div>",
        '<h2><a href="' + item.url + '">' + escapeHTML(item.title) + "</a></h2>",
        "<p>" + escapeHTML(item.excerpt) + "</p>",
        '<div class="card-meta">By ' + escapeHTML(item.author) + "</div>",
        "</div>",
        "</article>"
      ].join("");
    }).join("");
  };

  fetch(withBasePath("/search.json"))
    .then(function (response) {
      return response.json();
    })
    .then(function (articles) {
      input.addEventListener("input", function () {
        const query = input.value.trim().toLowerCase();

        if (!query) {
          render([]);
          return;
        }

        render(articles.filter(function (article) {
          const haystack = [
            article.title,
            article.author,
            article.category,
            article.excerpt,
            (article.tags || []).join(" ")
          ].join(" ").toLowerCase();
          return haystack.indexOf(query) !== -1;
        }));
      });
    })
    .catch(function () {
      count.textContent = "Search index could not be loaded.";
    });
}());
