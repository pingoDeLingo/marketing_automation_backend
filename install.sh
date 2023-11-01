#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found. Make sure you have created an .env file with the necessary environment variables."
  exit 1
fi

# Generate a session secret
session_secret=$(openssl rand -base64 32)

# Replace or add the SESSION_SECRET in the .env file
if grep -q "^SESSION_SECRET=" .env; then
  # Replace the existing value
  sed -i "s|^SESSION_SECRET=.*$|SESSION_SECRET=$session_secret|" .env
else
  # Add a new line
  echo "SESSION_SECRET=$session_secret" >> .env
fi

# Check if the database exists
if mysql -u$DB_USER -p$DB_PASS -e "use $DB_NAME"; then
  echo "Database '$DB_NAME' already exists. Skipping creation."
else
  # Create the database
  mysql -u$DB_USER -p$DB_PASS -e "CREATE DATABASE $DB_NAME"
  echo "Database '$DB_NAME' created successfully."
fi

# Create the tables
mysql -u$DB_USER -p$DB_PASS $DB_NAME < data/database.sql

# Start the application
#npm start
