import ngrok from '@ngrok/ngrok';
import {SendblueAPI} from "sendblue";

const ngrokToken = process.env['NGROK_TOKEN'];

export async function startUp(port: number){
    // Programmatically kill any existing tunnels before running
    await ngrok.kill();

    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log("Starting up server...");

    const listener = (await ngrok.forward({ addr: port, name: "local-agent", authtoken: ngrokToken })).url()

    if (listener) {
        console.log(`ngrok server started on: ${listener}`);


        // Add ngrok endpoint to sendblue webhooks
        const client = new SendblueAPI({
            apiKey: process.env['SENDBLUE_API_API_KEY'],
            apiSecret: process.env['SENDBLUE_API_API_SECRET'],
        });


        const webhook = await client.webhooks.update({webhooks: {"receive": [`${listener}/api/messaging/webhook`],}});
        console.log(webhook.message);
    } else {
        console.log("Could not start up ngrok server...");
    }
}