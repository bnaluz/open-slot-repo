from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db,Business

business_routes = Blueprint('businesses', __name__)

@business_routes.route('/all', methods=["GET"])
# @login_required
def businesses():
    """Query for every business and return them in a list of dictionaries"""
    businesses = Business.query.all()
    return jsonify([business.to_dict() for business in businesses]), 200

@business_routes.route('/create', methods=["POST"])
@login_required
def create():
    data = request.get_json()
    
    name = data.get('name')
    description = data.get('description')
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    image_url = data.get('image_url')

    new_business = Business(
        owner_id=current_user.id,
        name=name,
        description= description,
        address = address,
        city=city,
        state=state,
        image_url=image_url 
    )
    db.session.add(new_business)
    db.session.commit()

    return jsonify(new_business.to_dict()), 201

@business_routes.route('/<int:id>')
@login_required
def business(id):
    """Query for a business by id and return that business in a dictionary"""
    business = Business.query.get(id)
    if not business:
        return jsonify({'message': "Business couldn't be found"}), 404
    return business.to_dict()

@business_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_business(id):
    """Edit a business if you are the owner"""
    #* Find the business
    business = Business.query.get(id)

    #*check if business exists and if the owner Id matches current user
    if not business:
        return jsonify({'message': "Business couldn't be found"}), 404
    
    # if business.owner_id != current_user.id:
    #     return jsonify({'message':'Forbidden'}), 403
    
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    image_url = data.get('image_url')

    business.name = name
    business.description = description
    business.address = address
    business.city = city 
    business.state = state
    business.image_url = image_url

    db.session.commit()

    return jsonify(business.to_dict()), 200


@business_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_business(id):
    """Delete a business if you are the owner"""
    business = Business.query.get(id)

    #*check if business exists and if the owner Id matches current user
    if not business:
        return jsonify({'message': "Business couldn't be found"}), 404

    if business.owner_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403
    
    db.session.delete(business)
    db.session.commit()

    return jsonify({'message': "Business successfully deleted"}), 200
