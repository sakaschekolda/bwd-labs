document.addEventListener("DOMContentLoaded", function () {
    const burgerButton = document.getElementById("burger");
    const header = document.querySelector(".header");

    // Event listener for burger button
    burgerButton.addEventListener("click", function () {
        header.classList.toggle("open"); // This adds/removes the 'open' class
    });
});
