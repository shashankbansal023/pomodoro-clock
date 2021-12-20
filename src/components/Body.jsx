import React,{useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown,faArrowUp,faPause,faPlay,faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import './body.css';



const Body = () => {

    const [breakLength, setbreakLength] = useState(5);
    const [sessionLength, setsessionLength] = useState(25);

    const [timerLabel,settimerLabel] = useState(sessionLength);
    const[timerSeconds,settimerSeconds] = useState(0);   
    const [istoggle,setToggle] = useState(false);
    const[minutesToggle, setMinutesToggle] = useState(false);

    let audio = new Audio('/alarm.wav');
    
    //to change break length and session length through up and down arrows.
    function changeLength(arrow){
        switch(arrow){
            case "down-break":
                setbreakLength(breakLength => breakLength!==0?breakLength-1:0);
                break;
            case "up-break":
                setbreakLength(breakLength => breakLength!==60?breakLength+1:60);
                break;
            case "down-session":
                setsessionLength(sessionLength => sessionLength!==0?sessionLength-1:0);
                break;
            case "up-session":
                setsessionLength(sessionLength => sessionLength!==60?sessionLength+1:60);
                break;
            default:
    
        }
    }
    //change timerlabel according to session length if toggle is false.
    useEffect(() => {
        if(!istoggle){
            settimerLabel(sessionLength);
        } 
    }, [sessionLength])
    
    // continuing the timer till 00:00 .
    useEffect(() => {
        let intervalId;

        if(istoggle){
            intervalId  = setInterval(()=>{
                if(timerSeconds !==0){
                    settimerSeconds(timerSeconds-1);
                }
                else{
                    if(timerLabel > 0){
                        settimerLabel(timerLabel-1);
                        settimerSeconds(59);
                    }else{
                        if(!minutesToggle){
                            settimerLabel(breakLength);
                        }else{
                            settimerLabel(sessionLength);
                        }
                        settimerSeconds(0);
                        setMinutesToggle(min=>!min);
                        audio.play();
                    }
                }
            },1000)
        }
        return () => {
            clearInterval(intervalId);
        }
    }, [istoggle,timerSeconds,timerLabel,minutesToggle])
    
    //reset function
    function reset(){
        setToggle(false);
        settimerLabel(25);
        settimerSeconds(0);
        setbreakLength(5);
        setsessionLength(25);
    }
   

    return (
        <div className="body">
          <h1 className="heading"> 25+5 Clock</h1>
          <div className="session-heading">
                <div className="break-length">
                    <h1>Break Length</h1>
                    <div className="break-box">
                        <FontAwesomeIcon icon={faArrowDown}  className="buttons" onClick={()=> changeLength("down-break")} style={{cursor:'pointer'}}></FontAwesomeIcon>
                        <div className="break-amount">{breakLength}</div>
                        <FontAwesomeIcon icon={faArrowUp}  className="buttons" onClick={()=> changeLength("up-break")} style={{cursor:'pointer'}}></FontAwesomeIcon>
                    </div>
                </div>
                <div className="session-length">
                        <h1 >Session Length</h1>
                        <div className="break-box-2">
                            <FontAwesomeIcon icon={faArrowDown} className="arrow-down buttons"  onClick={()=> changeLength("down-session")} style={{cursor:'pointer'}}></FontAwesomeIcon>
                            <div className="session-amount">{sessionLength}</div>
                            <FontAwesomeIcon icon={faArrowUp}  className="buttons"  onClick={()=> changeLength("up-session")} style={{cursor:'pointer'}}></FontAwesomeIcon>
                         </div>         
                </div>  
            </div>  
            <div className="session-box">
                <div className="session-header">
                    <h1 className="session-length-heading">Session Length</h1>
                    <div className="session-time">{timerLabel>=10?timerLabel:`0${timerLabel}`}:{timerSeconds < 10?`0${timerSeconds}`:timerSeconds%60}</div>
                </div>
                <div className="session-footer">
                    <FontAwesomeIcon icon={faPause} className="pause-timer buttons" onClick={()=>setToggle(false)}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faPlay} className="start-timer buttons" onClick={()=>setToggle(true)}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faCircleNotch} className="reset-timer buttons"  onClick={reset}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )  
  }
export default Body

