const postList = (state = [], action) =>{
    switch(action.type){
        case "POSTLIST":
            return action.payload;
        default:
            return state;
    }
}

export default postList;