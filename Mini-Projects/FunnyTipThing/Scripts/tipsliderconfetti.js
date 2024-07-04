const tipSlider = document.getElementById('tipSlider');
const tipValue = document.getElementById('tipValue');
const confettiCanvas = document.getElementById('confetti');
const confettiContext = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];

tipSlider.addEventListener('input', function () {
    const value = tipSlider.value;
    tipValue.textContent = `${value}%`;
    updateSliderColor(value);
    if (value == 100) {
        startConfetti();
    }
});

function updateSliderColor(value) {
    if (value < 50) {
        tipSlider.style.color = 'green';
    } else if (value < 75) {
        tipSlider.style.color = 'orange';
    } else {
        tipSlider.style.color = 'red';
    }
}

function startConfetti() {
    confettiPieces.length = 0;
    for (let i = 0; i < 200; i++) {
        confettiPieces.push(createConfettiPiece());
    }
    requestAnimationFrame(updateConfetti);
}

function createConfettiPiece() {
    return {
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        r: Math.random() * 6 + 4,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    };
}

function updateConfetti() {
    confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (const piece of confettiPieces) {
        confettiContext.beginPath();
        confettiContext.arc(piece.x, piece.y, piece.r, 0, Math.PI * 2);
        confettiContext.fillStyle = piece.color;
        confettiContext.fill();
        piece.x += piece.dx;
        piece.y += piece.dy;
        if (piece.x > confettiCanvas.width || piece.x < 0 || piece.y > confettiCanvas.height || piece.y < 0) {
            piece.x = Math.random() * confettiCanvas.width;
            piece.y = Math.random() * confettiCanvas.height;
        }
    }
    requestAnimationFrame(updateConfetti);
}
