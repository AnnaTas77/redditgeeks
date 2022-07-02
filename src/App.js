import React from 'react';
import Subreddit from './components/subreddit/Subreddit';

function App() {
  return (
    <div className="main-container">
      <nav className="nav-container">
        {/* <input type="text" className="searchbar" value={subreddit} onChange={onChange}></input> */}
        <i className="fa-solid fa-magnifying-glass"></i>
      </nav>

      <Subreddit defaultSubreddit={"frontend"} />
      <Subreddit defaultSubreddit={"webdev"} />
      <Subreddit defaultSubreddit={"programming"} />
    </div >
  );
}

export default App;