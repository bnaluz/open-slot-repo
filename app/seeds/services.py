from app.models import db, environment, Service, SCHEMA
from sqlalchemy import text

def seed_services():
    service_one_a = Service(name='Personal Training', description='One-on-one fitness training', duration=60, business_id=1)
    service_one_b = Service(name='Group Fitness Class', description='A fun, energetic group workout session', duration=45, business_id=1)

    service_two_a = Service(name='Individual Therapy Session', description='One-hour individual therapy', duration=60, business_id=2)
    service_two_b = Service(name='Group Therapy Session', description='A supportive group therapy session', duration=90, business_id=2)


    service_three_a = Service(name='Haircut', description='Classic haircut', duration=30, business_id=3)
    service_three_b = Service(name='Beard Trim', description='Professional beard trim and shaping', duration=20, business_id=3)

    service_four_a = Service(name='Gourmet Tasting Menu', description='A multi-course tasting menu', duration=120, business_id=4)
    service_four_b = Service(name='Wine Pairing Dinner', description='Dinner with wine pairings for each course', duration=90, business_id=4)

    db.session.add_all([
        service_one_a, service_one_b,
        service_two_a, service_two_b,
        service_three_a, service_three_b,
        service_four_a, service_four_b
    ])
    db.session.commit()

def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()
