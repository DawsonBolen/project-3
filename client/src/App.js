import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Header from './components/header';
import Footer from './components/footer';
import Welcome from './components/pages/welcome';
import Home from './components/pages/home';
import Explore from './components/pages/explore';
import Saved from './components/pages/saved';
import Profile from './components/pages/profile';

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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Saved" element={<Saved />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
