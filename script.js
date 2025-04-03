document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const body = document.body;
    
    // Initialize movement vectors for each card
    cards.forEach(card => {
        card.dataset.velocityX = (Math.random() - 0.5) * 1.5;
        card.dataset.velocityY = (Math.random() - 0.5) * 1.5;
    });
    
    // Function to smoothly update card movement with vectors
    function moveCards() {
        cards.forEach(card => {
            let floatX = parseFloat(card.dataset.floatX) || 0;
            let floatY = parseFloat(card.dataset.floatY) || 0;
            let velocityX = parseFloat(card.dataset.velocityX);
            let velocityY = parseFloat(card.dataset.velocityY);
            
            // Apply velocity to position
            floatX += velocityX;
            floatY += velocityY;
            
            // Reverse direction if the card moves too far from its original position
            if (Math.abs(floatX) > 20) card.dataset.velocityX = -velocityX;
            if (Math.abs(floatY) > 20) card.dataset.velocityY = -velocityY;
            
            card.dataset.floatX = floatX;
            card.dataset.floatY = floatY;
            
            updateCardTransform(card);
        });
    }
    
    function updateCardTransform(card) {
        const x = parseFloat(card.dataset.rotateX) || 0;
        const y = parseFloat(card.dataset.rotateY) || 0;
        const floatX = parseFloat(card.dataset.floatX) || 0;
        const floatY = parseFloat(card.dataset.floatY) || 0;
        
        card.style.transition = "transform 0.2s ease-out";
        card.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${-y}deg) translate(${floatX}px, ${floatY}px)`;
    }
    
    setInterval(moveCards, 100); // Move the cards smoothly every 100ms

    // Function to update the speed of movement every few seconds
    function updateSpeed() {
        cards.forEach(card => {
            card.dataset.velocityX = (Math.random() - 0.5) * 1.5;
            card.dataset.velocityY = (Math.random() - 0.5) * 1.5;
        });
    }
    
    setInterval(updateSpeed, 3000); // Change speed every 3 seconds

    /*document.addEventListener("mousemove", (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            let x = (e.clientX - rect.left - rect.width / 2) / 20;
            let y = (e.clientY - rect.top - rect.height / 2) / 20;
            
            // Limit the rotation to a larger range
            x = Math.max(-15, Math.min(15, x));
            y = Math.max(-15, Math.min(15, y));
            
            card.dataset.rotateX = x;
            card.dataset.rotateY = y;
            
            updateCardTransform(card);
        });
    });*/
    
    // Change background color on hover
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            const computedStyle = window.getComputedStyle(card);
            const cardColor = computedStyle.borderColor || "rgb(100, 100, 100)";
            const darkerColor = cardColor.replace(/rgb\((\d+), (\d+), (\d+)\)/, (match, r, g, b) => {
                return `rgb(${r * 0.5}, ${g * 0.5}, ${b * 0.5})`;
            });
            body.style.backgroundColor = darkerColor;
        });

        card.addEventListener("mouseleave", () => {
            body.style.backgroundColor = "#111"; // Reset to default dark background
        });
    });
});
