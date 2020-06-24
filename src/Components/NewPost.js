import React from 'react';

class NewPost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            textPost:'',
            titleError:'',
            postError:''
        };
    }

    sendData = () => {
        this.props.parentCallback(1);
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) {
            this.submitPost();
        } 
    }

    validation(){
        if(this.state.title == '' && this.state.textPost == ''){
            this.setState({
                titleError: "Field is required",
                postError: "Field is required"
            });
            return false;
        }
        if(this.state.title == ''){
            this.setState({
                titleError: "Field is required"
            });
            return false;
        }
        if(this.state.textPost == ''){
            this.setState({
                postError: "Field is required"
            });
            return false;
        }

        return true;
    }

    removeErrorMessage(){
        this.setState({
            titleError:'',
            postError:''
        })
    }

    submitPost(){
        this.removeErrorMessage();
        if(this.validation()){
            let data = {
                "title": this.state.title,
                "post": this.state.textPost
             }
            let url = 'http://localhost:3000/posts';
            fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then((res => {
                res.json().then((data) => {
                    console.log("response", data);
                    this.sendData();
                    this.setState ({
                        title: '',
                        textPost:''
                    });
                })
            }))
        }
    }

    render(){
        return(
            <div>
                {/* <form onSubmit={this.handleSubmit}> */}
                    <div>
                        <input 
                            className="com-width post-input" 
                            type="text" placeholder="Title" 
                            value={this.state.title} 
                            onChange={(e)=>{this.setState({title:e.target.value})}}
                            onKeyPress={this.enterPressed.bind(this)}
                        />
                        <p style={{color:"red"}}>{this.state.titleError}</p>
                    </div>
                    <div style={{paddingTop: "10px"}}>
                        <textarea 
                            className="com-width" 
                            placeholder="Type something..." rows="8"
                            value={this.state.textPost} 
                            onChange={(e)=>{this.setState({textPost:e.target.value})}}
                            onKeyPress={this.enterPressed.bind(this)}
                        >
                        </textarea>
                        <p style={{color:"red"}}>{this.state.postError}</p>
                    </div>
                    <button className="form-field" onClick={()=>this.submitPost()}>Post</button>
                {/* </form> */}
            </div>
        )
    }
}

export default NewPost;