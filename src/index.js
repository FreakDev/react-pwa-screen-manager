import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import PageManager from './PageManager';
import Page from './Page';
import NavigationBar from './NavigationBar';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <PageManager>
            <Page name="home" exact path="/" />
            <Page name="page 2" exact path="/two" />
            <NavigationBar position="bottom" />
        </PageManager>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
