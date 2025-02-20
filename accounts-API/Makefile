test-watch: 
	docker compose run --rm api npm run test:watch

test: 
	docker compose run --rm api npm run test

start: 
	docker compose build && docker compose up

clean:
	docker compose down --rmi local --volumes --remove-orphans