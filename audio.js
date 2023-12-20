
document.addEventListener('click', () => {
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

                // Now 'averageAmplitude' can be used to determine the loudness
                console.log("Loudness:", averageAmplitude);
            }

            // Set up a loop to continuously check the loudness
            setInterval(getLoudness, 100); // Adjust the interval as needed

            console.log("Microphone detected");
        }).catch((err) => {
            console.log("no microfone detection."); onsole.log("no microfone detection.");
        });
    } else {
        console.log("no microfone detection.");
    }
});

