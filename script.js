// Variable font axis settings for Ripple font
// Your font has two axes: wght (0-100) and RPPL (0-100)
const getRandomVariation = () => {
    const weight = Math.floor(Math.random() * 101); // 0-100
    const ripple = Math.floor(Math.random() * 101); // 0-100
    return `'wght' ${weight}, 'RPPL' ${ripple}`;
};

// Hero text - editable and hoverable per letter
const heroText = document.getElementById('heroText');

// Function to wrap text in spans
function wrapLettersInSpans() {
    const text = heroText.textContent;
    heroText.innerHTML = '';
    
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'letter';
        
        // Add hover effect to each letter
        span.addEventListener('mouseenter', () => {
            // Apply random variation
            span.style.fontVariationSettings = getRandomVariation();
            
            // If it's a letter, randomly switch case
            if (char.match(/[a-zA-Z]/)) {
                if (Math.random() > 0.5) {
                    span.textContent = char === char.toUpperCase() 
                        ? char.toLowerCase() 
                        : char.toUpperCase();
                }
                
                // Apply stylistic alternate randomly (only works on lowercase)
                if (Math.random() > 0.5) {
                    span.style.fontFeatureSettings = '"salt" 1';
                } else {
                    span.style.fontFeatureSettings = 'normal';
                }
            }
        });
        
        heroText.appendChild(span);
    });
}

// Initial wrap
wrapLettersInSpans();

// Re-wrap when user types
let typingTimeout;
heroText.addEventListener('input', () => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        wrapLettersInSpans();
    }, 500); // Wait 500ms after user stops typing
});
