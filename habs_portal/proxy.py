#!/usr/bin/env python
'''
habs_portal.proxy

Proxy routes for cross-domain requests
'''

from habs_portal import habs_portal as api

from flask import jsonify

@api.route('/api/test', methods=['GET'])
def get_tests():

    items = [ {"message":"Hi this is %s" % i} for i in xrange(10) ]
    return jsonify(messages=items)

@api.route('/api/test/<int:id>', methods=['GET'])
def get_test(id):
    return jsonify(message='Hi this is %s' % id)
