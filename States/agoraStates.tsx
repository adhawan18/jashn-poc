export type StateType = {
    // Define the state type for reducer2
    isHost: boolean,
    remoteUid: Number,
    channelMembers: string,
}
const initialState: StateType = {
    isHost: false,
    remoteUid: 0,
    channelMembers: '0',
    // Add more state variables as needed
};

const agoraReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'SET_IS_HOST':
            return { ...state, isHost: action.payload };
        case 'SET_REMOTE_UID':
            return { ...state, remoteUid: action.payload };
        case 'SET_CHANNEL_MEMBERS':
                return { ...state, channelMembers: action.payload };
        // Add more cases for other state variables as needed
        default:
            return state;
    }
};

export default agoraReducer;
