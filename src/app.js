'useClient'
import React, { useEffect, useState, Fragment } from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VideoPlayer from './player';
import MediaSelector from './media-selector';

const App = ({ files = [], name, ...restProps}) => {
    // const [files, setFiles]= useState(props?.props?.files||[])
    console.log(files, "ppp");
    // useEffect(()=>{
    //     alert("hiii")
    // },[])
    return (
        <>
         {/* <Fragment> */}
        {/* <Router> */}
            <div>
                <h1>Hello, React SSR!</h1>
                <VideoPlayer files={files || []} {...restProps}/>
                <p>This is a server-rendered React app. {files[0]}</p>
                <button onClick={() => {
                    console.log("click...me")
                    alert("click")
                }} >
                    click {name}
                </button>

                {/* <li>
                {(files || [])?.map((file, index) => (
                    <ol key={index}>{file}</ol>
                ))}
            </li> */}
            <MediaSelector />
            </div>
            {/* </Router> */}
        {/* </Fragment> */}
        </>
    );
};

export default App;
