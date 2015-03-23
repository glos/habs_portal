#!/usr/bin/env python
'''
habs_scripts/harvest_datasets.py

Harvesting scripts for harvesting the datasets from TDS
'''

from thredds_crawler.crawl import Crawl
from netCDF4 import Dataset, num2date
from flask import current_app as app
import codecs
import json

class DatasetMetadata:
    '''
    A simple class to hold metadata about a specific dataset.
    '''
    # a list of non data variables (includes time)
    IGNORE_VARS = (
        'platform',
        'crs',
        'feature_type_instance',
        'instrument',
        'longitude',
        'latitude',
        'height',
        'time'
    )

    def __init__(self, dataset):
        self.dataset = dataset
        self.variables = []
        self.attributes = {}

    def harvest(self):
        self._build_attrs()
        self._build_variables()

    def _build_variables(self):
        '''
        Builds a collection of variable records
        '''
        for varname in self.dataset.variables:
            nc_var = self.dataset.variables[varname]
            if varname in self.IGNORE_VARS:
                continue

            variable_record = self._build_var_record(varname, nc_var)

            self.variables.append(variable_record)

    def _build_var_record(self, varname, var):
        '''
        Returns a dictionary with the standard variable attributes
        '''
        include_attrs = (
            'standard_name',
            'units',
            'short_name',
            'long_name'
        )

        record = {
            'name' : varname
        }
        for attr in include_attrs:
            if hasattr(var, attr):
                record[attr] = getattr(var, attr)
            else:
                record[attr] = None
        return record

    def _build_attrs(self):
        self._build_time_coverage()
        self._build_globals()

    def _build_globals(self):
        '''
        Builds the dataset global attributes
        '''
        desired_attribtues = (
            'title',
        )
        for attribute in desired_attribtues:
            self.attributes[attribute] = self._if_has_get(self.dataset, attribute)


    def _if_has_get(self, obj, attr):
        '''
        Returns the attribute if it exists or None. Safer than gettatr because
        gettattr will raise an attribute error on netCDF datasets.
        '''

        r = None
        if hasattr(obj, attr):
            r = getattr(obj, attr)
        return r

    def _build_time_coverage(self):
        '''
        Reads the globals time_coverage_start and time_coverage_end directly
        from the time variables.
        '''
        time_var = self.dataset.variables['time']
        start_time = time_var[0]
        end_time = time_var[-1]
        start_dtg = num2date(start_time, units=time_var.units)
        end_dtg = num2date(end_time, units=time_var.units)
        start_iso = start_dtg.isoformat()
        end_iso = end_dtg.isoformat()
        self.attributes['time_coverage_start'] = start_iso
        self.attributes['time_coverage_end'] = end_iso


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
            app.logger.exception("")
            continue # Not a valid dataset we care about anyway
        if xml != 'catalog.xml':
            continue # We only care about the aggregate ncml file
        record = {
            'category_id' : category,
            'station_id' : station,
            'variables' : [],
            'attributes': {}
        }
        odap = next(i for i in dataset.services if i['service'] == 'OPENDAP')
        dap_url = odap['url']
        app.logger.info("Fetching %s", dap_url)
        nc = Dataset(dap_url, 'r')
        try:
            dataset_metadata = DatasetMetadata(nc)
            dataset_metadata.harvest()
            record['variables'] = dataset_metadata.variables
            record['attributes'] = dataset_metadata.attributes
            records.append(record)
        finally:
            nc.close()

    with codecs.open(json_file, 'w', encoding='utf-8') as f:
        f.write(json.dumps({'datasets':records, 'length':len(records)}))

