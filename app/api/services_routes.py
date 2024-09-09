from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Service

service_routes = Blueprint('services', __name__)


@service_routes.route('/<int:id>', methods=['GET'])
def get_service(id):
    """GET A SERVICE BY ID"""
    service = Service.query.get(id)
    if not service:
        return jsonify({'message': 'Service not found.'}),404
    return jsonify(service.to_dict()),200


@service_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_service(id):
    service = Service.query.get(id)
    if not service:
        return jsonify({'message':'Service not found.'})
    
    business = service.business

    if business.owner_id != current_user.id:
        return jsonify({'message':'Forbidden'}), 403

    data = request.get_json()
    service.name = data.get('name')
    service.description = data.get('description')
    service.duration = data.get('duration')

    db.session.commit()
    return jsonify(service.to_dict()), 200

@service_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_service(id):
    service = Service.query.get(id)
    if not service:
        return jsonify({'message': 'Service not found.'})
    
    business = service.business

    if business.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    db.session.delete(service)
    db.session.commit()

    return jsonify({'message': 'Service successfully deleted'}), 200
