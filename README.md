# habs_portal

HABS Data Portal


## Installation

### Python Virtualenv

1. Grab your favorite virtualenv tool or you can install to root but don't call
   me when things break.
   
   [Check out virtualenv Burrito](https://github.com/brainsik/virtualenv-burrito)

2. Make a virtual environment for this project

   ```
   mkvirtualenv habs
   ```

3. Install Numpy

   At the project root run
   ```
   workon habs
   pip install numpy==1.9.2
   ```

4. (Developer Only) Install the Developer dependencies

   ```
   workon habs
   pip install -r requirements/dev.txt
   ```

5. (Install Only) Install the python dependencies

   ```
   workon habs
   pip install -r requirements/requirements.txt
   ```

6. Grab node.js and Node Package Manager
   
   Either use your favorate package manager ([homebrew](http://brew.sh), yum,
   or apt-get) to get the nodejs and node-package-manager or download the
   source and compile yourself.

   ```
   cd /usr/local/src
   wget 'http://nodejs.org/dist/v0.12.0/node-v0.12.0.tar.gz'
   tar -zxvf node-v0.12.0.tar.gz
   cd node-v0.12.0
   ./configure --prefix=/usr/local
   make
   sudo make install
   cd ..
   ```
7. Install the Node package dependencies

   At the project root run:
   ```
   npm install
   ```

8. Install the Bower dependencies
   
   You may need to install the bower command line tool first. If you installed
   nodejs to your system, you'll need to run this command with **sudo** privileges.
   ```
   npm install bower -g
   ```

   At the project root run:
   ```
   bower install
   ```

   You should see all of the depdencies being downloaded and put into the lib directory.

9. Install Grunt and the Grunt Command Line Tool

   You may need to install the grunt and grunt command line tool globally. If
   you install nodejs to your system level, you'll need to run this command
   with **sudo** privileges.

   ```
   npm install grunt-cli -g
   ```

10. Run Grunt
    
    At the project root run:
    ```
    grunt
    ```

    And you should see something similar to: 
    ```
    Running "jst:compile" (jst) task
    File habs_portal/static/js/partials/compiled/test.js created.

    Running "concat:js" (concat) task
    File habs_portal/static/js/compiled/test.js created.

    Running "concat:css" (concat) task
    File habs_portal/static/css/compiled/test.css created.

    Done, without errors.
    ```

## Running the Application

To run the application in a development environment, just launch run app.py.

At the project root:

```
python app.py
```

## Generating the Datasets Cache
For performance reasons, the application has a local cache of the dataset
catalog supplied by THREDDS. To update this cache please run the following:

```
python manage.py harvest habs_portal/static/json/dataset.json
```

To verify that it works you can curl the test API and/or go to the `/test/` URL.

## Development

### HTML Pages

HTML pages should be defined in `habs_portal/templates`. Each HTML file should
use the JINJA template structure extending from base.html. This allows us to
define the standard HTML metadata accross all pages unifromly in one place. The
other reason to use JINJA templates is so that we can get direct access to
session variables through the jinja template structure. Access to session
variables is useful for forms and CSRF Protection.

Routes to HTML pages should be defined in `habs_portal/controller.py`. Any
application logic to support the pages should also be defined in there as well,
so things like session variables, cookies etc.

### API

Most of the API here will be request proxies to other services: THREDDS, ASA
Services Bundle, etc. The Proxy endpoints should be prefixed with 'api' and
should handle errors. Any errors passed will be briefly parsed and passed
directly to the UI.


## Backbone Philosophy

### Models

Each model should be analogous to one document or tuple of data. Nested
structure are discouraged, instead they should link to other models. Collections
represent a collection of models. The API should return a collection as a
dictionary (to be JSON compliant) but with an intuitive key, whose value is the
list of models. Optionally, length and error keys can be returned in the
dictionary structure to assist the UI.

Example
```json
{
  "stations": [
    {
      "id": "on223",
      "station_name" : "Ontario Temperature Station 223",
      "location": {
        "lat": 43.42,
        "lon": -77.91,
        "depth" : 10
      }
    },
    {
      "id" : "on224",
      "station_name" : "Onatrio Bottom Turbidity Station 224",
      "location" : {
        "lat": 43.42,
        "lon": -77.91,
        "depth" : 33
      }
    }
  ],
  "length" : 2,
  "error": "" // Generally only used when status code != 200
}
```

### Views

Views should be very minimal in their extent. Keep them very simple and
intuitive. A map can be a view and should have basic capabilities desired out of
the map:

 - Redraw
 - Draw Station
 - Center
 - Zoom
 - Pan

Views should almost always have partials. Partials go into
`habs_portal/static/js/partials/`. If a view relies on asynchronous data, and
most do, it should have an initial render that is called after initialzation
that acts as a placeholder until the data is completely fetched and the full
component can be rendered. This initial render can be something like a
spin-wheel or something indicated to the user that something is in progress.

For views that represent lists or tables of models, like a table view or a list
view, subviews can be used. If a subview is used, I will take it as a huge
kindness if you bind it to the parent under the `views` attribute, to keep
things consistent.

Consider the following:

```javascript
var GenericTableView = Backbone.View.extend({
  views: [], // Because we're using subviews
  add: function(model) {
    var view = new TableItemView({
      model: model
    });
    view.render();
    this.$el.find('tbody').append(view.el);
    this.views.push(view);
  },
  initialize: function() {
    // Make a spin wheel
    this.$el.html("<div id='spinwheel'></div>");
  },
  template: JST['table.html'],
  render: function() {
    var self = this;
    this.$el.html(this.template());
    this.collection.each(function(model) {
      self.add(model);
    });
  }
});

var TableItemView({
  tagName: 'tr'
  ...
});
```

### Event Management

Every page should have a root application object which is responsible for
initializing views, rendering views, fetching collections, fetching models, and
dispatching events in the page. It should be defined like:

```javascript

var App = function() {
}

_.extend(App.prototype, Backbone.Events, {
  collections: {},
  models: {},
  views: {},
  start: function() {
    // Collection initializations
    // Model Initializations
    // View initializations and initial renders
    // Event Listeners
    // Collection and Model Fetchers
  }
});

app = new App();

$(document).ready(function() {
  app.start();
});

```



### Compiling Using Grunt

Page Javascript and CSS dependencies should mostly be handled by grunt. You can
use `grunt watch` on the command line to listen for changes and automatically
recompile. 

Every page should have a section in the grunt configuration under `jst` (for
partials), `js` and `css`. Comments are encoraged in the gruntfile to help
explain why their needed.

Example for the partials, I include every partial that this page will need here.
Note how the compiled script is a javascript file (.js). 

```
jst: {
  compile: {
    files: {
      "habs_portal/static/js/partials/compiled/test.js" : [
        "habs_portal/static/js/partials/TestTable.html"
      ]
    }
  }
}
```

Example for the JS dependencies:
```
js: {
  files: {
    // The compile destination
    'habs_portal/static/js/compiled/test.js' : [
      // Libs
      // Here are all of my library dependencies
      'habs_portal/static/lib/jquery/dist/jquery.js',
      'habs_portal/static/lib/jquery-ui/jquery-ui.js',
      'habs_portal/static/lib/bootstrap/dist/bootstrap.js',
      'habs_portal/static/lib/underscore/underscore.js',
      'habs_portal/static/lib/backbone/backbone.js',
      // Models
      // Here are all the models I need to run this page
      'habs_portal/static/js/models/TestModel.js',
      // Views
      // All the views I need to run the page
      'habs_portal/static/js/views/TestTableView.js'
    ],
  }
}
```

It's almost identical for CSS.

## Project Layout

#### `habs_portal/static/css/`

All of the CSS files.

#### `habs_portal/static/css/compiled/`

This folder is where the compiled CSS files go, generated by grunt. This should
remain unused during development.

#### `habs_protal/static/img/`

Any image files. Subdirectories can be used.
 
#### `habs_portal/static/js/compiled/`

This is where the compiled Javascript files go, that are compiled by Grunt.

#### `habs_portal/static/js/models/`

All backbone Model Definitions. Naming convention is capital camel case for both
the class name and the filename.


#### `habs_portal/static/js/partials/`

HTML Partials that are used by the views. 

#### `habs_portal/static/js/partials/compiled/`

Grunt compiles the partials into this directory.

#### `habs_portal/static/js/views/`

Backbone View definitions.

#### `habs_portal/static/json/`

Repository for static JSON files (great for testing)



