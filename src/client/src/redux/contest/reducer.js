import { 
    SET_CONTEST_END_TIME, 
    UPDATE_CONTEST_TIME, 
    CONTEST_END,
    CONTEST_NOT_STARTED,
    CONTEST_START,
    CONTEST_RESET
} from "./actionTypes"

const initialState = {
    contestName:"",
    contestId:"",
    contestStatus: null,
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
            contestStatus: "live",
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
    case CONTEST_END:
        return {
            ...state,
            endTimeLeft: 0,
            contestStatus: "ended"
        }
    case CONTEST_START:
        return {
            ...state,
            contestStatus: "live"
        }
    case CONTEST_NOT_STARTED:
        return {
            ...state,
            contestStatus: "not_started"
        }
    case CONTEST_RESET:
        return {
            ...state,
            contestStatus: "pending"
        }
    default:
        return state
    }
}
