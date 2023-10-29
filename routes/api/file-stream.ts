import { Handlers } from "$fresh/server.ts";
import { IMAGE_DIR, exists } from "../../utils/file.ts";
import { Status } from "https://deno.land/std@0.200.0/http/http_status.ts";

export const handler: Handlers = {
    async GET(req){
        try {
            const url = new URL(req.url)
            const filename = url.searchParams.get('file');
            const isExist = await exists(`${IMAGE_DIR}/${filename}`)
            if(!isExist){
                return new Response("Not Found", {
                    status: Status.NotFound,
                })
            }
            const file = await Deno.open(`${IMAGE_DIR}/${filename}`, {read :true});
            const readable = file.readable;
            return new Response(readable)
        } catch (error) {
            return new Response(error, {
                status: Status.InternalServerError,
              });
        }
    }
}