const addCountryFlags = () => {
  const images = document.querySelectorAll('[data-testhook="product-image"]');

  images.forEach(image => {
    // Prevent adding the flag multiple times
    if (image.parentElement?.querySelector('.product-flag')) return;

    // Replace this later
    const country = 'US';
    const flagUrl = chrome.runtime.getURL(`content/flags/us.svg`);

    // Create icon
    const flagIcon = document.createElement('img');
    flagIcon.src = flagUrl;
    flagIcon.alt = `${country} flag`;
    flagIcon.classList.add('product-flag');
    flagIcon.style.position = 'absolute';
    flagIcon.style.top = '0px';
    flagIcon.style.right = '1px';
    flagIcon.style.width = '42px';
    flagIcon.style.height = '30px';
    flagIcon.style.filter = 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.25))';

    // Ensure the parent is positioned relatively for absolute flag positioning
    const parent = image.parentElement;

    if (parent) {
      parent.style.position = 'relative';
      parent.appendChild(flagIcon);
    }
  });
};

window.addEventListener('load', addCountryFlags);

// If products are loaded dynamically (like infinite scroll)
const observer = new MutationObserver(addCountryFlags);
observer.observe(document.body, { childList: true, subtree: true });
