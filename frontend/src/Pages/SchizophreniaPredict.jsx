import React, { useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

const SchizophreniaPredict = () => {

  const [formData, setFormData] = useState({
    depression: "",
    anxiety: "",
    bipolar: "",
    eating: "",
    country: "India"
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "https://mediconnect-backend-sfkf.onrender.com/api/v1/ml/predict-schizophrenia",

        {

          "Depressive disorders (share of population) - Sex: Both - Age: Age-standardized":
            Number(formData.depression),

          "Anxiety disorders (share of population) - Sex: Both - Age: Age-standardized":
            Number(formData.anxiety),

          "Bipolar disorders (share of population) - Sex: Both - Age: Age-standardized":
            Number(formData.bipolar),

          "Eating disorders (share of population) - Sex: Both - Age: Age-standardized":
            Number(formData.eating),

          [`Entity_${formData.country}`]: 1,

          [`Code_${formData.country.slice(0,3).toUpperCase()}`]: 1

        }

      );

      setResult(response.data.prediction);

    } catch (error) {

      console.log(error);

      alert("Prediction failed");

    }

  };

  return (

    <>
      <Hero
        title={"AI Mental Health Risk Predictor"}
        imageUrl={"/signin.png"}
      />

      <div className="container form-component">

        <h2>Schizophrenia Risk Prediction</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="number"
            step="0.1"
            name="depression"
            placeholder="Depression disorder rate (%)"
            value={formData.depression}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="anxiety"
            placeholder="Anxiety disorder rate (%)"
            value={formData.anxiety}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="bipolar"
            placeholder="Bipolar disorder rate (%)"
            value={formData.bipolar}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="eating"
            placeholder="Eating disorder rate (%)"
            value={formData.eating}
            onChange={handleChange}
            required
          />

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >

            <option value="India">India</option>

            <option value="United States">United States</option>

            <option value="United Kingdom">United Kingdom</option>

            <option value="Canada">Canada</option>

            <option value="Australia">Australia</option>

          </select>

          <button type="submit">

            Predict Risk

          </button>

        </form>

        {result !== null && (

          <div className="prediction-result">

            <h3>

              Predicted Schizophrenia Prevalence:

              <span> {result.toFixed(4)}</span>

            </h3>

          </div>

        )}

      </div>

    </>

  );

};

export default SchizophreniaPredict;