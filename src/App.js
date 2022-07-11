import React from 'react';
import { Article, Navbar, Search, Subreddit } from './components';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="gradient__bg">
        <Navbar />
        {/* <Header /> */}
      </div>
      <div className='subreddits-container'>
        <Subreddit defaultSubreddit={"frontend"} />
        <Subreddit defaultSubreddit={"webdev"} />
        <Subreddit defaultSubreddit={"programming"} />
      </div>

    </div >
  );
}

export default App;