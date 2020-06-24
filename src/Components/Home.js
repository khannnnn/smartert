import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import NewPost from './NewPost';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            updatePostList: 0,
            allPost: [],
            createPost: false,
            postList: false
        }
    }

    callbackFunction = (childData) => {
        this.submitPost();
    }

    callbackFunctionHeader = (childData) => {
        if (childData != '') {
            this.searchPost(childData);
        } else {
            this.submitPost();
        }
    }

    createPost() {
        this.setState({
            createPost: !this.state.createPost
        })
    }

    postList() {
        this.setState({
            postList: !this.state.postList
        })
    }

    componentDidMount() {
        if (this.props.postListData.length > 0) {
            this.setState({
                allPost: this.props.postListData
            })
        } else {
            this.submitPost();
        }
    }

    searchPost(childData) {
        let url = 'http://localhost:3000/posts?title=' + childData;
        fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((res => {
            res.json().then((data) => {
                console.log("response", data);
                if (data) {
                    this.setState({
                        allPost: data
                    })
                    this.props.postListAction(data);
                }
            })
        }))
    }

    submitPost() {
        let url = 'http://localhost:3000/posts';
        fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((res => {
            res.json().then((data) => {
                console.log("response", data);
                if (data) {
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
                <Header parentCallbackHeader={this.callbackFunctionHeader} />
                <div className="post">
                    <div className="post-main">
                        <div className="center-div">
                            <button className="form-field"
                                onClick={() => this.createPost()}
                            >
                                New Post</button>
                        </div>
                        <div className="center-div">
                            <button
                                className="form-field"
                                onClick={() => this.postList()}
                            >Published</button>
                        </div>
                    </div>
                </div>
                <div className="main-home" >
                    <div className="sub-home">
                        <div className="left-div" style={{ paddingRight: "20px" }}>
                            {
                                this.state.createPost ?
                                    <NewPost parentCallback={this.callbackFunction} />
                                    : null
                            }

                        </div>
                        <div className="left-div" style={{ paddingLeft: "20px" }}>
                            {
                                this.state.postList ?
                                    <div>
                                        <table className="tbody">
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Title</th>
                                                    <th>Post</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {

                                                    this.state.allPost.length > 0 ?
                                                        this.state.allPost.map((item, index) =>
                                                            <tr key={index + 1}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.post}</td>
                                                            </tr>
                                                        )
                                                        :
                                                        <tr>
                                                            <td colSpan="3">No Record found..</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    postListAction: (data) => dispatch(actions.postList(data))
})

const mapStateToProps = state => ({
    postListData: state.postList
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
