# Map

This is a small test around Google's FusionTables and Maps. The goal is to
allow users to click a point in the map and have it persisted in both
Google's FusionTables and in an internal API using AngularJS 4. The internal
API was created using Django REST Framework.

## Installation

Before proceeding, make sure you have NodeJS installed and Yarn, a node package
manager. Also make sure your default Python instance is Python 3. Then execute
the commands below, in order:

    git clone https://github.com/chromano/map-fusiontable.git
    cd map-fusiontable
    python -m venv env
    source env/bin/activate
    pip install -r api/requirements.txt
    (cd api && ./manage.py migrate)
    (cd ui && yarn)

## Running

In order to run the project, you will use the `honcho` tool (already installed
from `requirements.txt`):

    honcho start

The project now can be accessed at http://localhost:5100

## Accessing

In order to access your fusion tables, you will have to give consent to this
application to your google account. When you open the URL above, you will be
asked to click a button for giving access, this will open a new window, so
please sure you have the "popup" unblocked.

Also, make sure you have a fusion table called `SAMPLETEST` on your Google
drive account. This table is supposed to have three columns: Text (STRING),
Location (LOCATION) and Date (STRING).