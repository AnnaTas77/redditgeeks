import React, { useState, useEffect } from 'react';
import Article from './components/Article';


function App() {

  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('Frontend');

  useEffect(() => {

    fetch(`https://www.reddit.com/r/${subreddit}.json`).then(
      response => {
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
              const myArticles = []
              data.data.children.forEach(child => {
                const myArticle = {
                  title: child.data.title,
                  link: child.data.permalink,
                  text: child.data.selftext,
                  author: child.data.author,
                  comments: child.data.num_comments,
                  timestamp: child.data.created_utc
                };
                myArticles.push(myArticle);

              });
              setArticles(myArticles);
            }
          });

      });
  }, [subreddit]);

  const onChange = (e) => {
    setSubreddit(e.currentTarget.value);
  };

  return (
    <div className="container">
      <nav className="nav-container">
        <input type="text" className="searchbar" value={subreddit} onChange={onChange}></input>
        <i className="fa-solid fa-magnifying-glass"></i>
      </nav>
      <div className='articles'>
        {
          (articles !== null) ? articles.map((article, index) =>
            < Article key={index} article={article} />
          ) : ''
        }
      </div>
    </div>
  );
}

export default App;