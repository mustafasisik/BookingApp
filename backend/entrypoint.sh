#!/bin/sh

PG_HOST="localhost"
PG_PORT="5432"

MAX_RETRIES=30
RETRY_INTERVAL=1

i=0
while [ $i -lt $MAX_RETRIES ]; do
    if nc -z -v -w 1 $PG_HOST $PG_PORT 2>/dev/null; then
        echo "PostgreSQL is ready to accept connections"
        exit 0
    else
        i=$((i+1))
        sleep $RETRY_INTERVAL
    fi
done

mkdir -p /usr/src/solutionshub/logs
chmod -R 777 /usr/src/solutionshub/logs
touch /usr/src/solutionshub/logs/django.log
chmod -R 777 /usr/src/solutionshub/logs/django.log

# Apply migrations
python manage.py makemigrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput
# create admin for testing database
python manage.py create_admin
python manage.py create_sample_data
exec "$@"
