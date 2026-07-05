let clicks = 0;
const btn = document.getElementById('action-btn');
const counterDisplay = document.getElementById('counter');

btn.addEventListener('click', () => {
    clicks++;
    counterDisplay.textContent = `Clicks: ${clicks}`;
    
    // Change background color randomly
    const randomColor = `hsl(${Math.random() * 360}, 70%, 30%)`;
    document.body.style.backgroundColor = randomColor;
});
