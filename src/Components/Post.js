import React from 'react';

class Post extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="post">
                    <div className="post-main">
                        <div className="center-div">
                            <button className="form-field" 
                            >
                            New Post</button>
                        </div>
                    <div className="center-div">
                        <button 
                            className="form-field"
                        >Published</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;