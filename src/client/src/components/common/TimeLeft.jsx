import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { updateTime } from "../../redux/contest/action"
import { Redirect } from 'react-router-dom';

const TimeLeft = ({timeLeft, contestStatus, updateTime, hours, min, sec, userType}) => {
    const [live, setLive] = useState(false)
    if(contestStatus==="live" && !live)
        setLive(true)
    useEffect(()=>{
        var timer = setInterval(()=>{
            updateTime()
        },1000)
        var clear = setTimeout(()=>{
            clearInterval(timer)
        },(timeLeft+1)*1000)
        return ()=>{
            clearInterval(timer)
            clearTimeout(clear)
        }
    },[live])
    if(contestStatus==="pending")
        return(
            <div className="btn btn-dark active p-2">
                PENDING
            </div>
        )
    if(contestStatus==="ended")
        return(
            <div className="btn btn-danger active p-2">
                ENDED
            </div>
        )
    if(contestStatus==="not_started"&&userType!="admin"){
        alert("contest has not started")
        return(
        <>
            <Redirect to="/dashboard" />
            <div className="btn btn-success active p-2">
                NOT BEGUN
            </div>
        </>
        )
    }
    return (
        <div className="btn btn-dark active p-2">
            { hours>0?(hours>10?(hours):("0"+hours)):("00") }:
            { min>0?(min>10?(min):("0"+min)):("00") }:
            { sec>0?(sec>10?(sec):("0"+sec)):("00") }
        </div>
    )
}

const mapStateToProps = state => ({
    timeLeft: state.contest.endTimeLeft,
    contestStatus: state.contest.contestStatus,
    hours: state.contest.hours,
    min: state.contest.min,
    sec: state.contest.sec,
    userType: state.authReducer.userType
})

const mapDispatchToProps = dispatch => ({
    updateTime: () => dispatch(updateTime())
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeLeft);
