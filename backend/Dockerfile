FROM anibali/pytorch:2.0.1-cuda11.8-ubuntu22.04

RUN sudo apt-get update \
 && sudo apt-get install -y libgl1-mesa-glx libgtk2.0-0 libsm6 libxext6 \
 && sudo rm -rf /var/lib/apt/lists/*

WORKDIR /home/app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 3030
CMD ["python", "./app.py"]