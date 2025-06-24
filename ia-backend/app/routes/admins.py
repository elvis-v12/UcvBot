from flask import Blueprint, jsonify, request

adminRoutes = Blueprint('admins',__name__)

@adminRoutes.route('/',methods=['GET'])
def findById(id):
    data=request.json
    return jsonify(data)

@adminRoutes.route('/',methods=['POST'])
def create():
    data=request.json
    return jsonify(data)

@adminRoutes.route('/',methods=['PUT'])
def update(id):
    data=request.json
    return jsonify(data)

@adminRoutes.route('/',methods=['POST'])
def delete(id):
    data=request.json
    return jsonify(data)