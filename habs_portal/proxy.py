#!/usr/bin/env python
'''
habs_portal.proxy

Proxy routes for cross-domain requests
'''

from habs_portal import habs_portal as api
from flask import current_app as app
from flask import jsonify, request
import requests
import json
import codecs

@api.route('/api/test', methods=['GET'])
def get_tests():
    items = [ {"message":"Hi this is %s" % i} for i in xrange(10) ]
    return jsonify(messages=items)

@api.route('/api/test/<int:id>', methods=['GET'])
def get_test(id):
    return jsonify(message='Hi this is %s' % id)

@api.route('/plotting/getplot', methods=['GET'])
@api.route('/plotting/getplot/', methods=['GET'])
def get_plot():
    plot_service = app.config['PLOT_SERVICE']
    if plot_service is None:
        return api.send_static_file('svg/plot_example.svg')
        # Return static file
    plot_service += '/plotting/getplot/'
    response = requests.get(plot_service, params=request.args)
    return response.content, 200, dict(response.headers)

def _get_datasets():
    '''
    Opens the JSON file for the datasets and returns the contents.
    '''
    with codecs.open('habs_portal/static/json/dataset.json', 'r', encoding='utf-8') as f:
        records = json.loads(f.read())
    return records

@api.route('/api/dataset', methods=['GET'])
def get_datasets():
    '''
    Example response:
    {
        "datasets": [
            {
                "category_id" : "ysi_turbidity",
                "station_id" : "tollsps",
                "variables": [
                    "turbidity"
                ]
            }
        ],
        "length" : 1
    }
    '''
    return jsonify(**_get_datasets())

