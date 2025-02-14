SHELL=/bin/bash

start-stack:
	@docker-compose up -d

stop-stack:
	@docker-compose down

start-server:
	@fastapi dev app/main.py --port 8080

db-seed:
	@python app/db_seed.py