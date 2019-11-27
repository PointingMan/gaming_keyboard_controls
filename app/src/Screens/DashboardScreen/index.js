import React, {useState} from 'react';
import './index.css';
import Menu from 'Components/Menu'
import SidePanel from './SidePanel';

// like enumerate types
const pages = {
  CHALLENGES : "challenges",
  STATS : "stats",
  LEADERBOARD : "leaderboard",
  EDITPROFILE : "editprofile",
}

function DashBoardScreen(props){
  const [currentPage, setCurrentPage] = useState(pages.CHALLENGES);
  return (
    <>
      <div style={{
        backgroundColor : "blue",
        color : "white",
        height : "88vh",
        width : "20vw",
        position: "fixed",
        top : "12vh"
      }}>
        <SidePanel/>
      </div>
      <div style={{
        backgroundColor : "black",
        color : "white",
        height : "12vh",
        width : "100%",
        position: "-webkit-sticky",
        position: "sticky",
        top : "0"
      }}>
        <Menu items={[{
          key : pages.CHALLENGES,
          content : "Challenges",
        }, {
          key : pages.STATS,
          content : "Stats",
        }, {
          key : pages.LEADERBOARD,
          content : "Leaderboard"
        }]} buttonClickHandler={(page) => {
          console.log(page);
        }} className={"DashBoardStyle"}/>
      </div>
    </>
  );
}

export default DashBoardScreen;
