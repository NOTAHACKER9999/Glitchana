import {searchAnime} from "@/lib/scraper"

export async function GET(req){

const q=new URL(req.url).searchParams.get("q")

const results=await searchAnime(q)

return Response.json(results)

}
