/* global document, window */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css'

// import ReactDOM from 'react-dom';

const files = window.__FILES__ || [];
const queryParams = window._query_ || {};
console.log("1. file", files);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
// React.Children
// hydrate
// ReactDOM.hydrate(
//     // <App />,
//     <React.StrictMode>
//         <App />
//       </React.StrictMode>,
//     document.getElementById('root')
//   );

//    ReactDOM.hydrate(<App  />, document.getElementById('root'));

// hydrateRoot used in react 18
ReactDOM.hydrateRoot(document.getElementById('root'),
    <>
            <App files={files} queryParams={queryParams}/>
        {/* </Router> */}
    </>
);
// ReactDOM.hydrate(<React.StrictMode> <App files={files} queryParams={queryParams}/> </React.StrictMode>, document.getElementById('root'));
