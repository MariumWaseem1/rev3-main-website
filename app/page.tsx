"use client";

import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: 0.18 });
    document.querySelectorAll(".reveal").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <main className="new-site">
    <header className="new-nav">
      <a className="new-brand" href="#rev3" aria-label="Rev3 home"><img src="/rev3-logo.png" alt="" /><span>REV3</span></a>
      <nav aria-label="Main navigation"><a href="#voice">Voice</a><a href="#business">Business</a><button onClick={() => setContactOpen(true)}>Contact</button></nav>
    </header>

    <section className="intro" id="rev3">
      <div className="intro-copy reveal">
        <p className="chapter">REV3 / THE COMPANY</p>
        <h1>We build AI tools for <span>real businesses.</span></h1>
        <p className="intro-definition">Rev3 is a UK technology company helping businesses save time, serve customers and grow.</p>
        <p className="intro-detail">We have two products. Rev3.Voice handles inbound phone calls. Rev3.Business improves the work happening behind the scenes.</p>
        <div className="intro-links"><a href="#voice">01 Rev3.Voice</a><a href="#business">02 Rev3.Business</a></div>
      </div>
      <div className="brand-display reveal" aria-hidden="true"><div className="brand-glow" /><img src="/rev3-logo.png" alt="" /><span>ONE COMPANY</span><strong>TWO PRODUCTS</strong></div>
    </section>

    <section className="product-story voice-story" id="voice">
      <div className="product-copy reveal">
        <p className="chapter">01 / REV3.VOICE</p><h2>AI that answers your business calls.</h2>
        <p>Rev3.Voice answers inbound calls, understands what the caller needs and completes approved next steps.</p>
        <ul><li>Answers calls at the times you choose</li><li>Captures and qualifies enquiries</li><li>Books appointments and sends confirmations</li><li>Hands complex calls to your team with context</li></ul>
        <a className="product-link" href="https://voice.rev3.uk/">Explore Rev3.Voice <span>voice.rev3.uk</span></a>
      </div>
      <div className="voice-demo reveal" aria-label="Example Rev3 Voice call flow">
        <div className="demo-head"><span className="live-dot" /> LIVE CALL <b>00:42</b></div>
        <div className="wave-bars" aria-hidden="true">{[24,48,30,70,44,82,36,62,28,54,38,74,42,60,26].map((height,index)=><i key={index} style={{height}} />)}</div>
        <div className="call-line"><span>Caller</span><p>Can I book a consultation for Thursday?</p></div>
        <div className="call-line rev3-line"><span>Rev3</span><p>Yes. I have 2:30pm available.</p></div>
        <div className="action-complete"><i /> Appointment booked</div>
      </div>
    </section>

    <section className="product-story business-story" id="business">
      <div className="business-demo reveal" aria-label="Example Rev3 Business workflow">
        <div className="workflow-row"><span>INCOMING ENQUIRY</span><b>Received</b></div><div className="workflow-track"><i /><i /><i /></div>
        <div className="workflow-row"><span>CUSTOMER DETAILS</span><b>Captured</b></div><div className="workflow-track"><i /><i /><i /></div>
        <div className="workflow-row"><span>FOLLOW UP</span><b>Sent</b></div><div className="workflow-done">Work completed automatically</div>
      </div>
      <div className="product-copy reveal">
        <p className="chapter">02 / REV3.BUSINESS</p><h2>AI that helps your team get more done.</h2>
        <p>Rev3.Business builds practical AI systems around the way your business already works.</p>
        <ul><li>Automates repetitive admin and workflows</li><li>Supports marketing and customer growth</li><li>Helps your team respond faster</li><li>Connects with the tools you already use</li></ul>
        <a className="product-link" href="https://business.rev3.uk/">Explore Rev3.Business <span>business.rev3.uk</span></a>
      </div>
    </section>

    <section className="choice reveal"><p>Not sure where to start?</p><h2>Choose the problem you want to solve first.</h2><div><a href="https://voice.rev3.uk/">I want to handle more calls</a><a href="https://business.rev3.uk/">I want to improve how we work</a><button onClick={() => setContactOpen(true)}>Talk to Rev3</button></div></section>
    <section className="new-backing"><span>Backed by</span><img src="/city-ventures.png" alt="City Ventures" /></section>
    <footer className="new-footer"><a className="new-brand" href="#rev3"><img src="/rev3-logo.png" alt="" /><span>REV3</span></a><p>Practical AI for business.</p><div><a href="https://voice.rev3.uk/">Rev3.Voice</a><a href="https://business.rev3.uk/">Rev3.Business</a><button onClick={() => setContactOpen(true)}>Contact</button></div></footer>
    {contactOpen && <div className="contact-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-title" onMouseDown={event => { if (event.target === event.currentTarget) setContactOpen(false); }}>
      <div className="contact-card">
        <button className="contact-close" aria-label="Close contact form" onClick={() => setContactOpen(false)}>Close</button>
        <p className="chapter">CONTACT REV3</p><h2 id="contact-title">Tell us what you want to improve.</h2>
        <p>Not sure whether you need Rev3.Business or Rev3.Voice? Tell us what is slowing your business down and we will point you in the right direction.</p>
        <form onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault(); setFormState("sending");
          const form = event.currentTarget;
          const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
          if (response.ok) { setFormState("sent"); form.reset(); } else setFormState("error");
        }}>
          <label>Name<input name="name" required autoComplete="name" /></label>
          <label>Business<input name="business" required autoComplete="organization" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Phone <span>optional</span><input name="phone" type="tel" autoComplete="tel" /></label>
          <label className="full-field">What would you like to improve?<textarea name="enquiry" required rows={4} /></label>
          <button className="send-button" disabled={formState === "sending"}>{formState === "sending" ? "Sending" : "Send enquiry"}</button>
          <p className="form-message" aria-live="polite">{formState === "sent" ? "Thanks. Your enquiry has been sent." : formState === "error" ? "Something went wrong. Please email rev3ltd@gmail.com." : ""}</p>
        </form>
      </div>
    </div>}
  </main>;
}
