#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Wait for the database to be ready
# The `db` hostname is the name of the service in docker-compose.yml
echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready."

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy
echo "Migrations complete."

# Execute the main container command (passed as arguments to this script)
exec "$@"
