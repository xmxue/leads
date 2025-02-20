-- name: ListLeads :many
SELECT first_name, last_name FROM lead where stage = $1 AND created_at > @created_at_start AND created_at < @created_at_end AND first_name LIKE @first_name AND last_name LIKE @last_name;

-- name: InsertLead :one
INSERT INTO lead (first_name, last_name, email, phone, stage) VALUES ($1, $2, $3, $4, $5) RETURNING *;