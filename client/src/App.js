import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import '../src/App.css'

import Header from './components/header';
import Footer from './components/footer';
import Welcome from './components/pages/welcome';
import Home from './components/pages/home';
import Explore from './components/pages/explore';
import Saved from './components/pages/saved';
import Profile from './components/pages/profile';

import CreateSquare from './components/pages/createSquare';
import SquareView from './components/pages/squareView';

import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const loggedIn = Auth.loggedIn();


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            {loggedIn ? (
              <>
                <Route path="/Home" element={<Home />} />
                <Route path="/Explore" element={<Explore />} />
                <Route path="/Saved" element={<Saved />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path='/Post' element={<CreateSquare />} />
                <Route path='/SquareView/:id' element={<SquareView />} />
                {/* Add a default route to the home page */}
                <Route path="*" element={<Home />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Welcome />} />
                <Route path="*" element={<Welcome />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

//square 2






export default App;
