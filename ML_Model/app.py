from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

# Load trained files
model = pickle.load(open("schizophrenia_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))
model_columns = pickle.load(open("model_columns.pkl", "rb"))

@app.route("/")
def home():
    return "Schizophrenia Prediction API Running"

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        # convert input to dataframe
        input_df = pd.DataFrame([data])

        # convert categorical variables into dummy variables
        input_df = pd.get_dummies(input_df)

        # add missing columns from training
        input_df = input_df.reindex(columns=model_columns, fill_value=0)

        # scale input data
        input_scaled = scaler.transform(input_df)

        # make prediction
        prediction = model.predict(input_scaled)

        # convert result to normal number
        result = float(prediction[0])

        return jsonify({
            "success": True,
            "prediction": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(host="0.0.0.0", port=port)