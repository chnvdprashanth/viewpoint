import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client, createOrGetUser } from '../utils/client'

const Login = () => {
    const navigate = useNavigate()
    const responseGoogele = (response) => {
        try {
            const doc = createOrGetUser(response)

            client.createIfNotExists(doc)
                .then(() => {
                    navigate('/', { replace: true })
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex justify-start items-center h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop={true}
                    muted
                    controls={false}
                    autoPlay
                    className='w-full h-full object-cover'
                />

                <div className='absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay'>
                    <div className="p-5">
                        <img src={logo} width='150px' alt='logo' />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            onSuccess={responseGoogele}
                            onError={responseGoogele}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login