
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE t_table ADD COLUMN t_comp BOOLEAN;

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE t_table DROP COLUMN t_comp;
