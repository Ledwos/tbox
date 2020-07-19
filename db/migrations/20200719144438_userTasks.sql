
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE u_table (
    u_id serial PRIMARY KEY,
    u_name VARCHAR (50) UNIQUE NOT NULL,
    u_pass VARCHAR (50) NOT NULL,
    u_email CITEXT UNIQUE NOT NULL
);

CREATE TABLE t_table (
    t_id serial PRIMARY KEY,
    t_name VARCHAR (50) NOT NULL,
    t_desc VARCHAR (200),
    t_user INTEGER REFERENCES u_table(u_id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE u_table;
DROP TABLE t_table;
