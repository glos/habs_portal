from habs_portal import habs_portal as api
from flask import render_template

@api.route('/')
def show_index():
    return render_template('index.html')

@api.route('/test/')
def show_test():
    return render_template('test.html')

@api.route('/map', methods=['GET'])
@api.route('/map/', methods=['GET'])
def show_map():
    return render_template('map.html')
