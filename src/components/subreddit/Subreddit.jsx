import React, { useState, useEffect } from 'react';
import Search from '../search/Search';
import Article from "../article/Article";
import './subreddit.css';
import swal from 'sweetalert';


function SubredditsBlock(props) {

    const [subredditName, setSubredditName] = useState(props.initialSubreddit);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const [errorState, setErrorState] = useState(null);

    const persistNewSubredditName = (index, newSubreditName) => {
        const currentSubs = localStorage.getItem("favouriteSubs");
        if (currentSubs === null) {
            console.log("Empty storage.")
        } else {
            let newSubs = JSON.parse(currentSubs);
            newSubs[index] = newSubreditName;
            localStorage.setItem("favouriteSubs", JSON.stringify(newSubs));
            console.log("Storing in local storage.");
        }
    }

    const loadPersistedSubredditName = (index) => {
        const currentSubs = localStorage.getItem("favouriteSubs");
        if (currentSubs === null) {
            console.log("Empty storage.")
        } else {
            let currentSubsArray = JSON.parse(currentSubs);
            return currentSubsArray[index];
        }
    }

    useEffect(() => {
        function fetchSubredit() {
            fetch(`https://www.reddit.com/r/${subredditName}.json`).then(response => {

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
                        timestamp: child.data.created_utc
                    };
                    myArticles.push(myArticle);
                });

                setArticles(myArticles);
                setIsLoading(false);
                persistNewSubredditName(props.localStorageIndex, subredditName);

            }).catch(err => {
                swal("This subreddit doesn't exist.");
                setIsLoading(false);
                const persistedSubredditName = loadPersistedSubredditName(props.localStorageIndex);
                setSubredditName(persistedSubredditName);
                console.log(err);
            });
        }
        setIsLoading(true);
        const timeOutId = setTimeout(() => fetchSubredit(), 1000);
        const destructor = () => clearTimeout(timeOutId);
        return destructor;
    }, [subredditName]);


    const onChange = (e) => {
        const userInput = e.currentTarget.value;

        if (userInput.length <= 20) {
            setSubredditName(userInput);
        } else {
            swal("Please provide up to 20 characters.");
        }
    };

    const onDelete = () => {
        props.deleteSubreddit(props.localStorageIndex)
    }


    return (
        <div className='subreddits-block col'>
            <div className='articles-container'>
                <Search subreddit={subredditName} onChange={onChange} onDelete={onDelete} />
                <div className='articles-box'>
                    {
                        (isLoading)
                            ? <div className='loading'>Loading...</div>
                            : articles.map((article, index) => <Article key={index} article={article} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default SubredditsBlock;