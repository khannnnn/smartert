import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../Actions';

class PostList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allPost: []
        }
    }

    componentDidMount(){
        console.log("Parent Data: ", this.props.dataFromParent)
        console.log("Hello", this.props.postListData)
        if(this.props.postListData.length > 0){
            this.setState({
                allPost: this.props.postListData
            })
        } else {
            this.submitPost();
        }
    }

    submitPost(){
        console.log("Form data: ", this.state);
        let url = 'http://localhost:3000/posts';
        fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((res => {
            res.json().then((data) => {
                console.log("response", data);
                if(data){
                    this.setState({
                        allPost: data
                    })
                    this.props.postListAction(data);
                }
            })
        }))
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Title</th>
                            <th>Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.allPost.length > 0 ?
                             this.state.allPost.map((item, index)=>
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.post}</td>
                                </tr>
                            )
                            : null
                        }
                        
                    </tbody>
                </table>

            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    postListAction: (data) => dispatch(actions.postList(data))
})

const mapStateToProps = state =>({
    postListData: state.postList
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList);