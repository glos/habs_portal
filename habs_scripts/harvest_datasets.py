#!/usr/bin/env python
'''
habs_scripts/harvest_datasets.py

Harvesting scripts for harvesting the datasets from TDS
'''

from thredds_crawler.crawl import Crawl
from netCDF4 import Dataset
from flask import current_app as app
import json

def harvest(json_file):
    '''
    Writes to a JSON file, all of the dataset entries at a particular TDS
    catalog.
    '''
    c = Crawl(app.config['THREDDS_SERVICE'] + 'catalog.xml')
    records = []
    for dataset in c.datasets:
        path = dataset.catalog_url.split(app.config['THREDDS_SERVICE'])[1]
        try:
            category, station, xml = path.split('/', 2)
        except ValueError:
            continue # Not a valid dataset we care about anyway
        if xml != 'catalog.xml':
            continue # We only care about the aggregate ncml file
        record = {
            'category_id' : category,
            'station_id' : station,
            'variables' : []
        }
        odap = next(i for i in dataset.services if i['service'] == 'OPENDAP')
        dap_url = odap['url']
        nc = Dataset(dap_url, 'r')
        ignore_these = (
            'platform',
            'crs',
            'feature_type_instance',
            'instrument',
            'longitude',
            'latitude',
            'height',
            'time'
        )
        for varname in nc.variables:
            if varname in ignore_these:
                continue
            record['variables'].append(varname)

        records.append(record)

    with open(json_file, 'w') as f:
        f.write(json.dumps({'datasets':records, 'length':len(records)}))
