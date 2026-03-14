import axios from "axios"
import cheerio from "cheerio"

const BASE="https://allmanga.to"

export async function GET(req,{params}){

const path=params.path || []

const action=path[0]

/* SEARCH */

if(action==="search"){

const q=new URL(req.url).searchParams.get("q")

const {data}=await axios.get(`${BASE}/search?keyword=${q}`)

const $=cheerio.load(data)

const results=[]

$(".item").each((i,el)=>{

results.push({
id:$(el).find("a").attr("href"),
title:$(el).find(".name").text(),
image:$(el).find("img").attr("src")
})

})

return Response.json(results)

}

/* ANIME */

if(action==="anime"){

const id=decodeURIComponent(path[1])

const {data}=await axios.get(BASE+id)

const $=cheerio.load(data)

const episodes=[]

$(".episode").each((i,el)=>{

episodes.push({
id:$(el).attr("href"),
number:$(el).text()
})

})

return Response.json(episodes)

}

/* STREAM */

if(action==="stream"){

const ep=decodeURIComponent(path[1])

const {data}=await axios.get(ep)

const match=data.match(/https.*\.m3u8/)

return Response.json({
stream:match?match[0]:null
})

}

return Response.json({error:"invalid endpoint"})

}
