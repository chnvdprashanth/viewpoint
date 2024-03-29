import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { feedQuery, searchQuery } from '../utils/data'

import { client } from '../utils/client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPin] = useState(null)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    if(categoryId){
      const query = searchQuery(categoryId)

      client.fetch(query)
      .then((data)=>{
        setPin(data)
        setLoading(false)
      })
    }
    else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPin(data)
        setLoading(false)
      })
    }
  }, [categoryId])
  

  if(loading) return <Spinner message="We are adding new ideas to your feed"/>

  if(!pins?.length) return <h2>No Pins Found</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed