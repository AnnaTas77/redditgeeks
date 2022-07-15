import React, { useState, useEffect } from 'react';
import Search from '../search/Search';
import Article from "../article/Article";
// import './subreddit.css';


function SubredditsBlock(props) {

    const [articles, setArticles] = useState([]);
    const [subredditContainer, setSubredditContainer] = useState(props.defaultSubreddit);

    useEffect(() => {
        function fetchSubredit() {
            fetch(`https://www.reddit.com/r/${subredditContainer}.json`).then(response => {
                if (!response.ok) {
                    throw Error('Could not fetch the data for that resourse.')
                }
                return response.json();

            }).then(data => {
                // console.log('Children nested in Data: ', data.data.children);
                const myArticles = [];
                data.data.children.forEach(child => {
                    const myArticle = {
                        title: child.data.title,
                        link: child.data.permalink,
                        author: child.data.author,
                        comments: child.data.num_comments,
                        timestamp: child.data.created_utc
                    };
                    myArticles.push(myArticle);

                });
                setArticles(myArticles);

            }).catch(err => {
                console.log(err)
            });
        }
        const timeOutId = setTimeout(() => fetchSubredit(), 1000);
        const destructor = () => clearTimeout(timeOutId);
        return destructor;
    }, [subredditContainer]);


    const onChange = (e) => {
        setSubredditContainer(e.currentTarget.value);
    };


    return (
        <div className='subreddits-block'>
            <div className='article-background'>
                <div className='articles-container'>
                    <Search subreddit={subredditContainer} onChange={onChange} />
                    <div className='articles-box'>
                        {
                            (articles !== null) ? articles.map((article, index) =>

                                < Article key={index} article={article} />
                            ) : ''
                        }
                    </div>

                </div>
            </div>

        </div>
    )

}

export default SubredditsBlock;