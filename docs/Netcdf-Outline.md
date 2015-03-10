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
	:description = "Wind Derived Observation Data" ;
	:history = "GLOS" ;
	:source = "insitu observations from vax_10min_Wind_speed_932_201110.mat" ;
	:sourceUrl = "(local files)" ;
	:standard_name_vocabulary = "CFv25" ;
	:Metadata_Conventions = "Unidata Dataset Discovery v1.0, CF-1.6" ;
	:feature_type = "timeSeries" ;
	:Conventions = "CF-1.6" ;
	:creator_name = "GLOS" ;
	:creator_url = "http://www.frf.usace.army.mil/" ;
	:creator_email = "frfwebmaster@usace.army.mil" ;
	:license = "These data may be redistributed and used without restriction. Data are intended for scholarly use by the research community, with the express agreement that users will properly acknowledge the USACE Field Research Facility and the supporting investigator(s). Use or reproduction of these data for commercial purposes is prohibited without prior written permission." ;
	:keywords_vocabulary = "Global Change Master Directory (GCMD) Earth Science Keywords; CF Standard Name Table (v23, 23 March 2013)" ;
	:keywords = "Atmosphere > Atmospheric Winds > Surface Winds > Wind Speed/Wind Direction, Oceans > Ocean Winds > Surface Winds, DOD > DOD/USARMY/USACE/CHL/FRF > Field Research Facility, Coastal And Hydraulics Laboratory, U. S. Army Corps Of Engineers, U.S. Army, U. S. Department Of Defense, wind_speed, wind_speed_of_gust, wind_from_direction" ;
	:processing = "historical" ;	
	:organization = "GLOS" ;
	:publisher_url = "http://www.frf.usace.army.mil" ;
	:infoUrl = "http://www.frf.usace.army.mil" ;
	:publisher_email = "frfwebmaster@usace.army.mil" ;
	:publisher_name = "GLOS" ;
	:format_version = "v1.0" ;
	:institution = "GLOS" ;
	:contact = "GLOS" ;
	:contact_info = "GLOS" ;
	:contact_role = "GLOS" ;
	:contributor_name = "GLOS" ;
	:contributor_role = "GLOS" ;
	:title = "GLOS" ;
	:origin = "GLOS" ;
	:date_created = "2014-12-30" ;
	:date_issued = "2014-12-30" ;
	:acknowledgement = "GLOS" ;
	:project = "GLOS" ;
	:summary = "GLOS Dataset for insitu observations from vax_10min_Wind_speed_932_201110.mat" ;
	:id = "932" ;
	:acknowledgment = "GLOS" ;
	:processing_level = "L1" ;
	:geospatial_vertical_units = "" ;
	:geospatial_vertical_resolution = "" ;
	:geospatial_vertical_min = "" ;
	:geospatial_vertical_max = "" ;
	:comment = "" ;
	:geospatial_lat_min = 36.1836726 ;
	:geospatial_lat_max = 36.1836726 ;
	:geospatial_lat_units = "degrees_north" ;
	:geospatial_lon_min = 75.7451334 ;
	:geospatial_lon_max = 75.7451334 ;
	:geospatial_lon_units = "degrees_east" ;
	:geospatial_vertical_positive = "up" ;
	:time_coverage_start = "2011-10-18T12:00:00Z" ;
	:time_coverage_end = "2011-10-31T23:40:00Z" ;
	:name = "FRF 932" ;
	:depth = -0. ;
	:file = "/RawData/vaxTS_201110_unedited.mat" ;
	:type = "10-min ave" ;
```

### Dimensions

`Time` only! Notice the fields below dont have dimensions so therefore are just values...

``` python
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

``` python
double windGust(time) ;
        windGust:_FillValue = -999.99 ;
        windGust:units = "m s-1" ;
        windGust:standard_name = "wind_speed_of_gust" ;
        windGust:long_name = "Wind Gust" ;
        windGust:coordinates = "time lat lon" ;
        windGust:description = "5 second largest mean wind speed" ;
        windGust:short_name = "Gust" ;
double windDirection(time) ;
        windDirection:_FillValue = -999.99 ;
        windDirection:units = "degree" ;
        windDirection:standard_name = "wind_from_direction" ;
        windDirection:long_name = "Wind Direction" ;
        windDirection:coordinates = "time lat lon" ;
        windDirection:description = "Wind direction from true north" ;
        windDirection:short_name = "Wind Direction" ;
```
		
