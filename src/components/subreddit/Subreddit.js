import React from "react";
import Article from "../article/Article";

function SubredditsBlock(props) {

    return (
        <div className='articles-container'>
            {
                (props.articles !== null) ? props.articles.map((article, index) =>
                    < Article key={index} article={article} />
                ) : ''
            }
        </div>
    )

}

export default SubredditsBlock;