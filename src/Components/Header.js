import React from 'react';

class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            SearchText:''
        }
    }

    sendData = (value) => {
        this.setState({SearchText:value})
        this.props.parentCallbackHeader(value);
    }

    clearText(){
        this.setState({SearchText:''})
        this.props.parentCallbackHeader('');
    }

    render(){
        return(
            <div>
                <div className="form-main">
                    {/* <form> */}
                        <div>
                            <input 
                                className="form-field" 
                                type="text" placeholder="Search Title" 
                                onChange={(e)=>{this.sendData(e.target.value)}}
                                value={this.state.SearchText}
                            />
                            <button className="form-field" onClick={()=>this.clearText()}>&#10005;</button>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        )
    }
}

export default Header;