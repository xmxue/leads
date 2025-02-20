include .env
export $(shell sed 's/=.*//' .env)

run-server:
	@fastapi dev api/index.py --port 8080

db-start:
	@docker compose up -d

db-stop:
	@docker compose down

db-seed:
	@read -p "Enter number of leads to seed: " num; \
	python scripts/seed.py $$num

db-reset:
	@docker compose rm -f -s -v db
	@docker volume rm leads_pg_data
	@docker compose up -d db

openapi-json:
	@python scripts/openapi.py