import React, { useState } from 'react'
import Logologin from './4.png'
import './login.css'
import Navbar from '../Home/Navbar'
import Background from './68.png'
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import toast, { Toaster } from 'react-hot-toast';
function Login() {

    const [Username, setusername] = useState("");
    const [Roomid, setRoomid] = useState("");
    const navigate = useNavigate();


    function clickroombtn() {
        const id = uuidv4()
        console.log(id)
        setRoomid(id)

        toast.success('Room is Created');
    }
    function textchange(e) {
        setRoomid(e.target.value)

    }
    function textchange2(e) {
        setusername(e.target.value);

    }
    function clickjoinbtn() {
        if (!Roomid || !Username) {
            toast.error('Room id and Username is Require')
        }
        else {
            navigate(`/editor/${Roomid}`, {

                state: {
                    Username
                }

            })
        }




    }

    return (
        <>
            <div className='backimg' style={{ backgroundImage: `url(${Background})` }}>
                <Navbar />
                <div className='logincontainer'>
                    <div className='card'>
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                        />
                        <div className='loginlogo'>
                            <img src={Logologin} alt="image is loading" />
                        </div>
                        <div className='cardpoints'>
                            <span id='spantext'>Please Write Invitation Room Id</span>
                            <div className='points '>
                                <input id="text1" placeholder='Enter the Room ID' value={Roomid} onChange={textchange} type="text" />
                            </div>
                            <div className='points '>
                                <input type="text" placeholder='Enter the Username' onChange={textchange2} id='text2' />
                            </div>
                            <div >
                                <button className='joinbtn' onClick={clickjoinbtn} >Join</button>
                                <span className='spanbtn'><button onClick={clickroombtn} className='roombtn'>New Room</button></span>
                            </div>
                            <br />
                            <span className='jointext'>If you don't have an invite then create New Room</span>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}

export default Login