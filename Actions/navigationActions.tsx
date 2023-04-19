export const setFooterItem = (footerItem: number) => ({
    type: 'SET_FOOTER_ITEM',
    payload: footerItem,
});

export const setInEditingMode = (inEditingMode: boolean) => ({
    type: 'SET_IN_EDITING_MODE',
    payload: inEditingMode,
});

export const setEditScreenNo = (editScreenNo: number) => ({
    type: 'SET_EDIT_SCREEN_NO',
    payload: editScreenNo,
});

export const setCashAmtForRecharge = (cashAmtForRecharge: string) => ({
    type: 'SET_CASH_AMT_FOR_RECHARGE',
    payload: cashAmtForRecharge,
});

