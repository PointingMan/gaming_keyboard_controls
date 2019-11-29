import React from 'react';
import './index.css';

const players = ["Bob", "Eric", "David", "William", "Benjamin", "Jesus", "Stone", "Poul", "Victor", "Daniel"]
function LeaderBoardPage(props){
  return (
    <>
    <table className = {"LeaderBoardPage-table"} style={{
      width : "40%",
      border : "1px solid black",
      margin : "5vh auto",
      textAlign : "left",
      borderSpacing : "2vmax",
      fontWeight : "700",
      fontSize : "1.2rem"
    }}>
      <caption style={{
        fontWeight : "700",
        fontSize : "2rem",
        marginBottom : "2vh"
      }}>Global leaderboard</caption>
      <tr>
        <th><p style={{fontSize : "1.5rem", marginBottom : "0vh", marginTop : "-1vh"}}>Rank</p></th>
        <th><p style={{fontSize : "1.5rem", marginBottom : "0vh", marginTop : "-1vh"}}>Username</p></th>
      </tr>
      {
        players.map((player, idx) => {
          return (
            <tr>
              <td>{idx+1}</td>
              <td>{player}</td>
            </tr>
          );
        })
      }
    </table>

    </>
  );
}

export default LeaderBoardPage;
