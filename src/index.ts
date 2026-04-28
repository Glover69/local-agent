import { Hono } from 'hono'
import {startUp} from "./startup";
import sendBlueRoute from "./messaging/sendblue.ts";
import {config} from "./config.ts";

const app = new Hono()

app.route('/api/messaging', sendBlueRoute);



export default {
  port: config.port,
  fetch: app.fetch,
}

await startUp(config.port);

