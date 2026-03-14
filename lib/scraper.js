import axios from "axios"
import cheerio from "cheerio"

const SOURCES = [
"https://aniwatch.to",
"https://gogoanime3.net",
"https://animepahe.ru"
]

export async function searchAnime(query){

const results=[]

for(const site of SOURCES){

try{

const {data} = await axios.get(
`${site}/search?keyword=${encodeURIComponent(query)}`,
{headers:{'User-Agent':'Mozilla/5.0'}}
)

const $ = cheerio.load(data)

$(".flw-item, .items li").each((i,el)=>{

results.push({
title:$(el).find(".film-name, a").text(),
id:$(el).find("a").attr("href"),
image:$(el).find("img").attr("data-src") || $(el).find("img").attr("src"),
source:site
})

})

}catch(e){}

}

return results
}
