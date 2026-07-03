import http from "node:http";
import fs from "node:fs/promises";
import {createReadStream} from "node:fs";
import os from "node:os";
import path from "node:path";
import {URL} from "node:url";
import EventEmitter from "node:events";
import dns from "node:dns";
import crypto from "node:crypto";
import {Buffer} from "node:buffer";
import {setTimeout} from "node:timers";
const PORT=3000;
const dataFolder = path.join("data");
const reportFolder = path.join("reports");
const bookingFile=path.join(dataFolder,"bookings.txt");
const reportFile=path.join(reportFolder,"bookings-report.txt");
await fs.mkdir(dataFolder,{recursive:true});
await fs.mkdir(reportFolder,{recursive:true});
const emitter=new EventEmitter();
emitter.on("ticketBooked",(name,movie)=>{
    console.log(`Booking Successful for ${movie}`);
    console.log(`Customer Name: ${name}`);
    console.log(`Movie: ${movie}`);
});
const server=http.createServer(async(request,response)=>{
    response.setHeader("Content-Type","text/plain");
    if(request.url==="/"){
        response.end("Welcome to Movie Ticket Booking Management System");
    }
    else if(request.url.startsWith("/book")){
        const myURL=new URL(request.url,`http://${request.headers.host}`);
        const name=myURL.searchParams.get("name");
        const movie=myURL.searchParams.get("movie");
        if(!name||!movie){
            response.statusCode=400;
            return response.end("Please provide name and movie");
        }
        const bookingID=crypto.randomUUID();
        const bookingData=`Booking ID: ${bookingID}
        Name: ${name}
        Movie: ${movie}\n
        `;
        try{
            await fs.appendFile(bookingFile,bookingData);
            await fs.appendFile(reportFile,bookingData);
            emitter.emit("ticketBooked",name,movie);
            setTimeout(()=>{
                console.log(`Confirmation sent to ${name}`);
            },3000);
            response.end(`Ticket Booked Sucessfully
                Booking ID:${bookingID}`);
        }
        catch(err){
            response.statusCode=500;
            response.end("Unable to save booking");
        }
    }
    else if(request.url==="/bookings"){
        try{
            const data=await fs.readFile(bookingFile,"utf-8");
            response.end(data);
        }
        catch(err){
            response.statusCode=404;
            response.end("No bookings Found");
        }
    }
    else if(request.url==="/report"){
        const readStream=createReadStream(reportFile);
        readStream.on("error",()=>{
            response.statusCode=404;
            response.end("Report not Found");
        });
        readStream.pipe(response);
    }
    else if(request.url==="/system"){
        const systemInfo=`\n Operating System: ${os.platform()}
        Architecture: ${os.arch()}
        HostName: ${os.hostname()}
        Home Directory: ${os.homedir()}
        Total Memory: ${os.totalmem()}
        Free Memory: ${os.freemem()}
        `;
        response.end(systemInfo);
    }
    else if(request.url.startsWith("/verify-domain")){
        const myURL=new URL(request.url,`http://${request.headers.host}`);
        const domain=myURL.searchParams.get("domain");
        if(!domain){
            response.statusCode=404;
            return response.end("Please provide a domain");
        }
        dns.lookup(domain,(err,address)=>{
            if(err){
                response.statusCode=404;
                return response.end("Invalid Domain");
            }
            response.end(`Domain: ${domain} 
            IP Address: ${address}
            `);
        });
    }
    else if(request.url.startsWith("/buffer")){
        const myURL=new URL(request.url,`http://${request.headers.host}`);
        const text=myURL.searchParams.get("text");
        if(!text){
            response.statusCode = 400;
            return response.end("Please provide text");
        }
        const buffer=Buffer.from(text);
        response.end(`\n Original Text: ${text}
        Buffer: ${buffer}
        Decoded Text: ${buffer.toString()}`);
    }
    else{
        response.statusCode=404;
        response.end("404 Page Not Found")
    }
});
server.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});