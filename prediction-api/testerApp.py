from flask import Flask, request, jsonify
from testerControllers import tester_receive_message, tester_send_message

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello, World!'})


@app.route('/process', methods=['POST'])
def process():
    return tester_receive_message()

@app.route('/return', methods=['POST'])
def return_message():
    return tester_send_message()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000) #6000 doesn't work