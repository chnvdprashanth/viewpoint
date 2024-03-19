import jwt_decode from 'jwt-decode'
import sanityClient, { SanityClient, createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


export const createOrGetUser = (response) => {
    try{
        const decode = jwt_decode(response.credential)
        // console.log(decode)
        localStorage.setItem('user', JSON.stringify(decode))
        const {name,picture,sub} = decode
        const user = {
            _id:sub,
            _type:'user',
            userName:name,
            image:picture
        }
        return user
    }
    catch(err){}
}

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset:'production',
    apiVersion:'2023-10-07',
    useCdn:true,
    token: process.env.REACT_APP_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client)

export const urlFor = (source)=>builder.image(source)


