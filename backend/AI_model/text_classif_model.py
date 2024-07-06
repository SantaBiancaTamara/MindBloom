from transformers import pipeline, RobertaTokenizer
import sys
import json


tokenizer = RobertaTokenizer.from_pretrained("SamLowe/roberta-base-go_emotions", model_max_length=256)

classifier = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", tokenizer=tokenizer, top_k=None)

def classify_text(text):
    sentences = [text]
    model_outputs = classifier(sentences)
    return model_outputs

if __name__ == "__main__":
    text = sys.argv[1]
    result = classify_text(text)
    print(json.dumps(result, ensure_ascii=False))

