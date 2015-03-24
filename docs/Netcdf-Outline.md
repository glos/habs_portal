### THREDDS Placement

Right now we only have one conceptual data type, which is lake data. (Limnology
for those who prefer). I call this data type "lakes" for ease of use within
directories and catalog structures.

Here's an example directory structure for the catalog.
```
lakes
lakes/temperature
lakes/temperature/tollsps
lakes/temperature/tollsps/2015
lakes/temperature/tollsps/2015/glos-lakes_temperature_tollsps_201501.nc
lakes/temperature/tollsps/2015/glos-lakes_temperature_tollsps_201502.nc
lakes/temperature/tollsps/tollsps.ncml
```

Here's the THREDDS Catalog Entry:

```xml
  <dataset name="GLOS HABS" id="habs">
      <metadata inherited="true">
          <serviceName>all</serviceName>
          <dataType>Station</dataType>
          <dataFormat>NetCDF</dataFormat>
      </metadata>
      <datasetScan name="habs" path="habs" location="/Users/lcampbell/Documents/Datasets/GLOS/HABS">
          <filter>
              <include wildcard="*.nc" />
              <include wildcard="*.ncml" />
          </filter>
          <addDatasetSize />
      </datasetScan>
  </dataset>
```


Here's the NCML File:
```xml
<netcdf xmlns="http://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2">
  <aggregation dimName="time" type="joinExisting">
    <scan location="./" suffix=".nc" />
  </aggregation>
</netcdf>
```

So the typical directory structure goes something like this:
```
<ROOT>/habs/lakes/<category>/<station_id>/<year>/glos-lakes_<category>_<station_id>_<year><month>.nc
<ROOT>/habs/lakes/<category>/<station_id>/<station_id>.ncml
```

Each dataset, for now, is timeseries containing variables for only that
category. The time dimension **can be unlimited** the NCML aggregations handle
it just fine, only if there are no other dimensions for the data except time.
So, we can just keep appending the data as it comes in and both the NCML
aggregation and the services will pick it up no problem.

### Global metadata
`:cdm_data_type = "Station" ;` is very important 

`:featureType = "timeSeries" ;` is very important 

for `date_created` and `date_issued` use date (1990-01-01) rather than date time...

```
  // ACDD Highly Recommended
	:title = "GLOS" ; // A short description of the dataset. Emphasis on SHORT! Seriously no more than 12 characters!
	:summary = "GLOS Dataset for insitu observations from vax_10min_Wind_speed_932_201110.mat" ; // A paragraph describing the dataset
	:keywords = "Atmosphere > Atmospheric Winds > Surface Winds > Wind Speed/Wind Direction, Oceans > Ocean Winds > Surface Winds, DOD > DOD/USARMY/USACE/CHL/FRF > Field Research Facility, Coastal And Hydraulics Laboratory, U. S. Army Corps Of Engineers, U.S. Army, U. S. Department Of Defense, wind_speed, wind_speed_of_gust, wind_from_direction" ; // A comma separated list of key words and phrases
  // ACDD Recommended
	:id = "932" ;
  :naming_authority = "GLOS" ; // The combination of the naming authority and the id should be a globally unique identifier for the dataset
	:keywords_vocabulary = "Global Change Master Directory (GCMD) Earth Science Keywords; CF Standard Name Table (v23, 23 March 2013)" ;
  :cdm_data_type = "Station"
	:history = "GLOS" ; // Provides an audit trail for modifications to the original data.
	:comment = "" ; // Miscellaneous information about the data.
	:date_created = "2014-12-30" ; // The date on which the data was created.
	:creator_name = "GLOS" ; // The creat
	:creator_url = "http://www.frf.usace.army.mil/" ;
	:creator_email = "frfwebmaster@usace.army.mil" ; // The data creator's name, URL and email. institution will be used if creator_name does not exist
	:institution = "GLOS" ;
	:project = "GLOS" ;
	:processing_level = "L1" ; // A textual description of the processing or quality control level of the data.
	:acknowledgement = "GLOS" ;
	:geospatial_lat_min = 36.1836726 ;
	:geospatial_lat_max = 36.1836726 ;
	:geospatial_lon_min = 75.7451334 ;
	:geospatial_lon_max = 75.7451334 ;
	:geospatial_vertical_min = "" ;
	:geospatial_vertical_max = "" ;
	:time_coverage_start = "2011-10-18T12:00:00Z" ;
	:time_coverage_end = "2011-10-31T23:40:00Z" ;
  :time_coverage_duration = "P1M" ; // ISO8601 Duration String
	:standard_name_vocabulary = "CF-1.6"
	:license = "These data may be redistributed and used without restriction. Data are intended for scholarly use by the research community, with the express agreement that users will properly acknowledge the USACE Field Research Facility and the supporting investigator(s). Use or reproduction of these data for commercial purposes is prohibited without prior written permission." ;
  // ACDD Suggested
	:contributor_name = "GLOS" ; // The name and role of any individuals or institutions that contributed to the creation of this data
	:contributor_role = "GLOS" ;
	:publisher_name = "GLOS" ;
	:publisher_url = "http://www.frf.usace.army.mil" ;
	:publisher_email = "frfwebmaster@usace.army.mil" ;
  :date_modified = "2015-03-15T15:00:12Z" ; // The date on which this data was last modified.
	:date_issued = "2014-12-30" ; // The date on which this data was formally issued
	:geospatial_lat_units = "degrees_north" ;
  :geospatial_lat_resolution = "" ;
	:geospatial_lon_units = "degrees_east" ;
  :geospatial_lon_resolution = "" ;
	:geospatial_vertical_units = "" ;
	:geospatial_vertical_resolution = "" ;
  // The geospatial_vertical_positive attribute indicates which direction is
  // positive (a value of "up" means that z increases up, like units of height,
  // while a value of "down" means that z increases downward, like units of
  // pressure or depth).
	:geospatial_vertical_positive = "down" ; 
  // The method of production of the original data. If it was model-generated,
  // source should name the model and its version, as specifically as could be
  // useful. If it is observational, source should characterize it (e.g., "
  // surface observation " or " radiosonde ").
  :source = "surface observation" ; 
	:sourceUrl = "(local files)" ;
	:Metadata_Conventions = "Unidata Dataset Discovery v1.0,CF-1.6" ; // Really annoying artifact, Needs to be defined for ACDD compliance
	:feature_type = "timeSeries" ; // CF-1.6 Chapter 9.1
	:Conventions = "Unidata Dataset Discovery v1.0,CF-1.6" ; // How NUG defines which conventions are followed
```

### Dimensions

`Time` only! Notice the fields below dont have dimensions so therefore are just values...

```
double lat ;
  lat:_FillValue = -999.99 ;
	lat:units = "degrees_north" ;
	lat:standard_name = "latitude" ;
	lat:long_name = "Latitude" ;
	lat:short_name = "lat" ;
double lon ;
	lon:_FillValue = -999.99 ;
	lon:units = "degrees_east" ;
	lon:standard_name = "longitude" ;
	lon:long_name = "Longitude" ;
	lon:short_name = "lon" ;
double station_name ;
	station_name:units = "" ;
	station_name:long_name = "station name" ;
	station_name:cf_role = "timeseries_id" ;
	station_name:short_name = "station_name" ;
```

normal fields look like this

```
double temperature(time) ;
        temperature:_FillValue = -999.99 ;
        temperature:units = "deg_C" ;
        temperature:standard_name = "sea_surface_temperature" ;
        temperature:long_name = "Sea Surface Water Temperature" ;
        temperature:coordinates = "time lat lon" ;
        temperature:description = "Surface water temperature measured in degrees celsius" ;
        temperature:short_name = "Temperature" ;
double windDirection(time) ;
        windDirection:_FillValue = -999.99 ;
        windDirection:units = "degree" ;
        windDirection:standard_name = "wind_from_direction" ;
        windDirection:long_name = "Wind Direction" ;
        windDirection:coordinates = "time lat lon" ;
        windDirection:description = "Wind direction from true north" ;
        windDirection:short_name = "Wind Direction" ;
```
		
