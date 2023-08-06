<script>
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("header-search");
    const placeholderOne = searchInput.getAttribute("data-placeholder-one");
    const placeholderTwo = searchInput.getAttribute("data-placeholder-two");
    const placeholderThree = searchInput.getAttribute("data-placeholder-three");
    const typingSpeed = parseInt(searchInput.getAttribute("data-typing-speed"));
    const deletingSpeed = parseInt(searchInput.getAttribute("data-deleting-speed"));
    const delayAfterDeleting = parseInt(searchInput.getAttribute("data-delay-after-deleting"));
    const delayBeforeFirstDelete = parseInt(searchInput.getAttribute("data-delay-before-first-delete"));
    const delayAfterWordTyped = parseInt(searchInput.getAttribute("data-delay-after-word-typed"));

    const placeholders = [placeholderOne, placeholderTwo, placeholderThree];
    let currentPlaceholderIndex = 0;
    let currentPlaceholder = placeholders[currentPlaceholderIndex];
    let typingTimeout;
    let deletingTimeout;

    function typePlaceholder() {
      searchInput.setAttribute("placeholder", currentPlaceholder);
    }

    function deletePlaceholder() {
      const placeholderLength = currentPlaceholder.length;
      if (placeholderLength > 0) {
        currentPlaceholder = currentPlaceholder.slice(0, -1);
        searchInput.setAttribute("placeholder", currentPlaceholder);
        deletingTimeout = setTimeout(deletePlaceholder, deletingSpeed);
      } else {
        currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholders.length;
        currentPlaceholder = placeholders[currentPlaceholderIndex];
        typingTimeout = setTimeout(typePlaceholder, delayAfterWordTyped);
      }
    }

    function startTyping() {
      typingTimeout = setTimeout(typePlaceholder, delayAfterDeleting);
    }

    searchInput.addEventListener("focus", function () {
      clearTimeout(typingTimeout);
      clearTimeout(deletingTimeout);
      searchInput.setAttribute("placeholder", ""); // Clear existing placeholder when focused
    });

    searchInput.addEventListener("blur", function () {
      clearTimeout(typingTimeout);
      clearTimeout(deletingTimeout);
      currentPlaceholderIndex = 0;
      currentPlaceholder = placeholders[currentPlaceholderIndex];
      searchInput.setAttribute("placeholder", ""); // Clear placeholder when blurred
    });

    startTyping(); // Start the typing animation on page load
  });
</script>
