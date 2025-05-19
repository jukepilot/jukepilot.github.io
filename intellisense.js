const words = ["Programmer.", "Builder.", "UI Designer.", "Brainrotted Individual."];
const typingEl = document.getElementById("typing");
const popupEl = document.getElementById("autocomplete-popup");

let wordIndex = 0;
let charIndex = 0;
let isTyping = true;
let isAutocompleting = false;

function resetPopup() {
    popupEl.style.opacity = "0";
    popupEl.style.transform = "translateY(5px)";
}

function showPopup(suggestion) {
    popupEl.textContent = suggestion;
    popupEl.style.opacity = "0.5";
    popupEl.style.transform = "translateY(0)";
}

function typeLoop() {
    const currentWord = words[wordIndex];

    if (isTyping) {
        if (charIndex < 3) {
            typingEl.textContent += currentWord[charIndex];
            charIndex++;
            setTimeout(typeLoop, 100);
        } else if (!isAutocompleting) {
            isAutocompleting = true;
            showPopup(currentWord);
            setTimeout(() => {
                typingEl.textContent = currentWord;
                charIndex = currentWord.length;
                resetPopup();
                setTimeout(() => {
                    isTyping = false;
                    typeLoop();
                }, 2000); // Pause before deleting
            }, 600);
        }
    } else {
        // Deleting the entire word
        if (charIndex > 0) {
            typingEl.textContent = typingEl.textContent.slice(0, -1);
            charIndex--;
            setTimeout(typeLoop, 60);
        } else {
            // Reset for next word
            isTyping = true;
            isAutocompleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeLoop, 500);
        }
    }
}

resetPopup();
typeLoop();
