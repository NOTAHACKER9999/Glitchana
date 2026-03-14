import axios from "axios"
import cheerio from "cheerio"

const BASE="https://allmanga.to"

export async function GET(req,{params}){

const path=params.path || []
const action=path[0]

if(action==="search"){

const q=new URL(req.url).searchParams.get("q")

const {data}=await axios.get(`${BASE}/search?keyword=${q}`)

const $=cheerio.load(data)

const results=[]

$("a").each((i,el)=>{

const title=$(el).text().trim()

if(title.length>3){

results.push({
title,
id:$(el).attr("href"),
image:""
})

}

})

return Response.json(results.slice(0,20))

}

if(action==="anime"){

const id=decodeURIComponent(path[1])

const {data}=await axios.get(BASE+id)

const $=cheerio.load(data)

const episodes=[]

$("a").each((i,el)=>{

const txt=$(el).text()

if(txt.includes("Episode")){

episodes.push({
id:$(el).attr("href"),
number:txt
})

}

})

return Response.json(episodes)

}

if(action==="stream"){

const ep=decodeURIComponent(path[1])

const {data}=await axios.get(ep)

const match=data.match(/https.*\.m3u8/)

return Response.json({
stream:match?match[0]:null
})

}

return Response.json({error:"invalid"})
}
