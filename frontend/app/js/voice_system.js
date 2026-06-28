let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById('startRecord');
const stopBtn = document.getElementById('stopRecord');
const audioPlayback = document.getElementById('audioPlayback');

startBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) audioChunks.push(e.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioUrl;
            audioPlayback.style.display = 'block';
            audioChunks = []; // Reset for next recording
            // Here you can add logic to upload the Blob to the server
        };
        
        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        startBtn.innerText = 'يتم التسجيل...';
    } catch (err) {
        console.error('فشل الوصول للمايكروفون:', err);
        alert('يرجى السماح بصلاحيات المايكروفون لنظام hm-ya');
    }
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    startBtn.innerText = '🔴 بدء التسجيل';
});
