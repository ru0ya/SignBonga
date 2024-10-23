#!/usr/bin/env bash
# exit on error
set -o errexit

pip3 install -r requirements.txt

# convert static asset files
python3 manage.py collectstatic --no-input

# Apply any outstanding database migrations
python3 manage.py migrate
