from app.models import db, environment, Business, SCHEMA
from sqlalchemy.sql import text


def seed_businesses():
    business_one = Business(owner_id=1, name='One for All Fitness', description='Fitness Center', address='123 Gains St', city='Muscleville', state='CA', image_url='https://www.staywithstylescottsdale.com/wp-content/uploads/2024/03/Featured-Image-Scottsdale-Gyms.jpg')
    business_two = Business(owner_id=1, name='MindCare Therapy', description='Online Therapy and Counseling',address='400 Wellness Way' ,city='Peaceahven', state='NY' , image_url='https://therapybrands.com/wp-content/uploads/2022/05/Office-Decor.jpg')
    business_three = Business(owner_id=2, name='SharpEdge Barbers', description='Grooming Services', address='101 Styled Blvd', city='Trimtown', state='IL' , image_url='https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-some-pictures-of-an-antique-barber-shop-image_2906288.jpg')
    business_four = Business(owner_id=3, name='Savory Bites Bistro', description='Fine Dining', address='200 Gourmet Ave', city='Foodieville', state='TX', image_url='https://www.finedininglovers.com/sites/g/files/xknfdk626/files/styles/open_graph_image/public/Original_15496_Eleven-Madison-Park-TP.jpg?itok=TNc_Ayhx')

    db.session.add(business_one)
    db.session.add(business_two)
    db.session.add(business_three)
    db.session.add(business_four)
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))
        
    db.session.commit()
