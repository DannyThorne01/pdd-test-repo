
from flask import request, jsonify
import requests

def tester_receive_message():
  data = request.get_json()
  message = data.get('message', '')

  # Log the incoming message
  print(f'Received message: {message}')

  if not message:
      return jsonify({'response': 'No message received'}), 400

  # Process the message (e.g., call your ML model here)
  response_message = f'Message processed: {message}'

  return jsonify({'response': response_message})

def tester_send_message():
  json_message = {'message': 'Message sent from backend to front'}
  try:
    express_message = requests.post('http://localhost:8080/notify', json=json_message)
    # express_message.raise_for_status()
    express_message_data =express_message.json()
  except requests.exceptions.RequestException as e:
    return jsonify({"Error_Message":f"There was an error {e}"})
  return jsonify({'response': json_message, 'express_response': express_message_data})
