"use client"

import {useState} from "react"

export default function Search(){

const [results,setResults]=useState([])

async function search(q){

const res=await fetch(`/api/search?q=${q}`)

setResults(await res.json())

}

return(

<div>

<input
placeholder="Search anime"
onChange={(e)=>search(e.target.value)}
/>

{results.map(a=>

<a key={a.id} href={`/anime/${encodeURIComponent(a.id)}`}>
<img src={a.image}/>
<p>{a.title}</p>
</a>

)}

</div>

)

}
