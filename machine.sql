CREATE TABLE machine (
	machine_id SERIAL PRIMARY KEY,
	building_id INT,
	FOREIGN KEY (building_id) REFERENCES building(id),
	type CHAR CHECK(type IN('S','D')),
	name VARCHAR(100) NOT NULL,
	num_ratings INT DEFAULT 0,
	accepts_card CHAR CHECK(accepts_card IN('Y','N')),
	accepts_cash CHAR CHECK(accepts_cash IN('Y','N')),
	accepts_wireless CHAR CHECK(accepts_wireless IN('Y','N')),
	rating_ids INT[],
	average_product_rating FLOAT DEFAULT 0.0,
	average_function_rating FLOAT DEFAULT 0.0,
	needs_service CHAR CHECK(needs_service IN('Y','N')),
	image_url VARCHAR(250)
);