// actionTypes.ts
export const SET_IS_JOINED = 'SET_IS_JOINED';
export const SET_QUESTION_RCVD = 'SET_QUESTION_RCVD';
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER';
export const SET_OPTIONS_RCVD = 'SET_OPTIONS_RCVD';
export const SET_SHOWING_QUESTION = 'SET_SHOWING_QUESTION';
export const SET_RIGHT_ANSWER = 'SET_RIGHT_ANSWER';
export const SET_ANSWERED_RIGHT = 'SET_ANSWERED_RIGHT';
export const SET_HAVE_ANSWERED = 'SET_HAVE_ANSWERED';
export const SET_SELECTED_BUTTON = 'SET_SELECTED_BUTTON';
export const SET_QUESTION_SCREEN_TYPE = 'SET_QUESTION_SCREEN_TYPE';
export const SET_MARK_ANSWERS = 'SET_MARK_ANSWERS';
export const SET_START_TIME = 'SET_START_TIME';
export const SET_END_TIME = 'SET_END_TIME';
export const SET_TIME_DIFFERENCE = 'SET_TIME_DIFFERENCE';
export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_SHOW_LEADERBOARD = 'SET_SHOW_LEADERBOARD';
export const SET_IN_SPOTLIGHT = 'SET_IN_SPOTLIGHT';
export const SET_WRITING_CHAT = 'SET_WRITING_CHAT';
export const SET_CHAT_ARR = 'SET_CHAT_ARR';
export const SET_NEXT_CHAT_ID = 'SET_NEXT_CHAT_ID';

export type StateType = {
    isJoined: boolean;
    questionRcvd: string;
    selectedAnswer: string;
    optionsRcvd: string[];
    showingQuestion: boolean;
    rightAnswer: string;
    answeredRight: boolean;
    haveAnswered: boolean;
    selectedButton: {
        backgroundColor: string;
    };
    questionScreenType: number;
    markAnswers: boolean;
    startTime: number | null;
    endTime: number | null;
    timeDifference: number | null;
    progress: number;
    showLeaderboard: boolean;
    inSpotlight: boolean;
    writingChat: boolean;
    chatArr: {
        id: number;
        name: string;
        avatar: string;
        msg: string;
    }[];
    nextChatId: number;
};


const initialState: StateType = {
    isJoined: false,
    questionRcvd: '',
    selectedAnswer: '',
    optionsRcvd: [],
    showingQuestion: false,
    rightAnswer: '',
    answeredRight: false,
    haveAnswered: false,
    selectedButton: { backgroundColor: '#f82d87' },
    questionScreenType: 0,
    markAnswers: false,
    startTime: null,
    endTime: null,
    timeDifference: null,
    progress: 0,
    showLeaderboard: false,
    inSpotlight: false,
    writingChat: false,
    chatArr: [
        {
            id: 0,
            name: 'Jashn',
            avatar: 'https://i.ibb.co/Zh34Cb3/jChAT.jpg',
            msg: 'Get ready for the fun to begin!',
        },
    ],
    nextChatId: 1,
};

const gameReducer = (state = initialState, action: { type: any; payload: any; }): StateType => {
    switch (action.type) {
        case SET_IS_JOINED:
            return { ...state, isJoined: action.payload };
        case SET_QUESTION_RCVD:
            return { ...state, questionRcvd: action.payload };
        case SET_SELECTED_ANSWER:
            return { ...state, selectedAnswer: action.payload };
        case SET_OPTIONS_RCVD:
            return { ...state, optionsRcvd: action.payload };
        case SET_SHOWING_QUESTION:
            return { ...state, showingQuestion: action.payload };
        case SET_RIGHT_ANSWER:
            return { ...state, rightAnswer: action.payload };
        case SET_ANSWERED_RIGHT:
            return { ...state, answeredRight: action.payload };
        case SET_HAVE_ANSWERED:
            return { ...state, haveAnswered: action.payload };
        case SET_SELECTED_BUTTON:
            return { ...state, selectedButton: action.payload };
        case SET_QUESTION_SCREEN_TYPE: {
            console.log("questionScreenType63",  action.payload);
            return { ...state, questionScreenType: action.payload };
        }
        case SET_MARK_ANSWERS:
            return { ...state, markAnswers: action.payload };
        case SET_START_TIME:
            return { ...state, startTime: action.payload };
        case SET_END_TIME:
            return { ...state, endTime: action.payload };
        case SET_TIME_DIFFERENCE:
            return { ...state, timeDifference: action.payload };
        case SET_PROGRESS:
            return { ...state, progress: action.payload };
        case SET_SHOW_LEADERBOARD:
            return { ...state, showLeaderboard: action.payload };
        case SET_IN_SPOTLIGHT:
            return { ...state, inSpotlight: action.payload };
        case SET_WRITING_CHAT:
            return { ...state, writingChat: action.payload };
        case SET_CHAT_ARR:
            return { ...state, chatArr: action.payload };
        case SET_NEXT_CHAT_ID:
            return { ...state, nextChatId: action.payload };
        case 'INCREMENT_PROGRESS': {
            const newProgress = state.progress + 1;
            console.log("newProgress", newProgress);
            return { ...state, progress: newProgress };
        }
        case 'INCREMENT_CHAT_ID': {
            const newChatId = state.nextChatId + 1;
            return { ...state, nextChatId: newChatId };
        }
        case 'UPDATE_CHAT_ARR': {
            let updatedState = [...state.chatArr, action.payload];
            if (updatedState.length >= 25) {
                updatedState.shift();
            }
            return { ...state, chatArr: updatedState };
        }


        default:
            return state;
    }
}

export default gameReducer;