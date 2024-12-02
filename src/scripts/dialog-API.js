document.addEventListener('DOMContentLoaded', function () {
    const dialogElement = document.querySelector('#task-dialog'); // Ensure to select the right dialog by ID.
    const openDialogBtn = document.getElementById('open-dialog-btn');
    const closeDialogBtn = document.getElementById('close-dialog-btn');
    
    // Opens the dialog
    openDialogBtn.addEventListener('click', () => {
        dialogElement.showModal(); // Use showModal for modal dialogs
    });

    // Close dialog on close button click
    closeDialogBtn.addEventListener('click', () => {
        dialogElement.close();
    });

    // Close dialog on backdrop click
    dialogElement.addEventListener('click', closeOnBackDropClick);

    function closeOnBackDropClick({ currentTarget, target }) {
        if (target === currentTarget) {
            dialogElement.close();
        }
    }

    // Polyfill for browsers without dialog support
    if (window.HTMLDialogElement === undefined) {
        const dialogs = document.querySelectorAll('dialog');
        dialogs.forEach(dialog => dialogPolyfill.registerDialog(dialog));
    }
});
