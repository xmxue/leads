from sqlmodel import Session, create_engine
from db import Lead
from faker import Faker

# Setup
fake = Faker()
engine = create_engine("postgresql://postgres:password@localhost:5432/postgres")  # Replace with your DB URL

def create_random_leads(num: int = 100):
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

if __name__ == "__main__":
    create_random_leads()
