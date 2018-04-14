import React from 'react';
import ReactDOM from 'react-dom';
import Body from './containers/index';
import "./App.css"
import registerServiceWorker from './registerServiceWorker';
require('dotenv').config()

ReactDOM.render(<Body />, document.getElementById('root'));
registerServiceWorker();
