import {Hono} from "hono";
import type {SendBlueWebhookPayload} from "../types/data.types.ts";

function processMessage(message: string, phone: string){

}

const sendBlueRoute = new Hono()

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
    // c.executionCtx.waitUntil(processMessage(content, phoneNumber))
    // return c.json({}, 200)

    try {
        console.log("Message: ", content);
        console.log("PhoneNumber: ", phoneNumber);

        return c.json({}, 200);

    } catch (err: any){
        console.error("Webhook error:", err.message);
        return c.json(
            { message: "Failed to process webhook data" },
            500,
        );
    }

})


export default sendBlueRoute