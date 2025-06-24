from flask import Blueprint, jsonify, request

studentRoutes = Blueprint('students',__name__)

@studentRoutes.route('/',methods=['GET'])
def findById(id):
    data=request.json
    return jsonify(data)

@studentRoutes.route('/',methods=['POST'])
def create():
    data=request.json
    return jsonify(data)

@studentRoutes.route('/',methods=['PUT'])
def update(id):
    data=request.json
    return jsonify(data)

@studentRoutes.route('/',methods=['POST'])
def delete(id):
    data=request.json
    return jsonify(data)