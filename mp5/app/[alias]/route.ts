import getUrl from "@/lib/getUrl";

export async function GET(request: Request, { params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;
    const data = await getUrl(alias)
    
    if (data) {
        return Response.redirect(data.url);
    } else {
        return new Response(null, {status:404});
    }
}