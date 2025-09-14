async function startFaceLogin() {
    if (typeof faceapi === "undefined") {
        console.error("❌ face-api.js not loaded yet!");
    } else {
        console.log("✅ face-api.js loaded successfully!");
    }
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => video.srcObject = stream);

    video.addEventListener('play', async () => {
        const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detections) {
            alert("No face detected!");
            return;
        }

        // ✅ Normally, you’d compare with stored embeddings in DB.
        // For demo, we assume user is "demoUser"
        fetch("/auth/face-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: "demoUser" })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("✅ Login Successful");
                    window.location.href = "/dashboard"; // redirect
                } else {
                    alert("❌ Face not recognized");
                }
            });
    });
}
