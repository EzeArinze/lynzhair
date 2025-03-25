import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ConfettiEffect() {
  const [confettiActive, setConfettiActive] = useState(true);

  // Disable confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {" "}
      {/* Confetti Effect */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  top: "-10%",
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  backgroundColor: [
                    "#FF5E8A", // Pink
                    "#FF85A1", // Light pink
                    "#FFC0D3", // Very light pink
                    "#FFD700", // Gold
                    "#87CEEB", // Sky blue
                  ][Math.floor(Math.random() * 5)],
                  borderRadius: "50%",
                }}
                animate={{
                  top: "100%",
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfettiEffect;
