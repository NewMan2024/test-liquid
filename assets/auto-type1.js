// In a separate JavaScript file or in a script tag within your theme (recommended)
document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("search");
  var suggestionsContainer = document.getElementById("search-suggestions");

  searchInput.addEventListener("input", function () {
    var query = this.value.trim();

    if (query === "") {
      suggestionsContainer.innerHTML = "";
      return;
    }

    fetch("/search/suggest.json?q=" + encodeURIComponent(query))
      .then((response) => response.json())
      .then((data) => {
        var suggestions = data['suggestions'];
        var suggestionList = suggestions.map((suggestion) => {
          return "<div class='suggestion'>" + suggestion.value + "</div>";
        }).join("");
        suggestionsContainer.innerHTML = suggestionList;
      })
      .catch((error) => {
        console.error("Error fetching search suggestions:", error);
      });
  });
});