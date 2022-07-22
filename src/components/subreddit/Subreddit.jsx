import React, { useState, useEffect } from 'react';
import Search from '../search/Search';
import Article from "../article/Article";
import './subreddit.css';


function SubredditsBlock(props) {

    const [subredditContainer, setSubredditContainer] = useState(props.initialSubreddit);
    const [articles, setArticles] = useState([]);


    useEffect(() => {
        function fetchSubredit() {
            fetch(`https://www.reddit.com/r/${subredditContainer}.json`).then(response => {
                // console.log(response)
                if (!response.ok) {
                    throw Error('Could not fetch the data for that resourse.')
                }
                return response.json();

            }).then(data => {
                // console.log('Children nested in Data: ', data.data.children);
                const myArticles = [];
                data.data.children.forEach(child => {
                    const myArticle = {
                        subreddit: child.data.subreddit,
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

        const currentSubs = localStorage.getItem("favouriteSubs")
        if (currentSubs === null) {
            console.log("Empty storage.")
        } else {
            let newSubs = JSON.parse(currentSubs)
            newSubs[props.localStorageIndex] = e.currentTarget.value
            localStorage.setItem("favouriteSubs", JSON.stringify(newSubs))
            console.log("Storing in local storage.")
        }
    };


    const onDelete = () => {
        props.deleteSubreddit(props.localStorageIndex)
    }

    return (
        <div className='subreddits-block'>
            <div className='articles-container'>
                <Search subreddit={subredditContainer} onChange={onChange} onDelete={onDelete} />
                <div className='articles-box'>
                    {
                        (articles.length > 0) ? articles.map((article, index) =>

                            < Article key={index} article={article} />
                        ) : <div className='loading'>Loading articles...</div>
                    }
                </div>

            </div>
        </div>
    )

}

export default SubredditsBlock;