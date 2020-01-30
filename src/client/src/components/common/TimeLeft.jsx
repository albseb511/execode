import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { updateTime } from "../../redux/contest/action"

const TimeLeft = ({timeLeft, contestLive, updateTime, hours,min,sec}) => {
    const [live, setLive] = useState(false)
    if(contestLive && !live)
        setLive(true)
    useEffect(()=>{
        var timer = setInterval(()=>{
            updateTime()
        },1000)
        var clear = setTimeout(()=>clearInterval(timer),(timeLeft+1)*1000)
        return ()=>{
            clearInterval(timer)
            clearTimeout(clear)
        }
    },[live])
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
    contestLive: state.contest.contestLive,
    hours: state.contest.hours,
    min: state.contest.min,
    sec: state.contest.sec,
})

const mapDispatchToProps = dispatch => ({
    updateTime: () => dispatch(updateTime())
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeLeft);
