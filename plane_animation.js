// Enhanced airplane takeoff animation with smoke trail and variations
function triggerAirplaneTakeoff(messageLength = 50) {
    const sendBtn = document.getElementById('sendBtn');
    if (!sendBtn) return;
    
    // Calculate duration based on message length (1.5s to 3.5s range)
    // Longer messages = longer flight time
    const baseDuration = 3.5;
    const maxDuration = 6.5;
    const durationMultiplier = Math.min(messageLength / 200, 1); // Cap at 200 chars
    const duration = baseDuration + (maxDuration - baseDuration) * durationMultiplier;
    
    // Random trajectory selection
    const trajectories = [
        'airplane-straight',
        'airplane-curve-left',
        'airplane-curve-right',
        'airplane-zigzag',
        'airplane-spiral'
    ];

    const randomTrajectory = 'airplane-straight';
    // Random Trjectory const randomTrajectory = trajectories[Math.floor(Math.random() * trajectories.length)];
    
    // Get send button position
    const btnRect = sendBtn.getBoundingClientRect();
    
    // Create airplane element
    const airplane = document.createElement('img');
    airplane.src = '/static/images/Aerospace.png';
    airplane.className = `airplane-animation ${randomTrajectory}`;
    airplane.style.left = `${btnRect.left + btnRect.width / 2 - 30}px`;
    airplane.style.top = `${btnRect.top}px`;
    airplane.style.setProperty('--duration', `${duration}s`);
    
    // Add to document
    document.body.appendChild(airplane);
    
    // Create smoke trail
    createSmokeTrail(airplane, duration);
    
    // Remove after animation completes
    setTimeout(() => {
        if (airplane.parentNode) {
            airplane.parentNode.removeChild(airplane);
        }
    }, duration * 1000);
}

// Generate smoke trail that follows the airplane
function createSmokeTrail(airplane, duration) {
    const smokeInterval = 80; // Generate smoke puff every 80ms
    const totalPuffs = Math.floor((duration * 1000) / smokeInterval);
    let puffCount = 0;
    
    const smokeTimer = setInterval(() => {
        if (puffCount >= totalPuffs || !airplane.parentNode) {
            clearInterval(smokeTimer);
            return;
        }
        
        // Get current airplane position
        const rect = airplane.getBoundingClientRect();
        
        // Create smoke puff
        const smoke = document.createElement('div');
        smoke.className = 'smoke-trail smoke-puff';
        smoke.style.left = `${rect.left + rect.width / 2 - 15}px`;
        smoke.style.top = `${rect.top + rect.height - 10}px`;
        
        // Add slight random offset for more natural look
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 10;
        smoke.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        document.body.appendChild(smoke);
        
        // Remove smoke puff after animation
        setTimeout(() => {
            if (smoke.parentNode) {
                smoke.parentNode.removeChild(smoke);
            }
        }, 1500);
        
        puffCount++;
    }, smokeInterval);
}
