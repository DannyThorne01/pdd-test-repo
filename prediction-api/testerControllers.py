
from flask import request, jsonify
# import requests

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