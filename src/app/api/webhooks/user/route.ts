import { env } from "@/env";
import { WebhookEvent } from "@clerk/nextjs/server"; //this already defines the event type coming from clerk
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/server/db";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = env.WEBHOOK_SECRET;
    console.log("WEBHOOK_SECRET", WEBHOOK_SECRET);
    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
      );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      console.log("event: ", evt);
      //   //only id and email is req for now
      const user_id = evt.data.id;
      const email_address = evt.data.email_addresses[0]?.email_address;
      console.log("id", user_id);
      console.log("email_address", email_address);

      //insert details in db
      await db.user.create({
        data: {
          user_id: user_id,
          email: email_address,
        },
      });
    }

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    return Response.error();
  }
}
