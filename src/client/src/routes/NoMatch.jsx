import React from "react";
import styles from "./NoMatch.module.css"

const NoMatch = () => {
  return (
    <div className="container d-flex flex-row border col-xs-10 col-sm-10 col-md-6 col-l-4 col-xl-4 p-4 mt-5 ">
      <div className="m-auto p-4">
        <img src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
             height="80"
             width="80" />
      </div>
      <div style={{flex:2}}>
        <h3>ERROR: 404</h3>
        <div className={`${styles.background} my-2`}/>
        <div className={`${styles.background} my-2`}/>
        <div className={`${styles.background} my-2`}/>
      </div>
    </div>
  );
};

export default NoMatch;
