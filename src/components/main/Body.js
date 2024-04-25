import React, { useState, useEffect } from 'react';
import '../main/BodyStyle.css';

const WhackAMoleCard = () => {
  const [activeHole, setActiveHole] = useState(null);
  const [score, setScore] = useState(0);

  const holes = Array(16).fill(null); // Create 4x4 grid

  const handleClick = (index) => {
    if (index === activeHole) {
      setScore(score + 1); // Increase score on successful whack
    }
    setActiveHole(null); // Hide mole after click
  };

  useEffect(() => {
    const popUpMole = () => {
      const randomIndex = Math.floor(Math.random() * holes.length);
      setActiveHole(randomIndex);
    };

    const intervalId = setInterval(popUpMole, 1000); // Show mole every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);  

  return (
    <div className="whack-a-mole-card">
      <div className="hole-container">
        {holes.map((hole, index) => (
          <div
            key={index}
            className={`hole ${index === activeHole ? 'active' : ''}`} // Set active hole style
            style={{ backgroundColor: getRandomColor() }} // Assign random color
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

function getRandomColor() {
  const colors = ['blue', 'red']; // Define your desired colors
  return colors[Math.floor(Math.random() * colors.length)];
}

export default WhackAMoleCard;
