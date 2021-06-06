import { SET_MESSAGE, CLEAR_MESSAGE } from "../constants/actionType";

const initialState = {};

const Message = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { msg: payload };

        case CLEAR_MESSAGE:
            return { msg: "" };

        default:
            return state;
    }
}

export default Message;