import { json, type Cookies } from "@sveltejs/kit";
import fs from "fs";


export async function POST({ request }) {
    const report = await request.text();
    
    console.log("--------> " + report);
    fs.promises.writeFile("report.txt", report, {
        flag: "w"
    }).then(() => {
        console.log("Finished writing");
    }).catch(() => {
        console.log("Error writing the report file!");
    });

    return json({ status: 201 });
}