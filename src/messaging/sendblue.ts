import {Hono} from "hono";
import type {SendBlueWebhookPayload} from "../types/data.types.ts";
import {LMStudioClient} from "@lmstudio/sdk";
import {SendblueAPI} from "sendblue";
import {config} from "../config.ts";

const sendBlueRoute = new Hono()
let lmClient = new LMStudioClient()



const sbClient = new SendblueAPI({
    apiKey: config.sendblue.apiKey,
    apiSecret: config.sendblue.secretKey
});



async function processMessage(message: string, phone: string){
    // Send typing indicator to user
    await sbClient.typingIndicators.send({
        from_number: config.sendblue.givenNumber,
        number: phone,
    });

    const model = await lmClient.llm.model();
    const res = await model.respond(message)
    await sendMessage(res.nonReasoningContent, phone);
}

async function sendMessage(message: string, phone: string){

    await sbClient.messages.send({
        content: message,
        from_number: config.sendblue.givenNumber, // in this case would be our sendblue number
        number: phone,
    });

}



// Webhook route
sendBlueRoute.post("/webhook", async (c) => {
    const body: SendBlueWebhookPayload = await c.req.json();

    if (!body){
        console.log('SendBlue returned no body');
        return c.json({ message: "SendBlue returned no body" }, 400);
    }
    
    if (body.is_outbound){
        console.log("You sent this message. You can't reply to it");
        return c.json({ message: "You sent this message. You can't reply to it" }, 400);
    }

    const content = body.content;
    const phoneNumber = body.from_number;

    // Return 200 immediately to Sendblue and process message as you do so
    processMessage(content, phoneNumber) // no await, fires in background
    return c.json({}, 200)

})


export default sendBlueRoute