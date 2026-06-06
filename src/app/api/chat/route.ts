import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Vapi sends tool parameters inside message.toolCalls
    let args = body;
    if (body.message && body.message.toolCalls && body.message.toolCalls.length > 0) {
       args = body.message.toolCalls[0].function.arguments;
    }

    const { name, email, date, time, service } = args;

    // Check if required fields are present
    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Google Service Account Authentication
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Format Date and Time for Pakistan Timezone (Asia/Karachi)
    const startDateTime = `${date}T${time}:00+05:00`; 
    // Create an end time 1 hour after the start time
    const endDateTimeObj = new Date(new Date(startDateTime).getTime() + 60 * 60 * 1000); 
    const endDateTime = endDateTimeObj.toISOString();

    // Insert Event into Google Calendar
    const event = await calendar.events.insert({
      calendarId: "dev.moazamsultan@gmail.com", // Aapka calendar ID
      sendUpdates: "all", // User ko automatic email notification bhejega
      requestBody: {
        summary: `Code&Bugs Consultation: ${name}`,
        description: `Service Requested: ${service || "General Technical Consultation"}\nBooked via Code&Bugs AI Assistant.`,
        start: {
          dateTime: startDateTime,
          timeZone: "Asia/Karachi",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Karachi",
        },
        attendees: [
          { email: email } // User ki email yahan add ho gayi
        ],
      },
    });

    // Vapi ko response dena zaroori hai
    return NextResponse.json({
      results: [{
        toolCallId: body.message?.toolCalls?.[0]?.id,
        result: `Appointment successfully booked for ${name}. Calendar invite sent to ${email}.`
      }]
    });

  } catch (error) {
    console.error("Calendar API Error:", error);
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}