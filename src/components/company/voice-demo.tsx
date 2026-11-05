"use client";

import { useState } from "react";
import { ReceiptText, RotateCcw } from "lucide-react";
import styles from "./voice-demo.module.css";

export function VoiceDemo() {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <div className={styles.demo}>
      <p className={styles.label}>REV3 VOICE · OUR FIRST PRODUCT</p>
      <div className={styles.device}>
        <div className={styles.screws} aria-hidden="true"><span>⊕</span><span>⊕</span></div>
        <div className={styles.display}>
          <p><strong>Caller</strong><br />“Do you offer evening appointments?”</p>
          <p><strong>Rev3 Voice</strong><br />“Our last slot is at five. Would you like a callback about other options?”</p>
          <p><strong>Caller</strong><br />“Yes, please.”</p>
        </div>
        <div className={styles.controls}>
          <span>Example conversation</span>
          <button type="button" className={styles.insightButton} aria-expanded={showInsight} aria-controls="voice-demo-report" onClick={() => setShowInsight(value => !value)}>
            {showInsight ? <RotateCcw size={16} /> : <ReceiptText size={16} />}
            {showInsight ? "Reset" : "Show insight"}
          </button>
        </div>
      </div>
      <div id="voice-demo-report" aria-hidden={!showInsight} className={`${styles.slot} ${showInsight ? styles.open : ""}`}>
        <div className={styles.ticket}>
          <h3>Conversation → insight.</h3>
          <dl className={styles.reportRows}>
            <dt>What they needed.</dt><dd>An appointment after work.</dd>
            <dt>What happened.</dt><dd>The last slot was too early. The caller requested a callback.</dd>
            <dt>What comes next.</dt><dd>The team should call back to discuss alternatives.</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
