import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { updateTime } from "../../redux/contest/action"
import { Redirect } from 'react-router-dom';

const TimeLeft = ({timeLeft, contestStatus, updateTime, hours,min,sec}) => {
    const [live, setLive] = useState(false)
    console.log(timeLeft, contestStatus, live)
    if(contestStatus==="live" && !live)
        setLive(true)
    useEffect(()=>{
        console.log('setting time')
        var timer = setInterval(()=>{
            console.log('updating')
            updateTime()
        },1000)
        var clear = setTimeout(()=>{
            console.log('timed out')
            clearInterval(timer)
        },(timeLeft+1)*1000)
        return ()=>{
            clearInterval(timer)
            clearTimeout(clear)
        }
    },[live])
    if(contestStatus==="ended")
        return(
            <div className="btn btn-success active p-2 m-2">
                ENDED
            </div>
        )
    if(contestStatus==="not_started")
        return(
        <>
            {/* <Redirect to="/dashboard" /> */}
            <div className="btn btn-success active p-2 m-2">
                NOT BEGUN
            </div>
        </>
        )
    return (
        <div className="btn btn-dark active p-2 m-2">
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
})

const mapDispatchToProps = dispatch => ({
    updateTime: () => dispatch(updateTime())
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeLeft);
