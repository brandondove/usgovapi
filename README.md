#US Government API

We thought the US government data APIs looked interesting, so we're building a site that interacts with them. The objective is to find interesting ways of combining APIs to get new data correlations.

##Requirements

- NodeJS
- Node Package Manager
- MongoDB
- GruntJS

##Setup

Clone the repository

```
$ git clone https://github.com/brandondove/usgovapi.git .
```

Install the required packages

```
$ npm install
```

Start MongoDB

```
$ mongod
```

Run the node app

```
$ node app
```

Access the homepage of the app at the following URL: [http://localhost:3000/](http://localhost:3000/ "App Homepage")

##Grunt Tasks

Run all default tasks:

- Combine all custom javascripts
- Use jshint to check for javascript errors
- Minify combined javascript
- Compile SASS
- Minify CSS

```
$ grunt
```

Monitor the project for local changes during active development

```
$ grunt watch
```

Package the source up for release

```
$ grunt compress
```