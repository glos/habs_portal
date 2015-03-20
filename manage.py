#!/usr/bin/env python
'''
manage.py

'''

from flask.ext.script import Manager
from app import app
from habs_scripts.harvest_datasets import harvest as scripts_harvest

manager = Manager(app)

@manager.command
def harvest(json_file):
    '''
    Harvests the datasets from a TDS instance defined in the configuration.
    Example:
        python manage.py harvest static/json/dataset.json
    '''
    scripts_harvest(json_file)

if __name__ == '__main__':
    manager.run()
