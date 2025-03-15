from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import ehr_py  # Importing functions from ehr_py.py

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React frontend

# In-memory user database (for demonstration purposes)
users_db = {'testuser': 'testpass'}

# Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if users_db.get(username) == password:
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

# Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users_db:
        return jsonify({'success': False, 'message': 'User already exists'}), 400
    
    users_db[username] = password
    return jsonify({'success': True}), 201

# File Upload and Matrix Generation API
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file uploaded'}), 400
    
    file = request.files['file']
    
    # Save the uploaded file to a directory
    upload_folder = 'uploads'
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    
    filepath = os.path.join(upload_folder, file.filename)
    file.save(filepath)

    # Process the CSV file using ehr_py module
    try:
        matrix, graph_urls = ehr_py.process_csv(filepath)
        return jsonify({'success': True, 'matrix': matrix, 'graph_urls': graph_urls}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
   app.run(debug=True)
