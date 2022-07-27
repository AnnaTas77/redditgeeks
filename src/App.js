import React, { useState } from 'react';
import { Navbar, Subreddit, Addsub } from './components';
import './App.css';
import swal from 'sweetalert';

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

    let subsArray;
    if (storedSubs === null) {
      console.error("State is not expected to be null at this point.");
      subsArray = [];
    } else {
      subsArray = JSON.parse(storedSubs);
    }

    if (subsArray.includes(newSubreddit.toLowerCase())) {
      const lowerSub = newSubreddit.toLowerCase();
      const capitalizedSub = lowerSub.charAt(0).toUpperCase() + lowerSub.slice(1);
      swal({
        title: `"${capitalizedSub}" already exists.`,
      });
      return; // guard pattern
    }

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
          <a href="mailto:hello.annatas@gmail.com" aria-label="Anna's email - Click to copy." target="_blank">
            <div className="icon-container">
              <i className="fa-solid fa-envelope"></i>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/anna-tasheva-48074085/" aria-label="Anna's LinkedIn profile." target="_blank">
            <div className="icon-container">
              <i className="fa-brands fa-linkedin"></i>
            </div>
          </a>
          <a href="https://github.com/AnnaTas77" aria-label="Anna's GitHub profile." target="_blank">
            <div className="icon-container">
              <i className="fa-brands fa-github"></i>
            </div>
          </a>
        </div>

        <div className='credits'>
          Designed and developed by Anna Tasheva ©2022
        </div>
      </footer>

    </div>


  );
}

export default App;