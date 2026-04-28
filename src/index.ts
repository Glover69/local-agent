import { Hono } from 'hono'
import {startUp} from "./startup";
import sendBlueRoute from "./messaging/sendblue.ts";

const app = new Hono()

app.route('/api/messaging', sendBlueRoute);



export default {
  port: 3000,
  fetch: app.fetch,
}

await startUp(3000);

