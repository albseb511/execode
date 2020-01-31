import {
    SET_CONTEST_END_TIME,
    UPDATE_CONTEST_TIME,
    CONTEST_NOT_STARTED,
    CONTEST_START,
    CONTEST_END,
    CONTEST_RESET
} from "./actionTypes";

export const setContestEndTime = (payload) => ({
    type: SET_CONTEST_END_TIME,
    payload
})

export const updateTime = () => ({
    type: UPDATE_CONTEST_TIME,
})

export const contestStart = (payload) => ({
    type: CONTEST_START,
    payload
})

export const contestEnded = (payload) => ({
    type: CONTEST_END,
    payload
})

export const contestNotStarted = (payload) => ({
    type: CONTEST_NOT_STARTED,
    payload
})

export const contestReset = (payload) => ({
    type: CONTEST_RESET,
    payload
})

