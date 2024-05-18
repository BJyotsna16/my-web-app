// JavaScript for the buttons
document.addEventListener("DOMContentLoaded", function () {
    // Get the "Medican" button by its class
    const medicanButton = document.querySelector(".button.medican");
    medicanButton.addEventListener("click", function () {
        alert("You clicked the Medican button!");
    });

    // Get the "Doctor" button by its class
    const doctorButton = document.querySelector(".button.doctor");
    doctorButton.addEventListener("click", function () {
        alert("You clicked the Doctor button!");
    });
});
