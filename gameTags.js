// LegendOJ1, August 7 2024
// Update the CCU readings on the projects page

async function fetchGameData(universeIds) {
    try {
        const url = `https://games.roproxy.com/v1/games?universeIds=${universeIds}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.json();
    } catch(err) {
        console.error("Error fetching game data:", err);
        return null;
    }
}

function abbreviateNumber(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + "B+";
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + "M+";
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + "K+";
    } else {
        return number.toString();
    }
}

function updateCCU(data) {
    data.data.forEach(game => {
        const projectDiv = document.querySelector(`[data-universe-id="${game.id}"]`);
        if (projectDiv) {
            const ccuElement = projectDiv.querySelector("[data-ccu]");
            if (ccuElement) {
                ccuElement.textContent = `${game.playing} Active`;
            }
        }
    });
}

function updateVisits(data) {
    data.data.forEach(game => {
        const projectDiv = document.querySelector(`[data-universe-id="${game.id}"]`);
        if (projectDiv) {
            const visitsElement = projectDiv.querySelector("[data-visits]");
            if (visitsElement) {
                visitsElement.textContent = `${abbreviateNumber(game.visits)} Visits`;
            }
        }
    });
}


document.addEventListener("DOMContentLoaded", async () => {
    const projectsContainer = document.querySelector(".games");
    const universeIds = Array.from(projectsContainer.querySelectorAll("[data-universe-id]")).map(div => div.getAttribute("data-universe-id")).join(",");

    if (universeIds) {
        
        const gameData = await fetchGameData(universeIds);
        if (gameData) {
            updateCCU(gameData);
            updateVisits(gameData);
        }
    }
});