import React from 'react'
import './Nav.css'
import { Link } from "react-router-dom"
function Mainarea() {
    return (
        <>
            <div className='mainarea'>
                <section className='left'>
                    <div>
                        <h1 className='list'>Code
                            <br />
                            collaborate
                            <br />
                            create
                            <br />
                        </h1>
                        <h1 className='any'>
                            Anytime, Anywhere
                        </h1>

                    </div>
                    <div className='btn'>
                        <button className='btn1'><span id='reg'>Register</span></button>
                        <button className='btn2'><Link to="/login" id='reg2' >Login</Link></button>
                    </div>
                </section>
                <section className='right'>
                 <div>
                 </div>
                 
                 
                </section>
            </div>
        </>
    )
}

export default Mainarea