from transformers import pipeline
import sys
import json

classifier = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None)

def classify_text(text):
    sentences = [text]
    model_outputs = classifier(sentences)
    return model_outputs

if __name__ == "__main__":
    text = sys.argv[1]
    result = classify_text(text)
    print(json.dumps(result, ensure_ascii=False))