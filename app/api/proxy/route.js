import axios from "axios"

export async function GET(req){

const url=new URL(req.url).searchParams.get("url")

const {data}=await axios.get(url)

let modified=data.replace(
/(https?:\/\/.*\.ts)/g,
"/api/proxy?url=$1"
)

return new Response(modified,{
headers:{
"Content-Type":"application/vnd.apple.mpegurl"
}
})

}
