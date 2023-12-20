document.addEventListener("DOMContentLoaded", function () {

    /* Global flags */
    var blowable = false;
    var blowing = false;

    /* Element references*/
    var plusButton = document.getElementById("plusButton");
    var okButton = document.getElementById("okButton");
    var candle = document.getElementById("birthdayCandle");
    var information = document.querySelector(".information h1");
    var candles = document.querySelectorAll(".candle");
    var candleIndex = 0;

    /* Add candles when user clicks on the "+" button */
    plusButton.addEventListener("click", function () {

        // Clone the candle element
        var candleClone = candle.cloneNode(true);

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

    /* Allow user to blow the candles when they click "ok" button */
    okButton.addEventListener("click", function () {

        // Change message
        information.textContent = "Blow the candles!";

        // Hide "ok" and "+" buttons
        plusButton.style.display = "none";
        okButton.style.display = "none";

        // Allow blowing and detect audio
        blowable = true;
        candles = document.querySelectorAll(".candle");
        detectAudio();

    });

    /* Function that detect audio input */
    function detectAudio() {
        const audioCtx = new (window.AudioContext || window.AudioContext)();

        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ "audio": true }).then((stream) => {
                const microphone = audioCtx.createMediaStreamSource(stream);
                const analyser = audioCtx.createAnalyser();

                // Connect the microphone to the analyser
                microphone.connect(analyser);

                analyser.fftSize = 256; // You can adjust the size based on your needs
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                // Function to get the current loudness
                function getLoudness() {
                    analyser.getByteFrequencyData(dataArray);

                    // Calculate the average amplitude
                    const averageAmplitude = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

                    if (averageAmplitude >= 100) {
                        console.log("BLOWING!!");
                        blowing = true;
                        extinguishCandles();
                    } else {
                        blowing = false;
                    }

                    // Now 'averageAmplitude' can be used to determine the loudness
                    console.log("Loudness:", averageAmplitude);
                }

                // Set up a loop to continuously check the loudness
                setInterval(getLoudness, 100); // Adjust the interval as needed

                console.log("Microphone detected");
            }).catch((err) => {
                console.log("no microfone detection.");
            });
        } else {
            console.log("no microfone detection.");
        }
    }

    /* Function to extinguish candles */
    function extinguishCandles() {

        if (candleIndex < candles.length) {
            if (blowing == true) {
                var flame = candles[candleIndex].querySelector(".flame");
                flame.style.display = "none";

                candleIndex++;
            }

            setInterval(function () {
                if (candleIndex < candles.length) {
                    extinguishCandles();
                }
            }, 500);
        } else {
            information.textContent = "HAPPY BIRTHDAY!!";
        }
    }

});