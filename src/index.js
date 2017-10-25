import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import PageManager from './PageManager';
import Page from './Page';
import NavigationBar from './NavigationBar';

ReactDOM.render(
<div>
    <PageManager>
        <Page style={{ background: 'red' }} name="home" exact path="/" />
        <Page style={{ background: 'green' }} name="page 2" exact path="/two" />
        <Page style={{ background: 'blue' }} name="page 3" exact path="/three" />
        <NavigationBar position="bottom" />
    </PageManager>
</div>
, document.getElementById('root'));
