// actions/gameActions.ts

export const setIsJoined = (isJoined: boolean) => ({
  type: 'SET_IS_JOINED',
  payload: isJoined,
});

export const setQuestionRcvd = (questionRcvd: string) => ({
  type: 'SET_QUESTION_RCVD',
  payload: questionRcvd,
});

export const setSelectedAnswer = (selectedAnswer: string) => ({
  type: 'SET_SELECTED_ANSWER',
  payload: selectedAnswer,
});

export const setOptionsRcvd = (optionsRcvd: string[]) => ({
  type: 'SET_OPTIONS_RCVD',
  payload: optionsRcvd,
});

export const setShowingQuestion = (showingQuestion: boolean) => ({
  type: 'SET_SHOWING_QUESTION',
  payload: showingQuestion,
});

export const setRightAnswer = (rightAnswer: string) => ({
  type: 'SET_RIGHT_ANSWER',
  payload: rightAnswer,
});

export const setAnsweredRight = (answeredRight: boolean) => ({
  type: 'SET_ANSWERED_RIGHT',
  payload: answeredRight,
});

export const setHaveAnswered = (haveAnswered: boolean) => ({
  type: 'SET_HAVE_ANSWERED',
  payload: haveAnswered,
});

export const setSelectedButton = (selectedButton: {}) => ({
  type: 'SET_SELECTED_BUTTON',
  payload: selectedButton,
});

export const setQuestionScreenType = (questionScreenType: number) => ({
  type: 'SET_QUESTION_SCREEN_TYPE',
  payload: questionScreenType,
});

export const setMarkAnswers = (markAnswers: boolean) => ({
  type: 'SET_MARK_ANSWERS',
  payload: markAnswers,
});

export const setStartTime = (startTime: number | null) => ({
  type: 'SET_START_TIME',
  payload: startTime,
});

export const setEndTime = (endTime: number | null) => ({
  type: 'SET_END_TIME',
  payload: endTime,
});

export const setTimeDifference = (timeDifference: number | null) => ({
  type: 'SET_TIME_DIFFERENCE',
  payload: timeDifference,
});

export const setProgress = (progress: number) => ({
  type: 'SET_PROGRESS',
  payload: progress,
});

export const setShowLeaderboard = (showLeaderboard: boolean) => ({
  type: 'SET_SHOW_LEADERBOARD',
  payload: showLeaderboard,
});

export const setInSpotlight = (inSpotlight: boolean) => ({
  type: 'SET_IN_SPOTLIGHT',
  payload: inSpotlight,
});

export const setWritingChat = (writingChat: boolean) => ({
  type: 'SET_WRITING_CHAT',
  payload: writingChat,
});

export const setChatArr = (chatArr: [{}]) => ({
  type: 'SET_CHAT_ARR',
  payload: chatArr,
});

export const setNextChatId = (nextChatId: number) => ({
  type: 'SET_NEXT_CHAT_ID',
  payload: nextChatId,
});

export const incrementProgress = () => ({
  type: 'INCREMENT_PROGRESS',
});

export const incrementChatId = () => ({
  type: 'INCREMENT_CHAT_ID',
});

export const updateChatArr = (tempMsgEle: object) => ({
  type: 'UPDATE_CHAT_ARR',
  payload: tempMsgEle,
});

