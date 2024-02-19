from flask import Flask, request, jsonify
import cv2
import numpy as np
from sudoku_recognition.sudoku_recognition import SudokuRecognition

app = Flask(__name__)

@app.route('/inference', methods=['POST'])
def inference():
    im = request.files['image'].read()
    im = np.frombuffer(im, dtype=np.uint8)
    im = cv2.imdecode(im, cv2.IMREAD_COLOR)
    inference = SudokuRecognition.recognize(im)

    if (inference == None):
        response = jsonify({
            "message": "Puzzle cannot be identified."
        })
        return response, 400

    response = jsonify({
        "data": inference
    })

    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3030, debug=True)