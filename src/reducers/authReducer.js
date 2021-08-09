import {GET_AUTH_STATE} from '../CONSTANT/types';

const initialState = {
    auth:false,
    user: null,
    userType: null,
}

const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_AUTH_STATE:
            return{
                ...state,
                auth: action.payload.auth,
                user: action.payload.user,
                userType: action.payload.accountType
            }
        default: 
        return state;
    }
}

export default authReducer