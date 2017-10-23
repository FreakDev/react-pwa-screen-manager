import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pages from './Pages';
import Page from './Page';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Pages>
        <Page name="home" exact path="/" />
        <Page name="page 2" path="/two" />
    </Pages>, document.getElementById('root'));
registerServiceWorker();
