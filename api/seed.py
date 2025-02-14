import argparse
from sqlmodel import Session, create_engine
from models import Lead
from utils import create_db_and_tables
from faker import Faker

parser = argparse.ArgumentParser(description="Example script")
parser.add_argument("num", type=int, default=15, help="Number of leads to seed")
args = parser.parse_args()

fake = Faker()

engine = create_engine("postgresql://postgres:password@localhost:5432/postgres")  # Replace with your DB URL
create_db_and_tables()

def create_random_leads(num: int):
    with Session(engine) as session:
        # Generate and add 'num' random leads to the database
        for _ in range(num):
            lead = Lead(
                name=fake.name(),
                email=fake.email(),
                company=fake.company(),
                stage=fake.random_int(min=0, max=3),  # Random stage between 1 and 5
                engaged=fake.boolean(),
                last_contacted=fake.date_this_year(),  # Random date this year
                created_at=fake.date_time_this_year(),  # Random date time this year
                updated_at=fake.date_time_this_year()
            )
            session.add(lead)
        session.commit()  # Commit all the added leads

    print(f"Successfully seeded {num} leads!")


create_random_leads(args.num)
