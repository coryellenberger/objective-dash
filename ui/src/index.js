import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider} from 'react-apollo';

import {getClient} from './ApolloClient';

const Main = () => (
  <ApolloProvider client={getClient()}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(<Main/>, document.getElementById('root'));
registerServiceWorker();
