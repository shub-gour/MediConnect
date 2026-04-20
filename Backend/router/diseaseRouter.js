import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/predict-disease", async (req, res) => {

  try {

    const response = await axios.post(

      "https://disease-prediction-api-r084.onrender.com/predict-disease",

      req.body

    );

    res.status(200).json(response.data);

  }

  catch (error) {

    console.log(error.message);

    res.status(500).json({

      success: false,
      message: "Disease prediction failed"

    });

  }

});

export default router;