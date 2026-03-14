"use client"

import {useEffect,useState} from "react"
import Player from "@/components/Player"

export default function Anime({params}){

const [episodes,setEpisodes]=useState([])
const [stream,setStream]=useState(null)

useEffect(()=>{

fetch(`/api/episodes/${params.id}`)
.then(r=>r.json())
.then(setEpisodes)

},[])

async function play(id){

const res=await fetch(`/api/streams/${id}`)

const data=await res.json()

setStream(data.stream)

}

return(

<div>

{stream && <Player src={stream}/>}

{episodes.map(ep=>

<button key={ep.id} onClick={()=>play(ep.id)}>
Episode {ep.number}
</button>

)}

</div>

)

}
