import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { StyleRoot } from 'radium';
import { BrowserRouter as Router } from 'react-router-dom';

import Portfolio from 'components/Portfolio/Portfolio';
import registerServiceWorker from 'registerServiceWorker';
// import reducer from 'reducers';
import 'index.scss';

const rootElem = document.getElementById('root');
// const store = createStore(reducer);


ReactDOM.render(
    <StyleRoot>
        <Router>
            <Portfolio />
        </Router>
    </StyleRoot>,
    rootElem
);

/*
 *   <Provider store={store}>
 *    </Provider>
 */

registerServiceWorker();
