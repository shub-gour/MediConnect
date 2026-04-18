import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="who we are" />
        </div>

        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>

          <p>
            MediConnect is a modern healthcare management platform designed to
            simplify the process of connecting patients with qualified doctors.
            Our goal is to provide a seamless digital experience where users can
            easily book appointments, explore medical departments, and manage
            healthcare services efficiently.
          </p>

          <p>
            The platform is built using the MERN stack (MongoDB, Express.js,
            React.js, and Node.js), ensuring high performance, scalability, and
            security. MediConnect helps hospitals and clinics streamline their
            workflow by providing a centralized system for appointment
            scheduling, doctor management, and patient communication.
          </p>

          <p>
            We aim to improve accessibility to healthcare services by enabling
            users to interact with medical professionals anytime and from
            anywhere. MediConnect focuses on delivering a user-friendly
            interface, reliable backend services, and secure data handling.
          </p>

          <p>
            Our mission is to enhance digital healthcare experiences by
            leveraging modern web technologies and providing efficient medical
            resource management solutions.
          </p>

          <p>MediConnect – Smart Healthcare Made Simple.</p>

        </div>
      </div>
    </>
  );
};

export default Biography;