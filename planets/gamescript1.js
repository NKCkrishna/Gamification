let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

const planetArea = document.getElementById('planetArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');

// Fun facts about planets
const planetFacts = {
    'Mercury': 'Mercury is the smallest planet in our solar system.',
    'Venus': 'Venus has a thick atmosphere full of carbon dioxide.',
    'Earth': 'Earth is the only planet known to support life.',
    'Mars': 'Mars is known as the red planet due to iron oxide on its surface.',
    'Jupiter': 'Jupiter is the largest planet in our solar system.',
    'Saturn': 'Saturn is famous for its rings made of ice and rock.',
    'Uranus': 'Uranus rotates on its side, making it unique.',
    'Neptune': 'Neptune is known for its strong winds and storms.',
    'Kepler-186f': 'Kepler-186f is an Earth-sized exoplanet in the habitable zone of its star, located 492 light-years away.',
    'Proxima Centauri b': 'Proxima Centauri b is the closest exoplanet to Earth, located 4.24 light-years away.',
    'TRAPPIST-1d': 'TRAPPIST-1d is one of seven Earth-sized planets in the TRAPPIST-1 system, located 39.13 light-years away.',
    'HD 209458 b': 'HD 209458 b, also known as Osiris, was the first exoplanet observed transiting its star, located 153 light-years away.',
    'Gliese 581g': 'Gliese 581g is a potentially habitable exoplanet in the Gliese 581 system, located 20.3 light-years away.',
    'WASP-12b': 'WASP-12b is a "hot Jupiter" that is being consumed by its star, located 600 light-years away.',
    'Kepler-452b': 'Kepler-452b is known as "Earth’s cousin" due to its size and location in its star’s habitable zone, 1,400 light-years away.',
    '55 Cancri e': '55 Cancri e is a super-Earth that may have lava flows on its surface, located 41 light-years away.',
    'GJ 1214b': 'GJ 1214b is a "water world" exoplanet with a thick atmosphere, located 48 light-years away.',
    'Kepler-22b': 'Kepler-22b is an exoplanet in the habitable zone of a Sun-like star, located 600 light-years away.',
    'HD 189733 b': 'HD 189733 b has a deep blue color, possibly due to glass rain in its atmosphere, located 64.5 light-years away.',
    'K2-18b': 'K2-18b is a potentially habitable super-Earth with water vapor in its atmosphere, located 124 light-years away.',
    'Kepler-1649c': 'Kepler-1649c is an Earth-sized planet in its star’s habitable zone, located 300 light-years away.',
    'LHS 1140 b': 'LHS 1140 b is a rocky super-Earth in the habitable zone of a red dwarf star, located 41 light-years away.',
    'HD 40307 g': 'HD 40307 g is a super-Earth in the habitable zone, located 42 light-years away.',
    'Kapteyn b': 'Kapteyn b is one of the oldest known potentially habitable planets, located 12.8 light-years away.',
    'Kepler-10c': 'Kepler-10c is a "mega-Earth," significantly larger than Earth, located 564 light-years away.',
    'TOI 700 d': 'TOI 700 d is an Earth-sized exoplanet in the habitable zone, located 100 light-years away.',
    'Ross 128 b': 'Ross 128 b is a temperate exoplanet located 11 light-years away, orbiting a quiet red dwarf star.',
    'Kepler-90i': 'Kepler-90i is a small, hot exoplanet in a system with eight planets, located 2,545 light-years away.',
    'PSR B1257+12 c': 'PSR B1257+12 c orbits a pulsar and was one of the first exoplanets ever discovered, located 2,300 light-years away.',
    'Kepler-62f': 'Kepler-62f is a potentially habitable exoplanet slightly larger than Earth, located 1,200 light-years away.',
    'Gliese 667 Cc': 'Gliese 667 Cc is a super-Earth in the habitable zone of its star, located 23.6 light-years away.',
    'Kepler-442b': 'Kepler-442b is one of the most Earth-like exoplanets, located 1,206 light-years away.',
    'OGLE-2016-BLG-1195Lb': 'OGLE-2016-BLG-1195Lb is one of the most distant known planets, located 13,000 light-years away.',
    'Kepler-69c': 'Kepler-69c is an Earth-sized planet in its star’s habitable zone, located 2,700 light-years away.',
    'Wolf 1061c': 'Wolf 1061c is a potentially habitable super-Earth, located 14 light-years away.',
    'Kepler-186e': 'Kepler-186e is part of the same system as Kepler-186f and is located 492 light-years away.',
    'Kepler-138b': 'Kepler-138b is a rocky planet smaller than Earth, located 200 light-years away.',
    'GJ 1132 b': 'GJ 1132 b is a rocky exoplanet with a possible secondary atmosphere, located 41 light-years away.',
    'HD 85512 b': 'HD 85512 b is a potentially habitable super-Earth, located 36 light-years away.',
    'Kepler-37b': 'Kepler-37b is the smallest exoplanet discovered, located 215 light-years away.',
    'Kepler-444e': 'Kepler-444e is a rocky planet in an ancient star system, located 119 light-years away.',
    'KELT-9b': 'KELT-9b is the hottest known exoplanet, with surface temperatures exceeding 4,300°C, located 670 light-years away.',
    'HR 8799 e': 'HR 8799 e is a young gas giant with a massive disk of debris around its star, located 129 light-years away.',
    'HAT-P-7b': 'HAT-P-7b is a gas giant with high-speed winds and reflective clouds, located 1,040 light-years away.',
    'WASP-121b': 'WASP-121b is a "hot Jupiter" with an atmosphere that contains heavy metals, located 850 light-years away.',
    'CoRoT-7b': 'CoRoT-7b is a rocky planet that orbits very close to its star, likely with extreme volcanic activity, located 489 light-years away.',
    'Kepler-11f': 'Kepler-11f is one of six planets in the tightly packed Kepler-11 system, located 2,000 light-years away.',
    'HD 149026 b': 'HD 149026 b is a gas giant with a core larger than any other known planet, located 256 light-years away.',
    'Kepler-438b': 'Kepler-438b is one of the most Earth-like exoplanets, located 470 light-years away.',
    'Gliese 876d': 'Gliese 876d is a Neptune-like planet in a multi-planet system, located 15 light-years away.',
    'Kepler-20e': 'Kepler-20e is a small rocky exoplanet in a system with both rocky and gas planets, located 950 light-years away.',
    'WASP-19b': 'WASP-19b is a hot Jupiter that completes an orbit in less than one Earth day, located 815 light-years away.',
    // Add more exoplanets as needed...
};


// Function to start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    planetArea.innerHTML = '';
    startButton.disabled = true;

    gameInterval = setInterval(addPlanet, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to add a random planet
function addPlanet() {
    const planetNames = Object.keys(planetFacts);
    const planetName = planetNames[Math.floor(Math.random() * planetNames.length)];
    const planetElement = document.createElement('div');

    planetElement.className = 'planet';
    planetElement.style.width = '50px';
    planetElement.style.height = '50px';
    planetElement.style.backgroundColor = 'hsl(' + Math.floor(Math.random() * 360) + ', 70%, 50%)';
    planetElement.style.left = Math.random() * (planetArea.offsetWidth - 50) + 'px';
    planetElement.style.top = Math.random() * (planetArea.offsetHeight - 50) + 'px';
    planetElement.textContent = planetName;
    planetElement.style.display = 'flex';
    planetElement.style.alignItems = 'center';
    planetElement.style.justifyContent = 'center';
    planetElement.style.color = 'white';
    planetElement.style.fontSize = '12px';
    planetElement.style.borderRadius = '50%';
    
    planetElement.addEventListener('click', () => {
        score += 10; // Increase score on click
        scoreDisplay.textContent = `Score: ${score}`;
        alert(planetFacts[planetName]); // Show fact about the planet
        planetArea.removeChild(planetElement);
    });

    planetArea.appendChild(planetElement);
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        alert(`Game Over! Your score is: ${score}`);
        startButton.disabled = false; // Enable the start button
    }
}

// Attach the start game function to the button
startButton.addEventListener('click', startGame);