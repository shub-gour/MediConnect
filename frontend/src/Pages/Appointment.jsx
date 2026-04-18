import React, { useContext } from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Appointment = () => {

  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Hero
        title={"Book an Appointment with MediConnect"}
        imageUrl={"/signin.png"}
      />

      <AppointmentForm />

    </>
  );
};

export default Appointment;