document.addEventListener("DOMContentLoaded", function() {
  const openDialogButton = document.getElementById("open-dialog-btn");
  const dialog = document.getElementById("task-dialog");
  const closeDialogButton = document.getElementById("close-dialog-btn");

  openDialogButton.addEventListener("click", function() {
      dialog.showModal();
  });

  closeDialogButton.addEventListener("click", function() {
      dialog.close();
  });

  dialog.addEventListener("click", function(event) {
      const dialogBounds = dialog.getBoundingClientRect();
      if (
          event.clientX < dialogBounds.left ||
          event.clientX > dialogBounds.right ||
          event.clientY < dialogBounds.top ||
          event.clientY > dialogBounds.bottom
      ) {
          dialog.close();
      }
  });
});
