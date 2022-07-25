import React, { useState } from 'react';
import { Navbar, Subreddit, Addsub } from './components';
import './App.css';

function App() {

  let storedSubreddits = localStorage.getItem("favouriteSubs");
  if (storedSubreddits === null) {
    storedSubreddits = JSON.stringify(["frontend", "webdev", "programming"]) // initiates default subreddits
    localStorage.setItem("favouriteSubs", storedSubreddits)
  }
  const storedSubredditsArray = JSON.parse(storedSubreddits)

  const [subreddits, setSubreddits] = useState(storedSubredditsArray);

  const addSubreddit = (newSubreddit) => {

    const storedSubs = localStorage.getItem("favouriteSubs");

    if (storedSubs.includes(newSubreddit.toLowerCase())) {
      alert(`${newSubreddit} already exists.`)
      return; // guard pattern
    }

    if (storedSubs === null) {
      console.error("State is not expected to be null at this point.");
    }
    let subsArray = JSON.parse(storedSubs);
    subsArray.push(newSubreddit)
    localStorage.setItem("favouriteSubs", JSON.stringify(subsArray))

    setSubreddits(subsArray)
  }

  const deleteSubreddit = (indexToDelete) => {

    const subsArray = JSON.parse(localStorage.getItem("favouriteSubs"));
    subsArray.splice(indexToDelete, 1)
    localStorage.setItem("favouriteSubs", JSON.stringify(subsArray))
    console.log("Storing in local storage.")

    setSubreddits(subsArray)
  }

  return (
    <div>
      <div className="app-container">

        <Navbar />

        <div className='subreddits-container flex-grid'>
          {subreddits.map((subreddit, index) => {
            return <Subreddit key={subreddit} localStorageIndex={index} initialSubreddit={subreddit} deleteSubreddit={deleteSubreddit} />
          })}
          <div className='add-subreddit'>
            <Addsub addSubreddit={addSubreddit} />
          </div>
        </div>
      </div >

      <footer className='footer'>
        <div className='social'>
          <h4>Let's connect!</h4>
        </div>

        <div className='credits'>
          Designed and developed by Anna Tasheva ©2022
        </div>
      </footer>

    </div>


  );
}

export default App;