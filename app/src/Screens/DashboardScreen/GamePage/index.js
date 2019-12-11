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
  console.log(props.challenges)
  var IdForPage = returnId(window.location.pathname)
  var challengeName = props.challenges[IdForPage].title
  const [commandIndex, setCommandIndex] = useState(-1);

  const command = {
    keyCodes : [87, 82, 69]
  }
  
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

  if(commandIndex == -1 && checkAllKeys(keyMap, activateTimer)){
    setCommandIndex(0);
  }


  if(checkAllKeys(keyMap, command)){
    console.log("DU KLAREDE DET JUBIIII")
  }

  console.log(keyMap)
  return (
    <>
      <h1 style={{textAlign :"center", height : "10vh"}}>Welcome to {challengeName}</h1>

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
        }}></img>

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
              AA</span>

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
            height : "fit-content",
              
    
          }}>
            <h2 style={{textAlign :"center", color : "white"}}>Press spacebar to start!</h2>
          </div>
        }
        
          
        
        
      
      
      </div>
    </>)
}

export default GamePage;
