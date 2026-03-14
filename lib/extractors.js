import axios from "axios"

export async function getServers(episodeId){

const {data}=await axios.get(
`https://aniwatch.to/ajax/server/list/${episodeId}`
)

return data.html
}
