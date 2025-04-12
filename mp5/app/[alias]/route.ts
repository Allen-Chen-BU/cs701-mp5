import getUrl from "@/lib/getUrl";
// import test from "@/lib/test";

export async function GET(request: Request, { params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;
    const data = await getUrl(alias);
    // const data = await test();
    
    if (data) {
        return Response.redirect(data.url);
    } else {
        return new Response(null, {status:404});
    }
}