from flask import Blueprint, jsonify, request

levelRoutes = Blueprint('level',__name__)

@levelRoutes.route('/',methods=['GET'])
def findById(id):
    data=request.json
    return jsonify(data)

@levelRoutes.route('/',methods=['POST'])
def create():
    data=request.json
    return jsonify(data)

@levelRoutes.route('/',methods=['PUT'])
def update(id):
    data=request.json
    return jsonify(data)

@levelRoutes.route('/',methods=['POST'])
def delete(id):
    data=request.json
    return jsonify(data)