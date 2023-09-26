#!/bin/bash

session_secret=$(openssl rand -base64 32)

# Load environment variables from .env file
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found. Make sure you have created an .env file with the necessary environment variables."
  exit 1
fi

# Create the database
mysql -u$DB_USER -p$DB_PASS -e "CREATE DATABASE $DB_NAME"

# Create the tables
mysql -u$DB_USER -p$DB_PASS $DB_NAME < database.sql

echo "SESSION_SECRET=$session_secret" >> .env

# Start the application
npm start
