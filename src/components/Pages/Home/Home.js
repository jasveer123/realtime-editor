import React from 'react'
import Navbar from './Navbar'
import Mainarea from './Mainarea'
import Background from "./68.png"
function Home() {
    return (
        <div className='backimg' style={{ backgroundImage: `url(${Background})` }}>
            <Navbar />
            <Mainarea />
        </div>
    )
}

export default Home