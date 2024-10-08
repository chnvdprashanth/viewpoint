import React, { useState } from 'react'
import { client, urlFor } from '../utils/client'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin: { image, postedBy, destination, _id, save } }) => {
    const [postHoverd, setPostHovered] = useState(false)
    // const [savingPost, setSavingPost] = useState(false)
    const navigate = useNavigate();
    const user = fetchUser()
    const alreadySaved = !!(save?.filter((item)=> item.postedBy._id===user?.sub))?.length

    const savePin = async(id)=>{
        if(!alreadySaved){
            // setSavingPost(true)

            await client
            .patch(id)
            .setIfMissing({ save:[] })
            .insert('after','save[-1]',[{
                _key: uuidv4(),
                userId: user?.sub,
                postedBy:{
                    _type:'postedBy',
                    _ref:user?.sub,
                },
            }])
            .commit()
            .then(()=>{
                // window.location.reload()
                // setSavingPost(false)
            })
        }
    }

    const deletePin = (id)=>{
        client
        .delete(id)
        .then(()=>{
            window.location.reload()
        })
    }

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
            >
                <img className="rounded-lg w-full" src={urlFor(image).width(250).url()} alt="user-post" />
                {
                    postHoverd && (
                        <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pb-2 z-50'
                            style={{ height: '100%' }}
                        >
                            <div className='flex items-center justify-between'>
                                <div className="flex gap-2">
                                    <a href={`${image?.asset?.url}?dl=`}
                                        download
                                        onClick={(e) => e.stopPropagation()}
                                        className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                                        <MdDownloadForOffline />
                                    </a>
                                </div>
                                {
                                    alreadySaved ? (
                                        <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                            { save?.length } Saved
                                        </button>
                                    ) : (
                                        <button 
                                        type='button' 
                                        className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                            savePin(_id)
                                        }}>
                                            Save
                                        </button>
                                    )
                                }
                            </div>
                            <div className='flex justify-between items-center gap-2 w-full'>
                                {destination && (
                                    <a 
                                    href={destination}
                                    target='_blank'
                                    rel='noreferrer'
                                    onClick={(e)=> e.stopPropagation()}
                                    className='bg-white flex items-center gap-1 text-black font-semibold p-1 pl-3 pr-3 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                                    >
                                        <BsFillArrowUpRightCircleFill />
                                        {destination.length>15 ? `${destination.slice(0,10)}...`:destination}
                                    </a>
                                )}
                                {
                                    postedBy?._id === user?.sub && (
                                        <button 
                                        type="button"
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                            deletePin(_id)
                                        }}
                                        className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold text-base rounded-3xl hover:shadow-md outline-none'
                                        >
                                            <AiTwotoneDelete />
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <Link 
            to={`user-profile/${postedBy?._id}`}
            className='flex gap-2 mt-2 items-center'
            >
                <img 
                src={postedBy?.image} 
                alt="" 
                className='w-8 h-8 rounded-full object-cover'
                />
                <p className='font-semibold capitalize'>{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin