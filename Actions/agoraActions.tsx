export const setIsHost = (isHost: boolean) => ({
    type: 'SET_IS_HOST',
    payload: isHost,
});

export const setRemoteUid = (remoteUid: number) => ({
    type: 'SET_REMOTE_UID',
    payload: remoteUid,
});

export const setChannelMembers = (channelMembers: string) => ({
    type: 'SET_CHANNEL_MEMBERS',
    payload: channelMembers,
});