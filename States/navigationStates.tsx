export type StateType = {
    // Define the state type for reducer2
    footerItem: number,
    inEditingMode: boolean,
    editScreenNo: number,
    cashAmtForRecharge: string
}
const initialState: StateType = {
    footerItem: 1,
    inEditingMode: false,
    editScreenNo: 1,
    cashAmtForRecharge: '0'
    // Add more state variables as needed
};

const navigationReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'SET_FOOTER_ITEM':
            return { ...state, footerItem: action.payload };
        case 'SET_IN_EDITING_MODE':
            return { ...state, inEditingMode: action.payload };
        case 'SET_EDIT_SCREEN_NO':
            return { ...state, editScreenNo: action.payload };
        case 'SET_CASH_AMT_FOR_RECHARGE':
            return { ...state, cashAmtForRecharge: action.payload };
        // Add more cases for other state variables as needed
        default:
            return state;
    }
};

export default navigationReducer;
