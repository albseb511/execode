import React from "react";
import styles from "./activity.module.css"

const AuthenticatingIndicator = () => {
  return (
    <div className={styles.full}>
        <div className="container d-flex flex-row border col-xs-10 col-sm-10 col-md-6 col-l-8 col-xl-8 p-4 mt-5 ">
        {/* <div className="m-auto p-4">
            <img src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
                height="80"
                width="80" />
        </div> */}
        <div style={{flex:2}}>
            <h3>Your Page is loading.</h3>
            <br/>
            <h6>If it takes too long, contact your admin</h6>
            <div className={`${styles.background} my-2`}/>
            <div className={`${styles.background} my-2`}/>
            <div className={`${styles.background} my-2`}/>
        </div>
        </div>
    </div>
  );
};

export default AuthenticatingIndicator;
