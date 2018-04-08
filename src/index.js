import React from 'react';
import ReactDOM from 'react-dom';
import Body from './containers/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Body />, document.getElementById('root'));
registerServiceWorker();
