import { json, type Cookies } from "@sveltejs/kit";
import fs from "fs";


export async function POST({ request, cookies }) {
    const report = await request.text();
    cookies.set("visitedPages", JSON.stringify([]), { path: "/" });
    
    console.log("\n\n================ REPORT ================\n");
    console.log(report);
    fs.promises.writeFile("report.txt", report, {
        flag: "w"
    }).then(() => {
        console.log("Finished writing");
    }).catch(() => {
        console.log("Error writing the report file!");
    });

    return json({ status: 201 });
}