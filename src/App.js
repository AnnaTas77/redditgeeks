import React, { useState } from 'react';
import { Navbar, Subreddit, Addsub } from './components';
import './App.css';

function App() {

  const [updateTrigger, setUpdateTrigger] = useState(0);

  const initialSubreddits = JSON.parse(localStorage.getItem("favouriteSubs"));
  if (localStorage.getItem("favouriteSubs") === null) {
    localStorage.setItem("favouriteSubs", JSON.stringify(["frontend", "webdev", "programming"]))
  }


  const addSubbreddit = () => {

    const storedSubs = localStorage.getItem("favouriteSubs");

    if (storedSubs === null) {
      console.error("State is not expected to be null at this point.");
    }

    let subsArray = JSON.parse(storedSubs);
    subsArray.push("sofia")
    localStorage.setItem("favouriteSubs", JSON.stringify(subsArray))

    setUpdateTrigger(updateTrigger => updateTrigger + 1); // updates the state to force render
  }

  return (
    <div className="app-container">

      <Navbar />

      <div className='subreddits-container'>
        {/* <div className='subreddits-wrapper'> */}

        {initialSubreddits.map((initialSubreddit, index) => {
          return <Subreddit key={index} localStorageIndex={index} initialSubreddit={initialSubreddit} />
        })}

        <div className='add-subreddit'>
          <Addsub addSubbreddit={addSubbreddit} />
        </div>

        {/* </div> */}

      </div>

    </div >
  );
}

export default App;