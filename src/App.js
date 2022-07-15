import React from 'react';
import { Article, Navbar, Search, Subreddit } from './components';
import './App.css';

function App() {

  if (localStorage.getItem("favouriteSubs") === null) {
    localStorage.setItem("favouriteSubs", JSON.stringify(["frontend", "webdev", "programming"]))
  }

  const initialSubreddits = JSON.parse(localStorage.getItem("favouriteSubs"));

  return (
    <div className="app-container">
      <div className="gradient__bg">
        <Navbar />
        {/* <Header /> */}
      </div>
      <div className='subreddits-container'>
        {initialSubreddits.map((initialSubreddit, index) => {
          return <Subreddit key={index} localStorageIndex={index} initialSubreddit={initialSubreddit} />
        })}
      </div>

    </div >
  );
}

export default App;