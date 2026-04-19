import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/predict-schizophrenia", async (req, res) => {

  try {

    const response = await axios.post(

      "https://schizophrenia-api.onrender.com/predict",

      req.body

    );

    res.status(200).json(response.data);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "ML prediction failed",
      error: error.message
    });

  }

});

export default router;