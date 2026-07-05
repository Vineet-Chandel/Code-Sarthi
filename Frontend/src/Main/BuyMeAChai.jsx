import React, { useState, useRef, useEffect } from "react";
import { Coffee, X, Minus, Plus, Check, Loader2, ArrowDown, Github, Twitter } from "lucide-react";
import Nav from "./Nav";

/* ---------------------------------------------------------
   Buy Me a Coffee — landing page (dark / monochrome)

   Palette is deliberately restrained to three tones — black,
   #212121, white — plus opacity steps of white for hierarchy.
   Premium comes from contrast and restraint here, not color:
   every "selected" or "primary" state inverts to solid white
   on black rather than reaching for an accent hue. The only
   non-neutral color left in is a soft red, used strictly for
   one functional validation hint.

   Structural signature carried over from the checkout modal:
   punched "ticket stub" notches on card edges, and a real
   progress ring instead of a decorative stat.
--------------------------------------------------------- */

const CREATOR_NAME = "Vineet Singh";
const PRICE_PER_CUP = 20;
const MONTHLY_GOAL = 100;
const COFFEES_THIS_MONTH = 62;

const PRESETS = [
  { qty: 1, label: "Quick Sip" },
  { qty: 3, label: "Full Pot", tag: "Most loved" },
  { qty: 5, label: "Deep Roast" },
];

const SUPPORTERS = [
  { name: "Priya Sharma", qty: 3, note: "Your OSS work saved my weekend, thank you!", time: "2h ago" },
  { name: "Rahul Mehta", qty: 1, note: "Loved the WebSocket deep dive.", time: "6h ago" },
  { name: "Ananya Rao", qty: 5, note: "Keep shipping. Also please sleep.", time: "1d ago" },
  { name: "Kabir Anand", qty: 1, note: "", time: "1d ago" },
  { name: "Sara Fernandes", qty: 3, note: "Fixed my bug in your comments lol", time: "2d ago" },
];

const STEPS = [
  { n: "01", title: "Pick a roast", body: "Quick Sip, Full Pot, or Deep Roast — or set any amount with the stepper." },
  { n: "02", title: "Leave a note", body: "Say what you're thanking them for. It shows up on the supporter wall." },
  { n: "03", title: "Seal it", body: "Pay securely via Razorpay. The coffee's on its way in seconds." },
];

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */

function ProgressRing({ value, max, size = 168 }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  return (
    <svg width={size} height={size} className="lp-ring" viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--white)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="46%" textAnchor="middle" className="lp-ring__num">{value}</text>
      <text x="50%" y="63%" textAnchor="middle" className="lp-ring__label">of {max} this month</text>
    </svg>
  );
}

function CheckoutOverlay({ open, onClose }) {
  const [qty, setQty] = useState(3);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState("idle");
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (open) { setStage("idle"); setQty(3); setMessage(""); }
  }, [open]);

  if (!open) return null;

  const total = qty * PRICE_PER_CUP;
  const activePreset = PRESETS.find((p) => p.qty === qty);

  const handlePay = () => {
    if (!name.trim() || stage !== "idle") return;
    setStage("loading");
    timers.current.push(setTimeout(() => setStage("success"), 1100));
  };

  return (
    <div className="lp-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cf-card">
        {stage === "success" ? (
          <div className="cf-success">
            <div className="cf-success__badge"><Check size={26} strokeWidth={3} /></div>
            <div className="cf-success__title">Order sealed ☕</div>
            <p className="cf-success__body">
              Thanks{name.trim() ? `, ${name.trim()}` : ""} — your coffee is on its way to {CREATOR_NAME}.
            </p>
            <div className="cf-success__receipt">
              <span>{qty} coffee{qty > 1 ? "s" : ""}</span>
              <span>₹{total}</span>
            </div>
            <button className="cf-again" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="cf-head">
              <div className="cf-head__left">
                <div className="cf-cup"><span className="cf-steam" /><Coffee size={19} /></div>
                <div>
                  <div className="cf-title">Buy me a coffee</div>
                  <div className="cf-subtitle">for {CREATOR_NAME}</div>
                </div>
              </div>
              <button className="cf-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
            </div>

            <div className="cf-divider" />

            <div className="cf-section">
              <div className="cf-label">How many coffees?</div>
              <div className="cf-presets">
                {PRESETS.map((p) => (
                  <button key={p.qty} type="button" className={`cf-preset${qty === p.qty ? " is-active" : ""}`} onClick={() => setQty(p.qty)}>
                    {p.tag && <span className="cf-preset__tag">{p.tag}</span>}
                    <span className="cf-preset__qty">{p.qty}</span>
                    <span className="cf-preset__label">{p.label}</span>
                    <span className="cf-preset__price">₹{p.qty * PRICE_PER_CUP}</span>
                  </button>
                ))}
              </div>
              <div className="cf-stepper-row">
                <span className="cf-stepper-hint">{activePreset ? "Or fine-tune it" : <>Custom · <b>{qty} coffees</b></>}</span>
                <div className="cf-stepper">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease"><Minus size={13} /></button>
                  <span className="cf-stepper__val">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(20, q + 1))} disabled={qty >= 20} aria-label="Increase"><Plus size={13} /></button>
                </div>
              </div>
            </div>

            <div className="cf-section">
              <div className="cf-label">Your name</div>
              <input className="cf-field" placeholder="e.g. Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />
            </div>

            <div className="cf-section">
              <div className="cf-label">Leave a note (optional)</div>
              <textarea className="cf-field" placeholder="Say something nice..." value={message} onChange={(e) => setMessage(e.target.value)} maxLength={200} />
            </div>

            <div className="cf-pay-wrap">
              <button className="cf-pay" onClick={handlePay} disabled={!name.trim() || stage === "loading"}>
                {stage === "loading" ? <Loader2 size={17} style={{ animation: "lp-spin 0.8s linear infinite" }} /> : <Coffee size={17} />}
                {stage === "loading" ? "Sealing your order..." : `Pay ₹${total} · ${qty} coffee${qty > 1 ? "s" : ""}`}
              </button>
              {!name.trim() && <div className="cf-name-hint">Add your name so we know who to thank</div>}
              <div className="cf-pay-note">Secure checkout via Razorpay · ₹{PRICE_PER_CUP} per coffee</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Landing page
--------------------------------------------------------- */

export default function CoffeeLandingPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const supportersRef = useRef(null);

  const scrollToSupporters = () => supportersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="lp">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .lp {
          --bg: #000000;
          --bg-soft: #0c0c0c;
          --surface: #212121;
          --surface-2: #2a2a2a;
          --surface-3: #383838;
          --line: rgba(255,255,255,0.08);
          --white: #ffffff;
          --muted: rgba(255,255,255,0.62);
          --muted-2: rgba(255,255,255,0.4);
          --invert: #141414;
          --danger: #ff6b6b;

          font-family: 'Poppins', -apple-system, sans-serif;
          background: var(--bg);
          color: var(--white);
          min-height: 100vh;
          position: relative;
        }

        .lp * { box-sizing: border-box; }

        /* ---------- nav ---------- */
        .lp-nav {
          position: sticky; top: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 6vw;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .lp-logo { display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: -0.01em; }
        .lp-logo__mark {
          width: 30px; height: 30px; border-radius: 9px;
          background: var(--white); display: flex; align-items: center; justify-content: center; color: var(--invert);
        }
        .lp-nav__cta {
          display: flex; align-items: center; gap: 7px;
          background: var(--white); color: var(--invert);
          border: none; padding: 9px 16px; border-radius: 999px;
          font-weight: 600; font-size: 13.5px; cursor: pointer;
          transition: background 0.15s ease;
        }
        .lp-nav__cta:hover { background: #e6e6e6; }

        /* ---------- hero ---------- */
        .lp-hero {
          display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 48px;
          align-items: center;
          max-width: 1120px; margin: 0 auto;
          padding: 72px 6vw 56px;
        }
        .lp-tasting { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
        .lp-tag {
          font-size: 11px; font-weight: 500; letter-spacing: 0.03em;
          border: 1px solid var(--line);
          border-radius: 999px; padding: 5px 11px;
          color: var(--muted);
        }
        .lp-tag b { color: var(--white); font-weight: 600; }
        .lp-hero__title {
          font-weight: 700;
          font-size: clamp(32px, 4.4vw, 50px); line-height: 1.1;
          color: var(--white); max-width: 15ch;
        }
        .lp-hero__title em {
          font-style: normal; font-weight: 800;
          text-decoration: underline;
          text-decoration-thickness: 3px;
          text-underline-offset: 8px;
          text-decoration-color: var(--white);
        }
        .lp-hero__body {
          margin-top: 16px; font-size: 15.5px; font-weight: 400; line-height: 1.65;
          color: var(--muted); max-width: 46ch;
        }
        .lp-hero__actions { display: flex; align-items: center; gap: 18px; margin-top: 26px; flex-wrap: wrap; }
        .lp-btn-primary {
          display: flex; align-items: center; gap: 8px;
          background: var(--white); color: var(--invert);
          border: none; padding: 13px 22px; border-radius: 12px;
          font-weight: 600; font-size: 14.5px; cursor: pointer;
          box-shadow: 0 18px 40px -18px rgba(0,0,0,0.7);
          transition: transform 0.12s ease, background 0.15s ease;
        }
        .lp-btn-primary:hover { background: #e6e6e6; }
        .lp-btn-primary:active { transform: scale(0.98); }
        .lp-link-ghost {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; color: var(--muted);
          font-weight: 600; font-size: 13.5px; cursor: pointer;
        }
        .lp-link-ghost:hover { color: var(--white); }

        .lp-hero__visual {
          display: flex; flex-direction: column; align-items: center; gap: 18px;
          background: var(--surface); border-radius: 22px; padding: 28px 20px 22px;
          position: relative;
        }
        .lp-hero__visual::before, .lp-hero__visual::after {
          content: ""; position: absolute; left: 0; right: 0; height: 12px;
          background-image: radial-gradient(circle 7px, var(--bg) 7px, transparent 7.5px);
          background-size: 24px 24px; background-position: -4px center; background-repeat: repeat-x;
        }
        .lp-hero__visual::before { top: -1px; }
        .lp-hero__visual::after { bottom: -1px; transform: rotate(180deg); }
        .lp-ring__num { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 30px; fill: var(--white); }
        .lp-ring__label { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 9.5px; fill: var(--muted); letter-spacing: 0.03em; }
        .lp-visual__caption { font-size: 12.5px; color: var(--muted); text-align: center; max-width: 24ch; line-height: 1.5; }

        /* ---------- stats strip ---------- */
        .lp-stats {
          max-width: 1120px; margin: 0 auto; padding: 0 6vw 60px;
          display: flex; gap: 0; border-top: 1px dashed var(--line); border-bottom: 1px dashed var(--line);
        }
        .lp-stat { flex: 1; padding: 22px 10px; text-align: center; border-right: 1px dashed var(--line); }
        .lp-stat:last-child { border-right: none; }
        .lp-stat__num { font-weight: 700; font-size: 26px; color: var(--white); }
        .lp-stat__label { font-size: 10.5px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

        /* ---------- how it works ---------- */
        .lp-section { max-width: 1120px; margin: 0 auto; padding: 64px 6vw; }
        .lp-eyebrow {
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
        }
        .lp-h2 { font-weight: 700; font-size: 28px; color: var(--white); margin-bottom: 34px; }
        .lp-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .lp-step { padding: 22px 20px; border-top: 2px solid var(--white); }
        .lp-step__n { font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 10px; }
        .lp-step__title { font-weight: 600; font-size: 18px; color: var(--white); margin-bottom: 6px; }
        .lp-step__body { font-size: 13.5px; font-weight: 400; color: var(--muted); line-height: 1.55; }

        /* ---------- supporters ---------- */
        .lp-supporters { background: var(--surface); border-radius: 22px; padding: 6px 4px; position: relative; }
        .lp-supporters::before, .lp-supporters::after {
          content: ""; position: absolute; left: 0; right: 0; height: 12px;
          background-image: radial-gradient(circle 7px, var(--bg) 7px, transparent 7.5px);
          background-size: 24px 24px; background-position: -4px center; background-repeat: repeat-x;
        }
        .lp-supporters::before { top: -1px; }
        .lp-supporters::after { bottom: -1px; transform: rotate(180deg); }
        .lp-srow {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 16px 22px; border-bottom: 1px dashed var(--line);
        }
        .lp-srow:last-child { border-bottom: none; }
        .lp-srow__avatar {
          flex: none; width: 34px; height: 34px; border-radius: 50%;
          background: var(--surface-3); color: var(--white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-size: 13.5px;
        }
        .lp-srow__main { flex: 1; min-width: 0; }
        .lp-srow__top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .lp-srow__name { font-weight: 600; font-size: 14px; color: var(--white); }
        .lp-srow__qty { font-size: 11.5px; font-weight: 500; color: var(--muted); }
        .lp-srow__note { font-size: 13px; font-weight: 400; color: var(--muted); margin-top: 3px; font-style: italic; }
        .lp-srow__time { flex: none; font-size: 10.5px; font-weight: 400; color: var(--muted-2); }

        /* ---------- cta band ---------- */
        .lp-cta {
          max-width: 1120px; margin: 0 auto 64px; padding: 46px 6vw;
          background: linear-gradient(135deg, var(--surface), var(--bg-soft));
          border: 1px solid var(--line);
          border-radius: 24px; text-align: center;
        }
        .lp-cta__title { font-weight: 700; font-size: 26px; color: var(--white); }
        .lp-cta__body { color: var(--muted); font-size: 14px; font-weight: 400; margin: 10px auto 22px; max-width: 42ch; }
        .lp-cta .lp-btn-primary { margin: 0 auto; }

        /* ---------- footer ---------- */
        .lp-footer {
          border-top: 1px solid var(--line);
          padding: 26px 6vw 34px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 11px; font-weight: 400; color: var(--muted);
        }
        .lp-footer__socials { display: flex; gap: 14px; }
        .lp-footer__socials a { color: var(--muted); }
        .lp-footer__socials a:hover { color: var(--white); }

        /* ---------- checkout overlay (shared with modal) ---------- */
        .lp-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: lp-fade 0.2s ease both;
        }
        @keyframes lp-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lp-spin { to { transform: rotate(360deg); } }

        .cf-card {
          position: relative; width: 100%; max-width: 420px;
          background: var(--surface); border-radius: 22px;
          box-shadow: 0 30px 70px -25px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06) inset;
          overflow: hidden; animation: cf-in 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .cf-card::before, .cf-card::after {
          content: ""; position: absolute; left: 0; right: 0; height: 12px;
          background-image: radial-gradient(circle 7px, var(--bg) 7px, transparent 7.5px);
          background-size: 24px 24px; background-position: -4px center; background-repeat: repeat-x;
        }
        .cf-card::before { top: -1px; }
        .cf-card::after { bottom: -1px; transform: rotate(180deg); }
        @keyframes cf-in { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .cf-head { display: flex; align-items: flex-start; justify-content: space-between; padding: 26px 24px 18px; }
        .cf-head__left { display: flex; align-items: center; gap: 12px; }
        .cf-cup { position: relative; width: 38px; height: 38px; border-radius: 10px; background: var(--white); display: flex; align-items: center; justify-content: center; color: var(--invert); flex: none; }
        .cf-steam { position: absolute; top: -10px; left: 50%; width: 3px; height: 12px; margin-left: -1.5px; border-radius: 3px; background: rgba(255,255,255,0.35); animation: cf-steam 2.6s ease-in-out infinite; }
        @keyframes cf-steam { 0% { transform: translateY(0) scaleY(0.7); opacity: 0; } 30% { opacity: 0.7; } 100% { transform: translateY(-14px) scaleY(1.3); opacity: 0; } }
        .cf-title { font-weight: 700; font-size: 21px; color: var(--white); line-height: 1.15; }
        .cf-subtitle { font-size: 10.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }
        .cf-close { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; border-radius: 8px; transition: background 0.15s ease, color 0.15s ease; }
        .cf-close:hover { background: var(--surface-2); color: var(--white); }
        .cf-divider { height: 1px; background: var(--line); margin: 0 24px; }
        .cf-section { padding: 20px 24px 0; }
        .cf-label { font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; display: flex; align-items: baseline; justify-content: space-between; }
        .cf-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .cf-preset { position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 12px 6px 11px; border-radius: 14px; border: 1.5px solid var(--surface-3); background: var(--surface-2); cursor: pointer; transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease; }
        .cf-preset:active { transform: scale(0.97); }
        .cf-preset.is-active { background: var(--white); border-color: var(--white); }
        .cf-preset__tag { position: absolute; top: -8px; font-size: 8.5px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; background: var(--white); color: var(--invert); padding: 2px 6px; border-radius: 999px; }
        .cf-preset__qty { font-weight: 700; font-size: 19px; color: var(--white); }
        .cf-preset.is-active .cf-preset__qty, .cf-preset.is-active .cf-preset__label, .cf-preset.is-active .cf-preset__price { color: var(--invert); }
        .cf-preset__label { font-size: 12.5px; font-weight: 600; color: var(--white); }
        .cf-preset__price { font-size: 10.5px; font-weight: 500; color: var(--muted); }
        .cf-stepper-row { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding: 10px 12px; background: var(--surface-2); border-radius: 12px; }
        .cf-stepper-hint { font-size: 12px; font-weight: 400; color: var(--muted); }
        .cf-stepper-hint b { color: var(--white); font-weight: 700; }
        .cf-stepper { display: flex; align-items: center; gap: 14px; }
        .cf-stepper button { width: 26px; height: 26px; border-radius: 8px; border: none; background: var(--surface-3); color: var(--white); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.15s ease; }
        .cf-stepper button:hover { background: #444444; }
        .cf-stepper button:disabled { opacity: 0.35; cursor: not-allowed; }
        .cf-stepper__val { font-weight: 600; font-size: 15px; color: var(--white); min-width: 16px; text-align: center; }
        .cf-field { width: 100%; background: var(--surface-2); border: 1.5px solid transparent; border-radius: 12px; padding: 11px 14px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 500; color: var(--white); outline: none; transition: border-color 0.15s ease, background 0.15s ease; }
        .cf-field::placeholder { color: var(--muted-2); font-weight: 400; }
        .cf-field:focus { border-color: var(--white); background: var(--surface-2); }
        textarea.cf-field { resize: none; height: 74px; }
        .cf-pay-wrap { padding: 20px 24px 22px; }
        .cf-pay { position: relative; width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px; padding: 15px 18px; border: none; border-radius: 14px; background: var(--white); color: var(--invert); font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; overflow: hidden; transition: background 0.15s ease, opacity 0.15s ease, transform 0.1s ease; }
        .cf-pay:hover:not(:disabled) { background: #e6e6e6; }
        .cf-pay:active:not(:disabled) { transform: scale(0.985); }
        .cf-pay:disabled { opacity: 0.4; cursor: not-allowed; }
        .cf-pay::after { content: ""; position: absolute; right: 0; bottom: 0; width: 0; height: 0; border-style: solid; border-width: 0 0 22px 22px; border-color: transparent transparent rgba(0,0,0,0.16) transparent; }
        .cf-pay-note { text-align: center; margin-top: 12px; font-size: 10.5px; font-weight: 400; color: var(--muted-2); }
        .cf-name-hint { margin-top: 8px; font-size: 11px; color: var(--danger); font-weight: 500; }
        .cf-success { padding: 46px 28px 40px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; }
        .cf-success__badge { width: 56px; height: 56px; border-radius: 50%; background: var(--white); color: var(--invert); display: flex; align-items: center; justify-content: center; animation: cf-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
        @keyframes cf-pop { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .cf-success__title { font-weight: 700; font-size: 20px; color: var(--white); }
        .cf-success__body { font-size: 13.5px; font-weight: 400; color: var(--muted); line-height: 1.5; max-width: 280px; }
        .cf-success__receipt { width: 100%; margin-top: 4px; padding: 12px 16px; background: var(--surface-2); border-radius: 12px; font-size: 11.5px; font-weight: 500; color: var(--white); display: flex; justify-content: space-between; }
        .cf-again { margin-top: 6px; background: none; border: none; color: var(--white); font-weight: 600; font-size: 12.5px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }

        @media (max-width: 820px) {
          .lp-hero { grid-template-columns: 1fr; }
          .lp-steps { grid-template-columns: 1fr; }
          .lp-stats { flex-wrap: wrap; }
          .lp-stat { flex: 1 1 33%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cf-card, .cf-success__badge, .lp-overlay { animation: none; }
          .cf-steam { animation: none; opacity: 0; }
        }
      `}</style>

      {/* ---------- nav ---------- */}
      <div className="pt-3">
        <Nav />
      </div>

      {/* ---------- hero ---------- */}
      <section className="lp-hero">
        <div>
          <div className="lp-tasting">
            <span className="lp-tag">ROAST · <b>Full-stack</b></span>
            <span className="lp-tag">ORIGIN · <b>Bengaluru, IN</b></span>
            <span className="lp-tag">NOTES · <b>React, chai, midnight deploys</b></span>
          </div>
          <h1 className="lp-hero__title">Fuel {CREATOR_NAME.split(" ")[0]}'s <em>next commit.</em></h1>
          <p className="lp-hero__body">
            Every coffee keeps the open-source PRs, the weekend side-projects, and the 2am debugging sessions running. No subscriptions, no pressure — just a small thank-you when something you built or read was worth it.
          </p>
          <div className="lp-hero__actions">
            <button className="lp-btn-primary" onClick={() => setCheckoutOpen(true)}>
              <Coffee size={16} /> Buy a coffee — ₹20
            </button>
            <button className="lp-link-ghost" onClick={scrollToSupporters}>
              See recent supporters <ArrowDown size={14} />
            </button>
          </div>
        </div>

        <div className="lp-hero__visual">
          <ProgressRing value={COFFEES_THIS_MONTH} max={MONTHLY_GOAL} />
          <div className="lp-visual__caption">
            {MONTHLY_GOAL - COFFEES_THIS_MONTH} more coffees keeps the "ship weird side-projects" streak alive this month.
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <div className="lp-stats">
        <div className="lp-stat">
          <div className="lp-stat__num">142</div>
          <div className="lp-stat__label">Coffees bought</div>
        </div>
        <div className="lp-stat">
          <div className="lp-stat__num">₹8,400</div>
          <div className="lp-stat__label">Raised so far</div>
        </div>
        <div className="lp-stat">
          <div className="lp-stat__num">63</div>
          <div className="lp-stat__label">Backers</div>
        </div>
      </div>

      {/* ---------- how it works ---------- */}
      <section className="lp-section">
        <div className="lp-eyebrow">How it works</div>
        <h2 className="lp-h2">Three steps, one seal.</h2>
        <div className="lp-steps">
          {STEPS.map((s) => (
            <div className="lp-step" key={s.n}>
              <div className="lp-step__n">{s.n}</div>
              <div className="lp-step__title">{s.title}</div>
              <div className="lp-step__body">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- supporters ---------- */}
      <section className="lp-section" ref={supportersRef}>
        <div className="lp-eyebrow">Recent supporters</div>
        <h2 className="lp-h2">The last few coffees.</h2>
        <div className="lp-supporters">
          {SUPPORTERS.map((s, i) => (
            <div className="lp-srow" key={i}>
              <div className="lp-srow__avatar">{s.name.charAt(0)}</div>
              <div className="lp-srow__main">
                <div className="lp-srow__top">
                  <span className="lp-srow__name">{s.name}</span>
                  <span className="lp-srow__qty">bought {s.qty} coffee{s.qty > 1 ? "s" : ""}</span>
                </div>
                {s.note && <div className="lp-srow__note">“{s.note}”</div>}
              </div>
              <div className="lp-srow__time">{s.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- cta band ---------- */}
      <section className="lp-section" style={{ paddingTop: 8 }}>
        <div className="lp-cta">
          <div className="lp-cta__title">Your turn to seal one.</div>
          <p className="lp-cta__body">Takes about fifteen seconds, and it genuinely makes the next late-night build worth it.</p>
          <button className="lp-btn-primary" onClick={() => setCheckoutOpen(true)}>
            <Coffee size={16} /> Buy a coffee
          </button>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="lp-footer">
        <span>© {new Date().getFullYear()} {CREATOR_NAME} · built by hand, not a platform</span>
        <div className="lp-footer__socials">
          <a href="#" aria-label="GitHub"><Github size={16} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
        </div>
      </footer>

      <CheckoutOverlay open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}