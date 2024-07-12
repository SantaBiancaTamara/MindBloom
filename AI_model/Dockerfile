FROM python:3.10

WORKDIR /app

RUN pip install --upgrade pip

COPY requirements.txt /app

RUN pip install -r requirements.txt

RUN python -c "from transformers import AutoModel; AutoModel.from_pretrained('SamLowe/roberta-base-go_emotions')"

COPY . /app

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:80", "classif:classif"]


