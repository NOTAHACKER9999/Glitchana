import {getServers,extractStream} from "@/lib/extractors"

export async function GET(req,{params}){

const servers=await getServers(params.episode)

for(const server of servers){

const stream=await extractStream(server)

if(stream){

return Response.json({
stream:`/api/proxy?url=${encodeURIComponent(stream)}`
})

}

}

return Response.json({error:"No stream found"})
}
