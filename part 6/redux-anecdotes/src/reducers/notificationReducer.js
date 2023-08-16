import { createSlice } from "@reduxjs/toolkit";
const initialState = ""

const notificationSlicer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            const notification = action.payload;
            return notification;
        },
        resetNotification(state, action) {
            return null;
        }
    }
});

export const { createNotification, resetNotification } = notificationSlicer.actions;

export default notificationSlicer.reducer;

export const setNotification = (message, timeout) => (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
        dispatch(resetNotification());
    }, timeout);
};
