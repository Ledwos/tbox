
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE p_table (
    p_id serial PRIMARY KEY,
    p_img TEXT NOT NULL,
    p_user INTEGER REFERENCES u_table(u_id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE p_table;
