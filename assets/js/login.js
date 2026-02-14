const loadSection = document.getElementById('section__load');
const loginSection = document.getElementById('login');
const mainSection = document.getElementById('main');
const dots = document.querySelectorAll('.pin-dot');
const numbers = document.querySelectorAll('.pin__number');
const backspace = document.querySelector('.btn__backspace');
const SRC_NORMAL = "assets/main/pin_draw.png";
const SRC_ACTIVE = "assets/main/pin_draw_h.png";
const clickSound = new Audio("assets/sounds/click.mp3");
const cancelSound = new Audio("assets/sounds/cancel.mp3");
let currentPin = "";

loadSection.style.display = "flex";
loginSection.style.display = "none";
mainSection.style.display = "none";

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function fadeOut(element, callback) {
    let opacity = 1;
    const interval = setInterval(() => {
        opacity -= 0.05;
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(interval);
            element.style.display = "none";
            element.style.opacity = "1";
            if (callback) callback();
        }
    }, 20);
}

function fadeIn(element) {
    element.style.display = "flex";
    let opacity = 0;
    element.style.opacity = opacity;
    const interval = setInterval(() => {
        opacity += 0.05;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(interval);
            element.style.opacity = "1";
        }
    }, 20);
}

window.addEventListener("load", () => {
    setTimeout(() => {
        fadeOut(loadSection, () => {
            fadeIn(loginSection);
        });
    }, 1500);
});

function updateDots() {
    dots.forEach((dot, index) => {
        dot.src = index < currentPin.length ? SRC_ACTIVE : SRC_NORMAL;
    });
}

function submitPin(pin) {
    if (window.mnor && window.mnor.checkPin) {
        window.mnor.checkPin(pin);
    }
}

numbers.forEach(num => {
    num.onclick = () => {
        if (currentPin.length < 4) {
            playSound(clickSound);
            currentPin += num.dataset.value;
            updateDots();
            if (currentPin.length === 4) {
                setTimeout(() => submitPin(currentPin), 200);
            }
        }
    };
});

backspace.onclick = () => {
    if (currentPin.length > 0) {
        playSound(cancelSound);
        currentPin = currentPin.slice(0, -1);
        updateDots();
    }
};
