CREATE TABLE building (
	id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	x_coord DECIMAL NOT NULL,
	y_coord DECIMAL NOT NULL,
	time_opens FLOAT NOT NULL,
	time_closes FLOAT NOT NULL,
	num_snack_machines INT NOT NULL,
	num_drink_machines INT NOT NULL, 
	machine_ids INT[]
);