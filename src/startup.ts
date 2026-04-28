import ngrok from '@ngrok/ngrok';
import {SendblueAPI} from "sendblue";
import {LMStudioClient} from "@lmstudio/sdk";

const ngrokToken = process.env['NGROK_TOKEN'];
const lmClient = new LMStudioClient();

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

        // Load up model for use (Just for testing)
        const model = await lmClient.llm.model("gemma-4-e2b-it-mlx");

        if(!model){
            console.log("Could not load model");
        }

        console.log(`Successfully loaded ${model.displayName}`);

    } else {
        console.log("Could not start up ngrok server...");
    }
}