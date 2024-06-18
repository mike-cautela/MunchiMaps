CREATE TABLE review (
	review_id SERIAL PRIMARY KEY,
	machine_id INT,
	FOREIGN KEY (machine_id) REFERENCES machine(machine_id),
	product_rating INT DEFAULT 0,
	functionality_rating INT DEFAULT 0,
	needs_service CHAR CHECK(needs_service IN('Y','N'))
);