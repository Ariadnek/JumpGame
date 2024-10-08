const character = document.getElementById("character");
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
let counter = 0;
let isJumping = false;
let isPaused = false;
let characterPosition = 20; // Posição horizontal do personagem

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    } else if (event.code === "ArrowRight") {
        moveRight();
    } else if (event.code === "ArrowLeft") {
        moveLeft();
    } else if (event.code === "KeyP") {
        togglePause();
    }
});

function jump() {
    if (!isJumping && !isPaused) {
        isJumping = true;
        character.classList.add("animate");
        setTimeout(() => {
            character.classList.remove("animate");
            isJumping = false;
        }, 500);
    }
}

function moveRight() {
    if (!isPaused && characterPosition < 730) { // Limite direito
        characterPosition += 10;
        character.style.left = characterPosition + "px";
    }
}

function moveLeft() {
    if (!isPaused && characterPosition > 0) { // Limite esquerdo
        characterPosition -= 10;
        character.style.left = characterPosition + "px";
    }
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        block1.classList.add("paused");
        block2.classList.add("paused");
        clearInterval(checkDead);
    } else {
        block1.classList.remove("paused");
        block2.classList.remove("paused");
        startCheckDead();
    }
}

function startCheckDead() {
    checkDead = setInterval(() => {
        const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        const block1Left = parseInt(window.getComputedStyle(block1).getPropertyValue("left"));
        const block2Left = parseInt(window.getComputedStyle(block2).getPropertyValue("left"));

        if ((block1Left < characterPosition + 20 && block1Left > characterPosition && characterTop >= 130) ||
            (block2Left < characterPosition + 20 && block2Left > characterPosition && characterTop >= 110)) {
            block1.style.animation = "none";
            block2.style.animation = "none";
            alert("Fim de jogo. Pontuação: " + Math.floor(counter / 100));
            counter = 0;
            block1.style.animation = "block 3s infinite linear";
            block2.style.animation = "block 2.5s infinite linear";
        } else {
            counter++;
            document.getElementById("scoreSpan").innerText = Math.floor(counter / 100);
        }
    }, 10);
}

startCheckDead();
