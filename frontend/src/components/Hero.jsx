import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">

        <div className="banner">
          <h1>{title}</h1>

          <p>
            MediConnect is a modern healthcare platform designed to simplify the
            process of connecting patients with trusted doctors. Our system enables
            users to easily book appointments, explore medical departments, and
            manage healthcare services through a secure and user-friendly interface.
            We aim to improve accessibility to quality healthcare by providing a
            reliable digital solution that supports both patients and medical
            professionals.
          </p>

        </div>

        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>

      </div>
    </>
  );
};

export default Hero;