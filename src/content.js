
// This script will be injected into Gmail pages to block clicks on elements with keyboard shortcuts
// and display a tooltip with the shortcut key.

document.addEventListener('DOMContentLoaded', function() {
    // Define the mapping of Gmail elements to their keyboard shortcuts
    const shortcutMap = {
        'compose': {selector: 'div[role="button"][gh="cm"]', shortcut: 'c'},
        'search': {selector: 'input[aria-label="Search mail"]', shortcut: '/'},
        'nextMessage': {selector: 'div[role="button"][data-tooltip="Older"]', shortcut: 'n'},
        'prevMessage': {selector: 'div[role="button"][data-tooltip="Newer"]', shortcut: 'p'},
        'openMessage': {selector: 'div[role="button"][data-tooltip="Open"]', shortcut: 'o'},
        'archive': {selector: 'div[role="button"][data-tooltip^="Archive"]', shortcut: 'e'},
        'delete': {selector: 'div[role="button"][data-tooltip^="Delete"]', shortcut: '#'},
        'reply': {selector: 'div[role="button"][data-tooltip^="Reply"]', shortcut: 'r'},
        'replyAll': {selector: 'div[role="button"][data-tooltip^="Reply to all"]', shortcut: 'a'},
        'forward': {selector: 'div[role="button"][data-tooltip^="Forward"]', shortcut: 'f'}
    };

    // Function to block click and show tooltip
    function blockClickAndShowTooltip(event) {
        const element = event.target.closest('[data-gmail-shortcut]');
        if (element) {
            event.preventDefault();
            const shortcut = element.getAttribute('data-gmail-shortcut');
            element.setAttribute('title', `Shortcut: ${shortcut}`);
            // Show tooltip immediately
            $(element).tooltip('show');
        }
    }

    // Add the data-gmail-shortcut attribute and event listeners to the elements
    for (const key in shortcutMap) {
        const {selector, shortcut} = shortcutMap[key];
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.setAttribute('data-gmail-shortcut', shortcut);
            element.addEventListener('click', blockClickAndShowTooltip);
        });
    }
});
