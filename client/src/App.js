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
import '../src/App.css'

const client = new ApolloClient({
  uri: '/graphql',
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
