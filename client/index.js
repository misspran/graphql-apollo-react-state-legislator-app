import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

const client = new ApolloClient({

	uri: "http://localhost:4000/graphql"

})


// client
//   .query({
//     query: gql`
//       {
//         legislatorsByState(state:"MA"){
//   cid(cid:"N00000153")
//   firstLast(cid:"N00000153")
  
// }
//       }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
)
