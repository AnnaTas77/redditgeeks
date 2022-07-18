import React, { useState } from 'react';
import { Article, Navbar, Search, Subreddit, Addsub } from './components';
import './App.css';

function App() {

  const [componentList, setComponentList] = useState([]);

  const addSubbreddit = () => {
    console.log('Clicked add new sub');
    setComponentList(componentList.concat(<Subreddit key={componentList.length} />));
  }



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
        <div className='subreddits-wrapper'>

          {initialSubreddits.map((initialSubreddit, index) => {
            return <Subreddit key={index} localStorageIndex={index} initialSubreddit={initialSubreddit} />
          })}

          {componentList}

          <div className='add-subreddit'>
            <Addsub addSubbreddit={addSubbreddit} />
          </div>


        </div>

      </div>

    </div >
  );
}

export default App;