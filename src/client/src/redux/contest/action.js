import {
    SET_CONTEST_END_TIME,
    UPDATE_CONTEST_TIME
} from "./actionTypes";

export const setContestEndTime = (payload) => ({
    type: SET_CONTEST_END_TIME,
    payload
})

export const updateTime = () => ({
    type: UPDATE_CONTEST_TIME,
})
