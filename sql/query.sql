-- name: ListLeads :many
SELECT first_name, last_name FROM lead where stage = $1 AND created_at > $2 ORDER BY created_at DESC;