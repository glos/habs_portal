from habs_portal import habs_portal as api
from flask import render_template, redirect, url_for

@api.route('/')
def show_index():
    print url_for('.show_map')
    return redirect(url_for('.show_map'))

@api.route('/test/')
def show_test():
    return render_template('test.html')

@api.route('/map', methods=['GET'])
@api.route('/map/', methods=['GET'])
def show_map():
    return render_template('map.html')
