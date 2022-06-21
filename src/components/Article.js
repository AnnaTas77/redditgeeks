import React from "react";

function Article(props) {

    return (

        < div >
            <a href={`https://www.reddit.com/${props.article.permalink}`}>
                <h3>{props.article.title}</h3>
            </a>
        </div >
    )
}

export default Article;