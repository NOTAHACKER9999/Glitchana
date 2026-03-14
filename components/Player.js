"use client"

import {useEffect,useRef} from "react"
import Hls from "hls.js"

export default function Player({src}){

const video=useRef()

useEffect(()=>{

if(Hls.isSupported()){

const hls=new Hls()

hls.loadSource(src)

hls.attachMedia(video.current)

}

else{

video.current.src=src

}

},[src])

return(
<video ref={video} controls style={{width:"100%"}} />
)

}
