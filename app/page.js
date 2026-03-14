"use client"

import {useState,useRef,useEffect} from "react"
import Hls from "hls.js"

export default function Page(){

const [results,setResults]=useState([])
const [episodes,setEpisodes]=useState([])
const [stream,setStream]=useState(null)

const video=useRef()

useEffect(()=>{

if(!stream) return

if(Hls.isSupported()){

const hls=new Hls()
hls.loadSource(stream)
hls.attachMedia(video.current)

}else{

video.current.src=stream

}

},[stream])

async function search(q){

const res=await fetch("/api/search?q="+q)

setResults(await res.json())

}

async function loadAnime(id){

const res=await fetch("/api/anime/"+encodeURIComponent(id))

setEpisodes(await res.json())

}

async function play(ep){

const res=await fetch("/api/stream/"+encodeURIComponent(ep))

const data=await res.json()

setStream(data.stream)

}

return(

<div style={{padding:40}}>

<h1>Anime</h1>

<input
placeholder="Search"
onChange={e=>search(e.target.value)}
/>

<h2>Results</h2>

{results.map(a=>

<div key={a.id}>

<p>{a.title}</p>

<button onClick={()=>loadAnime(a.id)}>
Episodes
</button>

</div>

)}

<h2>Episodes</h2>

{episodes.map(ep=>

<button
key={ep.id}
onClick={()=>play(ep.id)}
>

Episode {ep.number}

</button>

)}

<video
ref={video}
controls
style={{width:"100%",marginTop:20}}
/>

</div>

)

}
