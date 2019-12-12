import React, {useEffect, useState} from 'react';
import './index.css';
import background from 'assets/playBackground.png';
import icon from 'assets/brand_icon.png'

function returnId(props){
  var Id = props.replace('/dashboard/play/','') 
  return Id
}

const checkAllKeys = (keyMap, command) => {
  for(let i = 0; i < command.keyCodes.length; i++){
    if(!keyMap[command.keyCodes[i]]) return false;
  }
  return true;
}

function GamePage(props){
  // find challenge to play : DONE
  // validate that user has access to challenge : DONE
  // wait for space press and set the first command and start time : DONE
  // update command when keyCodes are pressed : DONE
  // when last command is done: stop time and show points gained in an congratulations page and update backend.
  const [commandIndex, setCommandIndex] = useState(-1);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const challengeID = returnId(window.location.pathname)
  const challenge = props.challenges[challengeID];
  const user = props.user;

  const command = challenge.commands.length != commandIndex && challenge.commands.length != -1 ? challenge.commands[commandIndex] : null;
  
  const activateTimer ={
    keyCodes : [32]
  }

  const [keyMap, setKeyMap] = useState({});
  useEffect(() => {
    window.onkeydown = (e) => {
      if(keyMap[e.keyCode]) return;
      setKeyMap((prevKeyMap) => {
        const newKeyMap = {...prevKeyMap};
        newKeyMap[e.keyCode] = true;
        return newKeyMap;
      })
    }
  })
  useEffect(() => {
    window.onkeyup = (e) => {
      setKeyMap((prevKeyMap) => {
        const newKeyMap = {...prevKeyMap};
        newKeyMap[e.keyCode] = false;
        return newKeyMap;
      })
    }
  })
  useEffect(() => {
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  })

  if(!challenge || !user) return <></>;

  if(challenge.predecessor != null && !user.challenges[challenge.predecessor].done){
    return <div>You found away around our frontend security. However we predicted you :) Please complete all previous challenges before trying this one.</div>
  }

  if(commandIndex == -1 && checkAllKeys(keyMap, activateTimer)){
    console.log("wdhwbd")
    setCommandIndex(0);
    setStartTime((new Date()).toISOString());
  }
  if(command && checkAllKeys(keyMap, command)){
    setCommandIndex(commandIndex + 1);
    console.log("DU KLAREDE DET JUBIIII")
  }
  if(commandIndex == challenge.commands.length && !endTime){
    setEndTime((new Date()).toISOString());
  }
  const totalTime = endTime && startTime ? endTime.getTime() - startTime.getTime() : null;
  return (
    <>
      <h1 style={{textAlign :"center", height : "10vh"}}>Welcome to {challenge.name}</h1>

      <div style={{
        height : "60vh",
        width : "55vw",
        margin : "auto",
        borderRadius : "20px",
        overflow : "hidden",
        boxShadow : "0px 0px 10px 2px black",
        position : "relative"
      }}>
        <img src={background} style={{
          height : "100%",
          width : "100%",
          position : "absolute",
          top : "0",
          left : "0"
        }}/>
        <img src = {icon} style ={{
          position : "absolute",
          left : "50%",
          transform : "translateX(-50%)",
          top : "65%",
          width : "18%"
        }}/>
        <div style={{
          position : "absolute",
          top :"65%",
          left : "70%",
          backgroundColor : "red",
          height : "16%",
          width : "10%",
          cursor : "pointer",
          borderRadius : "50px",
          textAlign : "center",
        }}>
          <span style ={{
            position : "absolute", 
            width : "fit-content",
            height :"fit-content",
            top : "0",
            right : "0",
            margin : "auto",
            left : "0",
            bottom : "0",
            fontWeight : "700",
            fontSize : "2rem"

          }}>
              AA
          </span>
        </div>
        {commandIndex == -1 &&
          <div style = {{
            position : "absolute",
            top : "0",
            right : "0",
            left : "0",
            bottom : "20vh",
            fontWeight : "700",
            fontSize : "2rem",
            margin : "auto",
            width : "fit-content",
            height : "fit-content"
          }}>
            <h2 style={{textAlign :"center", color : "white"}}>Press spacebar to start!</h2>
          </div>
        }
      </div>
    </>)
}

export default GamePage;
