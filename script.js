const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fileNameDisplay = document.getElementById('file-name');
const enhanceBtn = document.getElementById('enhance-btn');
let img = new Image();

upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = function (event) {
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
        fileNameDisplay.textContent = e.target.files[0].name;
    };
    reader.readAsDataURL(e.target.files[0]);
});

enhanceBtn.addEventListener('click', enhanceImage);

function enhanceImage() {
    if (!img.src) {
        alert('Please upload an image first!');
        return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Simple Enhancement: Increase brightness by 20%
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 1.2;     // Red
        data[i + 1] = data[i + 1] * 1.2; // Green
        data[i + 2] = data[i + 2] * 1.2; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
}
