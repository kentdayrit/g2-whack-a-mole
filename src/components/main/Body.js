import React, { useState, useEffect } from 'react';
import '../main/BodyStyle.css';

const WhackAMoleCard = () => {
  const [activeHole, setActiveHole] = useState(null);
  const [score, setScore] = useState(0);

  const holes = Array(16).fill(null); // Create 4x4 grid

  const handleClick = (index) => {
    if (index === activeHole) {
      setScore(score + 1); // Increase score on successful whack
    } else {
      setScore(0);
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
    <div>
      <div className="whack-a-mole-card">
        <div className="hole-container">
          {holes.map((hole, index) => (
            <div
              key={index}
              className={`hole ${index === activeHole ? 'active' : ''}`} // Set active hole style
              style={{ backgroundImage: getRandomColor() }} // Assign random color
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <h5>Score: {score}</h5>
    </div>
  );
};

function getRandomColor() {
  const colors = ['red']; // Define your desired colors
  return colors[Math.floor(Math.random() * colors.length)];
}

export default WhackAMoleCard;
