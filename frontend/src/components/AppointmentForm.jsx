import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {

  const [appointmentType, setAppointmentType] = useState("self");
  const [userData, setUserData] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  // fetch doctors
  useEffect(() => {

    const fetchDoctors = async () => {

      try {

        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );

        setDoctors(data.doctors);

      } catch (error) {

        setDoctors([]);

      }

    };

    fetchDoctors();

  }, []);

  // fetch logged-in user details
  useEffect(() => {

    const fetchUser = async () => {

      try {

        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );

        setUserData(data.user);

        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setEmail(data.user.email);
        setPhone(data.user.phone);
        setNic(data.user.nic);
        setDob(data.user.dob?.substring(0,10));
        setGender(data.user.gender);

      } catch (error) {

        console.log("User not logged in");

      }

    };

    fetchUser();

  }, []);

  const handleAppointment = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(

        "http://localhost:4000/api/v1/appointment/post",

        {

          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: Boolean(hasVisited),
          address,

        },

        {

          withCredentials: true,
          headers: { "Content-Type": "application/json" },

        }

      );

      toast.success(data.message);

      if(appointmentType === "other"){

        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setNic("");
        setDob("");
        setGender("");

      }

      setAppointmentDate("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setAddress("");
      setHasVisited(false);

    } catch (error) {

      toast.error(error.response?.data?.message || "Error booking appointment");

    }

  };

  return (

    <div className="container form-component appointment-form">

      <h2>Book an Appointment</h2>

      {/* appointment type */}

      <div style={{ marginBottom: "20px" }}>

        <p>Appointment for:</p>

        <label>

          <input
            type="radio"
            value="self"
            checked={appointmentType === "self"}
            onChange={() => {

              setAppointmentType("self");

              if(userData){

                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setPhone(userData.phone);
                setNic(userData.nic);
                setDob(userData.dob?.substring(0,10));
                setGender(userData.gender);

              }

            }}
          />

          Myself

        </label>

        <label style={{ marginLeft: "20px" }}>

          <input
            type="radio"
            value="other"
            checked={appointmentType === "other"}
            onChange={() => {

              setAppointmentType("other");

              setFirstName("");
              setLastName("");
              setEmail("");
              setPhone("");
              setNic("");
              setDob("");
              setGender("");

            }}
          />

          Someone else

        </label>

      </div>

      <form onSubmit={handleAppointment}>

        <div>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            disabled={appointmentType === "self"}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            disabled={appointmentType === "self"}
            onChange={(e) => setLastName(e.target.value)}
          />

        </div>

        <div>

          <input
            type="text"
            placeholder="Email"
            value={email}
            disabled={appointmentType === "self"}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            disabled={appointmentType === "self"}
            onChange={(e) => setPhone(e.target.value)}
          />

        </div>

        <div>

          <input
            type="number"
            placeholder="Government ID"
            value={nic}
            disabled={appointmentType === "self"}
            onChange={(e) => setNic(e.target.value)}
          />

          <input
            type="date"
            placeholder="Date Of Birth"
            value={dob}
            disabled={appointmentType === "self"}
            onChange={(e) => setDob(e.target.value)}
          />

        </div>

        <div>

          <select
            value={gender}
            disabled={appointmentType === "self"}
            onChange={(e) => setGender(e.target.value)}
          >

            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>

          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />

        </div>

        <div>

          <select
            value={department}
            onChange={(e) => {

              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");

            }}
          >
            <option value="">Select Department</option>

            {

              departmentsArray.map((depart, index) => (

                <option key={index} value={depart}>

                  {depart}

                </option>

              ))

            }

          </select>

          <select

            value={JSON.stringify({
              firstName: doctorFirstName,
              lastName: doctorLastName,
            })}

            onChange={(e) => {

              const { firstName, lastName } = JSON.parse(e.target.value);

              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);

            }}

          >

            <option value="">Select Doctor</option>

            {

              doctors
                .filter(
                  (doctor) =>
                    doctor.doctorDepartment === department
                )
                .map((doctor, index) => (

                  <option
                    key={index}
                    value={JSON.stringify({
                      firstName: doctor.firstName,
                      lastName: doctor.lastName,
                    })}
                  >

                    {doctor.firstName} {doctor.lastName}

                  </option>

                ))

            }

          </select>

        </div>

        <textarea

          rows="6"
          value={address}
          placeholder="Enter full address"
          onChange={(e) => setAddress(e.target.value)}

        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >

          <p>Visited before?</p>

          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
          />

        </div>

        <button style={{ margin: "0 auto" }}>

          Book Appointment

        </button>

      </form>

    </div>

  );

};

export default AppointmentForm;