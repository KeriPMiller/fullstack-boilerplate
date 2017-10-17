# Fullstack Junior-Phase Boilerplate

- [Overview](#overview)
  - [What is this?](#what-this-is)
  - [What this ISN'T](#what-this-isnt)
  - [How can I contribute?](#how-to-edit)
  - [WHAT can I contribute?](#current-needs)
- [Express](#express)
- [PostgreSQL](#postgresql)
- [Sequelize](#sequelize)
- [Socket.IO](#socketio)
- [React](#react)
- [Redux](#redux)
- [React-Redux](#react-redux)
- [Webpack](#webpack)
- [Redux-Thunk](#redux-thunk)

## OVERVIEW

### WHAT THIS IS

[an attempt at] A concise, easy-to-read reference to get your projects up and running as quickly as possible. All the **setup** code you need will be found here.

### WHAT THIS ISN'T

This is NOT meant to be a “copy-paste and go” sort of reference, nor is it meant to be a replacement for documentation. The purpose of this is to help you set up your packages correctly--not to configure them to your needs. You will still need to know what these lines of code do.

### HOW TO EDIT

[Fork this repo](https://github.com/mjthor86/fullstack-boilerplate#fork-destination-box) and [make a pull request](https://help.github.com/articles/creating-a-pull-request/)! This document was written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), and the Gulp task to build the HTML is included ([VSC instructions here](https://code.visualstudio.com/docs/languages/markdown)).

It isn't _required_ to build the HTML for your pull requests, but please at least write them in Markdown!

### CURRENT NEEDS

- [x] General editing (literally everywhere)
- [ ] Webpack
- [ ] React-Thunk
- [ ] React-Redux
- [ ] HTML/CSS formatting (let's make it pretty!)

## Express

### NPM Modules

    npm install --save express body-parser {morgan OR volleyball}

### Dependencies

```javascript
const express = require('express');
const path = require('path'); // path formatting utility
const bodyParser = require('body-parser'); // parsing middleware
const morgan = require('morgan'); // logging middleware, can substitute with volleyball
```

### Setup

```javascript
// define express server
const app = express();

// use morgan logging middleware
app.use(morgan('dev'));

// use body-parser middleware
app.use(bodyParser.json()); // parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // parse URL requests

// static routing for /public/ path
app.use(express.static(path.join(__dirname, '..', 'public')));

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// start server and listen on port 3000 (usually done after a db.sync)
app.listen(3000, () => console.log(`server listening on port 3000`));
// error-handling, should come AFTER all other routes
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
```

### Express Router

```javascript
// in 'index.js' or 'start' file
const apiRouter = require('./api'); // will depend on route and file structure
app.use('/api', apiRouter);

// in '/api/index.js'
const router = require('express').Router();
module.exports = router;

// write routes (i.e. router.get(), router.set() or sub-routes)
```

## PostgreSQL

This one is pretty simple: you just need to run ‘createdb {server_name}’ on the command line. Most of the work we do with Postgres is via Sequelize.

If anyone else can think of something we need to remember here for setup, please suggest it!

## Sequelize

### NPM Packages

    npm install --save sequelize pg {pg-native AND/OR pg-hstore}

### Dependencies

```javascript
const Sequelize = require('sequelize');
```

### Setup

```javascript
const db = new Sequelize('postgres://localhost:5432/DB-NAME-HERE', {
    logging: false,
    native: true // omit this line if using pg-hstore
  }
);
```

### Examples
- [Model example](/examples/sequelize/model.md)

## Socket.IO

### NPM Packages

    npm install socket.io --save

### Create Server

```javascript
const socketio = require('socket.io');


// This part below app.listen so the express app has priority
const io = socketio(server);
```

### User Socket Server as Event-Emitter

```javascript
io.on('connection', function (socket) {
      /* This function receives the newly connected socket.
      This function will be called for EACH browser that connects to our server.
      i.e. If Ben and Matt both connect to the server, this will run once when Ben
      connects, and once when Matt connects */
  console.log('A new client has connected!');
  console.log(socket.id);
});
```

### Creating Socket Event

```javascript
// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
  console.log('I have made a persistent two-way connection to the server!');
});

// **Remember: socket refers to one individual socket
//             io refers to every socket
```

## React

### Tom’s Super Important Laws

1. State must ALWAYS be initialized with the appropriate data type.
2. Dumb components should be as dumb as possible, they should only calculate the view and nothing more.
3. All asynchronous behavior (such as AJAX) and side effects should go into a thunk.

### NPM Packages

    npm install --save react react-router-dom

### Dependencies

```javascript
import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
```

### Creating a Smart Component and Using React Router

```javascript
export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'all',
      property: 'value'
    };
  }

  changeState(view) {
    this.setState({
      view: view,
      property: 'newValue'
    })
  }

  componentDidMount() {
    this.setState({ view: this.props.match.params.view })
  }
}
```

### Using React Router

```javascript
// Inside a Component
render() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Component} />
        <Route path="/path" component={Component} />
      </div>
    </Router>
  );
}
```

## Redux

### NPM Packages

    npm install --save ***

### Dependencies

```javascript
// in store.js or wherever store is defined
import { createStore } from 'redux';
```

### Define the Initial State

```javascript
const initialState = {
  value: [], // always initialize state with correct value type
};
```

### Define Action Types

```javascript
const ACTION_TYPE = 'ACTION_TYPE';
```

### Define Action Creator

```javascript
export function actionCreator(value) {
  return {
    type: ACTION_TYPE,
    value
  }
}
```

### Define Reducer

```javascript
function reducer(prevState = initialState, action) {
  switch(action.type) {
    case ACTION_TYPE:
      let newState = Object.assign({}, prevState); // shallow copy
      newState.value = action.value;
      return newState;
    default:
      return prevState;
  }
};
```

### Define and Export Store

```javascript
const store = createStore(reducer);
export default store;
```

## React-Redux

### NPM Packages

    npm install --save react-redux

### Dependencies (index.js)

```javascript
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // choose router type
import { Main } from './components'; // will depend on where your Main.js is defined
import store from './store'; // will depend on where your store is defined
```

### Setup (index.js)

```javascript
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main /> // render your main component
    </Router>
  </Provider>,
  document.getElementById('app') // second argument to render(), references root node in your HTML
);
```

### Dependencies (connected component)

```javascript
import { connect } from 'react-redux';
```

### Setup (connected component)

```javascript
// map current state to props
const mapStateToProps = state => {
  return {
    name: state.name
  };
};

// map change/submit handlers (dispatches) to props
const mapDispatchToProps = dispatch => {
  return {
    handleChange(event) {
      dispatch(updateName(event.target.value));
    }
  };
};

// access state and dispatch methods via props
const Component = props => {
  const handleChange = props.handleChange;
  const state = props.state;

  return (
    <div>
    </div>
  );
};

// export connected version of component
const Container = connect(mapStateToProps, mapDispatchToProps)(NameEntry);
export default Container;
```

## Webpack

### Webpack.config.js

```javascript
'use strict';

// The exports is a configuration object that tells webpack what to do
module.exports = {

  // The entry field tells webpack where our application starts.
  // Webpack will start building this file and any subsequent file(s) that are imported by that file
  entry: './browser/react/index.js',

  // The output field specifies where webpack's output will go. In this case, we've specified
  // that it should put it into a file called bundle.js in our public directory
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },

  // The context field simply sets the context for relative pathnames
  context: __dirname,

  // This handy option tells webpack to create another, special file called "bundle.js.map".
  // This special file is called a "source-map".
  // If enabled, your browser will automatically request this file so that it can faithfully re-create your source code in your browser's dev tools.
  // This way, when you open the code for debugging in Chrome dev tools, instead of seeing the hard-to-read transpiled code that webpack creates, you'll
  // see your clean source code.
  // For more info: https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps
  devtool: 'source-map',

  // Here is where we specify what kinds of special syntax webpack should look out for
  module: {
    // Loaders are special node modules that we've installed that know how to parse certain syntax.
    // There are loaders for all different kinds of syntax.
    loaders: [
      {
        // Here, we want to test and see if any files end with .js or .jsx.
        // Only files that match this criteria will be parsed by this loader.
        test: /jsx?$/,
        // We want webpack to ignore anything in a node_modules or bower_components directory.
        // This is very important - modules have a responsibility to build their own js files.
        // If we were to do this ourselves, building our bundle.js would take forever!
        exclude: /(node_modules|bower_components)/,
        // We're using the babel-loader module to read our files - it can handle both ES6 and JSX!
        // Babel will use our .babelrc to figure out how to compile our code
        loader: 'babel-loader',
        // Here, we telling webpack to look for any syntax that looks like ES6 and any syntax that looks like JSX.
        // If it finds it, the babel-loader will transpile it for us!
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
```

## Redux-Thunk

### NPM Packages

    npm install --save redux-thunk

### Dependencies
```javascript
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
```

### GET Thunk
```javascript
export function fetchMessages () {
    return function thunk (dispatch) {
        return axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => {
            const action = getMessages(messages);
            dispatch(action);
        });
    }
}
```

### POST Thunk
```javascript
export function postMessage (message) {
    return function thunk (dispatch) {
        return axios.post('/api/messages', message)
        .then(res => res.data)
        .then(newMessage => {
            const action = getMessage(newMessage);
            dispatch(action);
            socket.emit('new-message', newMessage);
        });
    }
}
```
