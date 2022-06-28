import React from "react";

function Article(props) {

    const myDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    myDate.setUTCSeconds(props.article.timestamp);

    return (
        <article className='article'>
            <div className="card-header">
                <a className="article-title" href={`https://www.reddit.com/${props.article.link}`}>
                    <h3>{props.article.title}</h3>
                </a>

                <div className="article-author">
                    <h4>Posted by <span><a href={`https://www.reddit.com/user/${props.article.author}`}>
                        <span className="author-name">{props.article.author}</span>
                    </a>
                    </span>
                    </h4>
                </div>
            </div>

            <p className="article-text">{props.article.text}</p>

            <div className="card-footer">
                <div className="comment-box">
                    <i className="fa-solid fa-message"></i>
                    <span className="comment-text">Comments: {props.article.comments} </span>

                </div>
                <div className="date-box">
                    {myDate.toLocaleDateString("en-UK")}
                </div>

            </div>
        </article>
    )
}

export default Article;