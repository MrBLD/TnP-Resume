// http://localhost:3002/data?hi=love
//     URLSearchParams { 'hi' => 'love' }
// http://localhost:3002/data?hi:love
//     URLSearchParams { 'hi:love' => '' }
// http://localhost:3002/data?hi=love&hi=lover
//     URLSearchParams { 'hi' => 'love', 'hi' => 'lover' }
//		console.log(searchParams.get("hi"))
// 		love
//        console.log(searchParams.getAll("hi"))
//      [ 'love', 'lover', '' ]
import { NextRequest } from "next/server";

import ProfileHandler from "@/lib/ProfileHandler";
export async function GET(request: NextRequest){
    return new Response("api:Submit-Profile");
}

export async function POST(request: Request) {
    const inputdata = await request.json();
    for (const [key, value] of Object.entries(inputdata)) {
        console.log(`${key}: ${value}`);
    }
    ProfileHandler(inputdata);
    // console.log("post: "+inputdata.UserName);

    return new Response(JSON.stringify(inputdata), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201,
    });

}
// export default async function handleProfileSubmit(req: NextRequest) {
//     if (req.method === "POST") {
//         const formData = await req.body.formData();

//         // Access form data values
//         const name = formData.get("name");
//         const email = formData.get("email");
//         const message = formData.get("message");

//         // Process the form data
//         // ...

//         // Return a response
//         return new Response("Form submitted successfully");
//     }

//     return new Response("Invalid request method", { status: 405 });
// }