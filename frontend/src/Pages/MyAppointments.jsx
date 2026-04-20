import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

const MyAppointments = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const res = await axios.get(

          "https://mediconnect-backend-sfkf.onrender.com/api/v1/appointment/my",

          { withCredentials: true }

        );

        setAppointments(res.data.appointments);

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchAppointments();

  }, []);

  return (

    <>
      <Hero
        title={"My Appointments"}
        imageUrl={"/signin.png"}
      />

      <div className="container">

        <table>

          <thead>

            <tr>

              <th>Doctor</th>

              <th>Date</th>

              <th>Department</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {

              appointments.length > 0 ?

              appointments.map((item) => (

                <tr key={item._id}>

                  <td>

                    {item.doctor.firstName} {item.doctor.lastName}

                  </td>

                  <td>

                    {item.appointment_date.substring(0,10)}

                  </td>

                  <td>

                    {item.department}

                  </td>

                  <td>

                    {item.status}

                  </td>

                </tr>

              ))

              :

              <tr>

                <td colSpan="4">

                  No appointments found

                </td>

              </tr>

            }

          </tbody>

        </table>

      </div>

    </>
  );

};

export default MyAppointments;