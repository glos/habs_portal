#!/usr/bin/env python
'''
habs_portal

Blueprint definition for the habs portal
'''

from flask import Blueprint

habs_portal = Blueprint('habs_portal', __name__, static_url_path='', static_folder='static', template_folder='templates')

from habs_portal.controller import show_index

from habs_portal.proxy import get_test
