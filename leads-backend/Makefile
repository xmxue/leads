include .env
export $(shell sed 's/=.*//' .env)

start-stack:
	@docker compose up -d

stop-stack:
	@docker compose down

start-server:
	@fastapi dev app/main.py --port 8080

db-seed:
	@python app/db_seed.py

db-nuke:
	@docker compose rm -f -s -v db
	@docker volume rm leads-backend_pg_data
	@docker compose up -d db