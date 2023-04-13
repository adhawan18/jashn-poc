// actions/loginActions.ts
export const setShowMainScreen = (showMainScreen: boolean) => ({
    type: 'SET_SHOW_MAIN_SCREEN',
    payload: showMainScreen,
});

export const setOtpSent = (otpSent: boolean) => ({
    type: 'SET_OTP_SENT',
    payload: otpSent,
});