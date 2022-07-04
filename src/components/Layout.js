import React from 'react'
export default function Layout(props) {

    // const url = new URL(document.referrer);
    // console.log(url.pathname);
    // console.log(location.pathname)

    return (
        <div>
            {/* {location.pathname !== "" && location.pathname !== '/' && (<Navbar/>) } */}
            {props.children}
            {/* {location.pathname !== "" && (<Footer/>) } */}

        </div>
    )
}