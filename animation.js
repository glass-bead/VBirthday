document.addEventListener("DOMContentLoaded", function () {

    // Get the reference to the "+" button and the candle element
    var plusButton = document.getElementById("plusButton");
    var okButton = document.getElementById("okButton");
    var candle = document.getElementById("birthdayCandle");

    plusButton.addEventListener("click", function () {
        // Clone the candle element
        var candleClone = candle.cloneNode(true);

        // Add a new class name to the cloned candle
        candleClone.classList.add("new-candle");

        // Calculate the random position within the bounds of the .icing element
        var maxX = 260;
        var minX = -10;
        var randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

        var maxY = 35;
        var minY = -20;
        var randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        // Set the position of the cloned candle
        candleClone.style.left = randomX + "px";
        candleClone.style.top = randomY + "px";

        // Append the cloned candle to the same location
        candle.parentNode.appendChild(candleClone);

        // Trigger the animation by adding a temporary class
        candleClone.classList.add("drop-animation");

        // Remove the temporary class after the animation completes
        setTimeout(function () {
            candleClone.classList.remove("drop-animation");
        }, 1000); 
    });

    okButton.addEventListener("click", function () {
        // Get the reference to information element and change text
        var information = document.querySelector(".information h1");
        information.textContent = "Blow the candles!";

        // Hide "ok" and "+" buttons
        plusButton.style.display = "none";
        okButton.style.display = "none";
    })
 
});

