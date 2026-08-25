export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clean = (value: unknown) => String(value || "").replace(/[<>]/g, "").trim();
    const enquiry = { name: clean(body.name), business: clean(body.business), email: clean(body.email), phone: clean(body.phone), message: clean(body.enquiry) };
    if (!enquiry.name || !enquiry.business || !enquiry.email || !enquiry.message) return Response.json({ error: "Please complete the required fields." }, { status: 400 });
    if (!process.env.RESEND_API_KEY) return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Rev3 <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_TO_EMAIL || "rev3ltd@gmail.com"],
        reply_to: enquiry.email,
        subject: `New Rev3 enquiry from ${enquiry.business}`,
        html: `<h2>New Rev3 enquiry</h2><p><strong>Name:</strong> ${enquiry.name}</p><p><strong>Business:</strong> ${enquiry.business}</p><p><strong>Email:</strong> ${enquiry.email}</p><p><strong>Phone:</strong> ${enquiry.phone || "Not provided"}</p><p><strong>Enquiry:</strong></p><p>${enquiry.message.replace(/\n/g, "<br>")}</p>`
      })
    });
    const result = await response.json();
    if (!response.ok) return Response.json({ error: result.message || "Email delivery failed." }, { status: 502 });
    return Response.json({ ok: true, id: result.id });
  } catch {
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  }
}
