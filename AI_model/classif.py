from flask import Flask, request, jsonify
from transformers import pipeline

classif = Flask(__name__)

classifier = pipeline(
    task="text-classification",
    model="SamLowe/roberta-base-go_emotions",
    tokenizer="SamLowe/roberta-base-go_emotions",
    top_k=None,
    max_length=256,
    truncation=True
)

@classif.route('/classify', methods=['POST'])
def classify_text():
    data = request.json
    text = data['text']
    model_outputs = classifier([text])
    return jsonify(model_outputs)

if __name__ == "__main__":
    classif.run(host="0.0.0.0", port=8081)
