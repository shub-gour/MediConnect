import React, { useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

const symptomsList = [
  "itching",
  "skin_rash",
  "continuous_sneezing",
  "shivering",
  "chills",
  "joint_pain",
  "stomach_pain",
  "acidity",
  "vomiting",
  "fatigue",
  "weight_loss",
  "restlessness",
  "lethargy",
  "cough",
  "high_fever",
  "headache",
  "nausea",
  "loss_of_appetite",
  "chest_pain",
  "dizziness"
];

const DiseasePredict = () => {

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const [result, setResult] = useState("");

  const handleCheckbox = (symptom) => {

    if (selectedSymptoms.includes(symptom)) {

      setSelectedSymptoms(

        selectedSymptoms.filter(s => s !== symptom)

      );

    }

    else {

      setSelectedSymptoms(

        [...selectedSymptoms, symptom]

      );

    }

  };

  const predictDisease = async () => {

    try {

      const response = await axios.post(

        "https://mediconnect-backend-sfkf.onrender.com/api/v1/disease/predict-disease",

        {

          symptoms: selectedSymptoms

        }

      );

      setResult(response.data.predicted_disease);

    }

    catch (error) {

      console.log(error);

      alert("Prediction failed");

    }

  };

  return (

    <>
      <Hero

        title={"AI Disease Prediction"}

        imageUrl={"/signin.png"}

      />

      <div className="container">

        <h2 className="section-title">
          Select Symptoms
        </h2>

        <div className="symptoms-grid">

        {
          symptomsList.map((symptom) => (

          <label
            key={symptom}
            className={`symptom-card ${
            selectedSymptoms.includes(symptom)
              ? "selected"
              : ""
            }`}
            >

            <input
              type="checkbox"
              value={symptom}
              onChange={() => handleCheckbox(symptom)}
            />

            <span>
              {symptom.replaceAll("_"," ")}
            </span>

          </label>

      ))
    }

  </div>

  <button
    className="predict-btn"
    onClick={predictDisease}
  >

    Predict Disease

  </button>

  {
    result && (

      <div className="prediction-result">

        <h3>

          Predicted Disease:

          <span className="result-highlight">

            {" "}{result}

          </span>

        </h3>

      </div>

    )
  }

</div>

    </>

  );

};

export default DiseasePredict;