import React, { useState, useEffect } from 'react';
import Search from '../search/Search';
import Article from "../article/Article";
import './subreddit.css';
import swal from 'sweetalert';


function SubredditBlock(props) {

    const [subredditName, setSubredditName] = useState(props.initialSubreddit);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const persistNewSubredditName = (index, newSubredditName) => {
        const currentSubs = localStorage.getItem("favouriteSubs");
        if (currentSubs === null) {
            console.log("Empty storage.")
        } else {
            let newSubs = JSON.parse(currentSubs);
            newSubs[index] = newSubredditName; //overwrites previous existing subreddit on this position(index)
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
        function fetchSubreddit() {
            fetch(`https://www.reddit.com/r/${subredditName}.json`).then(response => {

                if (!response.ok) {
                    throw Error('Could not fetch the data for that resource.')
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
                setIsLoading(false);
                props.onError(subredditName);
                swal("This subreddit doesn't exist.");

                const persistedSubredditName = loadPersistedSubredditName(props.localStorageIndex);
                setSubredditName(persistedSubredditName); // sets the current subreddit name to the previous valid value
                console.log(err);
            });
        }
        setIsLoading(true);
        const timeOutId = setTimeout(() => fetchSubreddit(), 1000);
        const destructor = () => clearTimeout(timeOutId);
        return destructor;
    }, [subredditName]);


    const onChange = (e) => {
        const storedSubs = JSON.parse(localStorage.getItem("favouriteSubs"));
        const userInput = e.currentTarget.value;
        const lowCaseUserInput = userInput.toLowerCase();

        if (storedSubs.includes(lowCaseUserInput)) {
            const capitalizedSub = lowCaseUserInput.charAt(0).toUpperCase() + lowCaseUserInput.slice(1);
            swal({
                title: `"${capitalizedSub}" already exists.`,
            });
            setSubredditName("");
            return;
        } else {
            if (lowCaseUserInput.length <= 20) {
                setSubredditName(lowCaseUserInput);
            } else {
                swal("Please provide up to 20 characters.");
            }
        }
    };

    const onDelete = () => {
        props.deleteSubreddit(props.localStorageIndex)
    }


    return (
        <div className='subreddit-block'>
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

export default SubredditBlock;