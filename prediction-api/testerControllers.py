
from flask import request, jsonify
import requests


def tester_receive_message():
  """
  POST Function that will receive the message from the Express Server `[POST] express/message` and then 
  Sends that message to `[POST] express/notify`.
  """
  data = request.get_json()
  message = data.get('message', '')

  if not message:
      return jsonify({'response': 'No message received'}), 400
  response_message = tester_send_message(message)
  return jsonify({'response': response_message.get_json()})


def tester_send_message(ze_message):
  """
  HELPER function that sends a message to a specified route or api 
  """
  json_message = {'message': ze_message}
  try:
    express_message = requests.post('http://localhost:8080/notify', json=json_message)
    express_message_data = express_message.json()
  except requests.exceptions.RequestException as e:
    return jsonify({"Error_Message":f"There was an error {e}"})
  return jsonify({'response': json_message, 'express_response': express_message_data})

def tester_receive_image():
  file=request.form["file"]
  if file:
      print(file)