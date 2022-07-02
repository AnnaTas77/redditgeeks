import React, { useState, useEffect } from 'react';
import Search from '../search/Search';
import Article from "../article/Article";

function SubredditsBlock(props) {

    const [articles, setArticles] = useState([]);
    const [subreddit, setSubreddit] = useState(props.defaultSubreddit);

    const fetchSubredit = () => {
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
                            const myArticles = [];
                            data.data.children.forEach(child => {
                                const myArticle = {
                                    title: child.data.title,
                                    link: child.data.permalink,
                                    // text: child.data.selftext,
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
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => fetchSubredit(), 1000);
        const destructor = () => clearTimeout(timeOutId);
        return destructor;
    }, [subreddit]);

    const onChange = (e) => {
        setSubreddit(e.currentTarget.value);
    };


    return (
        <div className='subreddits-block'>
            <Search subreddit={subreddit} onChange={onChange} />
            <div className='articles-container'>
                {
                    (articles !== null) ? articles.map((article, index) =>
                        < Article key={index} article={article} />
                    ) : ''
                }
            </div>
        </div>
    )

}

export default SubredditsBlock;