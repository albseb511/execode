import { SET_CONTEST_END_TIME, UPDATE_CONTEST_TIME } from "./actionTypes"

const initialState = {
    contestName:"",
    contestId:"",
    contestLive: false,
    endTimeLeft: 0,
    hours:0,
    min:0,
    sec:0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_CONTEST_END_TIME:
        return { 
            ...state,
            contestName: payload.contestName,
            contestId: payload.contestId,
            contestLive: true,
            endTimeLeft: payload.endTimeLeft
        }
    case UPDATE_CONTEST_TIME:
        let newTime = state.endTimeLeft - 1
        let timeLeftSec = parseInt(newTime);
        let sec = timeLeftSec%60;
        let min = parseInt((timeLeftSec/60)%60)
        let hours = parseInt((timeLeftSec/(60*60)))
        return {
            ...state,
            endTimeLeft: newTime,
            hours,
            min,
            sec

        }
    default:
        return state
    }
}
