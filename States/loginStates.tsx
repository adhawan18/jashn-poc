export type StateType = {
    // Define the state type for reducer2
    showMainScreen: boolean,
    otpSent: boolean,
}
const initialState:StateType = {
    showMainScreen: false,
    otpSent: false,
    // Add more state variables as needed
};

const loginReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'SET_SHOW_MAIN_SCREEN':
            return { ...state, showMainScreen: action.payload };
        case 'SET_OTP_SENT':
            return { ...state, otpSent: action.payload };
        // Add more cases for other state variables as needed
        default:
            return state;
    }
};

export default loginReducer;
