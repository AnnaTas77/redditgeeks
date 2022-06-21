import React, { useState, useEffect } from 'react';
import Article from './components/Article';


function App() {

  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('webdev');

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`).then(
      response => {
        console.log('LOGGED RESPONSE: ', response);

        if (response.status !== 200) {
          console.log('ERROR!')
          return;
        }

        const jsonResponse = response.json();
        // Returns a promise
        // console.log('JSON RESPONSE: ', jsonResponse);

        jsonResponse.then(
          data => {
            // console.log('DATA from the Json Response: ', data);
            console.log('Children nested in Data: ', data.data.children);

            if (data != null) {
              setArticles(data.data.children);
            }
          })
      })
  }, [subreddit]);

  const onChange = (e) => {
    setSubreddit(e.currentTarget.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className="input" value={subreddit} onChange={onChange}></input>
      </header>
      <div className='articles'>
        {
          (articles !== null) ? articles.map((article, index) =>
            < Article key={index} article={article.data} />
          ) : ''
        }
      </div>
    </div>
  );
}

export default App;
