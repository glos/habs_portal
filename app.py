#!/usr/bin/env python
'''
app.py

HABS Data Portal Application
'''

from flask import Flask
from flask_environments import Environments

import os

app = Flask(__name__)

env = Environments(app, default_env='COMMON')
env.from_yaml('config.yml')

if app.config['LOGGING'] == True:
    import logging
    logger = logging.getLogger('habs_portal.app')
    logger.setLevel(logging.DEBUG)

    log_directory = app.config['LOG_FILE_PTAH']
    log_filename = os.path.join(log_directory,app.config['LOG_FILE'])
    if not os.path.exists(os.path.dirname(log_filename)):
        os.makedirs(os.path.dirname(log_filename))
    file_handler = logging.FileHandler(log_filename, mode='a+')

    stream_handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(process)d - %(name)s - %(module)s:%(lineno)d - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    stream_handler.setFormatter(formatter)
    app.logger.addHandler(file_handler)
    #app.logger.addHandler(stream_handler)
    app.logger.setLevel(logging.DEBUG)
    app.logger.info('Application Process Started')


# Blueprints
from habs_portal import habs_portal
app.register_blueprint(habs_portal, url_prefix='')

if __name__ == '__main__':
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=app.config['DEBUG'])
