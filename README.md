# Map

This is a small test around Google's FusionTables and Maps. The goal is to
allow users to click a point in the map and have it persisted in both
Google's FusionTables and in an internal API using AngularJS 4. The internal
API was created using Django REST Framework.

## Installation

Before proceeding, make sure you have NodeJS installed and Yarn, a node package
manager. Then execute the commands below, in order:

    git clone https://github.com/chromano/map-fusiontable.git
    cd map-fusiontable
    python3.6 -m venv env
    source env/bin/activate
    pip install -r api/requirements.txt
    (cd ui && yarn)

## Running

In order to run the project, you will use the `honcho` tool (already installed
from `requirements.txt`):

    honcho start

The project now can be accessed at http://localhost:5100