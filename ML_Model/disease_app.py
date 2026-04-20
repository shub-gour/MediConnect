from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open("disease_prediction_model.pkl","rb"))

all_symptoms = pickle.load(open("symptoms_list.pkl","rb"))

@app.route("/predict-disease", methods=["POST"])
def predict_disease():

    try:

        data = request.json

        symptoms = data.get("symptoms", [])

        # create input vector
        input_vector = [0] * len(all_symptoms)

        for symptom in symptoms:

            if symptom in all_symptoms:

                index = all_symptoms.index(symptom)

                input_vector[index] = 1

        prediction = model.predict([input_vector])

        return jsonify({

            "success": True,

            "predicted_disease": prediction[0]

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        })

if __name__ == "__main__":

    import os

    port = int(os.environ.get("PORT", 5000))

    app.run(host="0.0.0.0", port=port)