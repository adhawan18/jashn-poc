export const setIsHost = (isHost: boolean) => ({
    type: 'SET_IS_HOST',
    payload: isHost,
});

export const setRemoteUid = (remoteUid: number) => ({
    type: 'SET_REMOTE_UID',
    payload: remoteUid,
});