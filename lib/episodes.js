import axios from "axios"
import cheerio from "cheerio"

export async function getEpisodes(source,id){

const {data}=await axios.get(`${source}${id}`)

const $=cheerio.load(data)

const episodes=[]

$(".ep-item").each((i,el)=>{

episodes.push({
number:$(el).text().trim(),
id:$(el).attr("data-id"),
})

})

return episodes
}
