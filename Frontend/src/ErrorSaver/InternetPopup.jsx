import { useState, useEffect, useRef } from "react";
import useInternetStatus from "./NetworkStatus";

const getQuality = (effectiveType, rtt, downlink, isOnline) => {
    if (!isOnline) return { text: "None", cls: "badge-none" };
    if (effectiveType === "4g" && rtt < 80 && downlink > 5) return { text: "Excellent", cls: "badge-excellent" };
    if (effectiveType === "4g" || (downlink > 2 && rtt < 200)) return { text: "Good", cls: "badge-good" };
    if (effectiveType === "3g" || (downlink > 0.5)) return { text: "Fair", cls: "badge-fair" };
    return { text: "Poor", cls: "badge-poor" };
};

const getBarCount = (effectiveType, isOnline) => {
    if (!isOnline) return 0;
    return { "4g": 5, "3g": 3, "2g": 2, "slow-2g": 1 }[effectiveType] ?? 3;
};

const SignalBars = ({ count }) => {
    const heights = [5, 8, 11, 15, 18];
    const color = count >= 4 ? "#97C459" : count >= 3 ? "#FAC775" : "#F09595";
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 18 }}>
            {heights.map((h, i) => (
                <div key={i} style={{
                    width: 5, height: h, borderRadius: 2,
                    background: i < count ? color : "rgba(255,255,255,0.1)",
                    transition: "background 0.4s ease",
                }} />
            ))}
        </div>
    );
};

const AutoDismissRing = ({ running }) => {
    const circ = 2 * Math.PI * 8;
    const [offset, setOffset] = useState(circ);
    const rafRef = useRef(null);
    const startRef = useRef(null);

    useEffect(() => {
        if (!running) { setOffset(circ); return; }
        const duration = 3000;
        const animate = (now) => {
            if (!startRef.current) startRef.current = now;
            const progress = Math.min((now - startRef.current) / duration, 1);
            setOffset(circ * (1 - progress));
            if (progress < 1) rafRef.current = requestAnimationFrame(animate);
        };
        startRef.current = null;
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [running]);

    if (!running) return null;
    return (
        <svg width={20} height={20} viewBox="0 0 20 20" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={10} cy={10} r={8} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
            <circle cx={10} cy={10} r={8} fill="none" stroke="#97C459" strokeWidth={2}
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
        </svg>
    );
};

const POPUP_STATES = {
    offline: {
        bg: "#1a0a0a",
        dotColor: "#E24B4A",
        dotGlow: "#E24B4A88",
        titleColor: "#F09595",
        title: "No connection",
        sub: "network unreachable",
    },
    reconnecting: {
        bg: "#0f0f1a",
        dotColor: "#EF9F27",
        dotGlow: "transparent",
        titleColor: "#FAC775",
        title: "Reconnecting",
        sub: "searching for network…",
    },
    online: {
        bg: "#0a1a10",
        dotColor: "#639922",
        dotGlow: "#63992288",
        titleColor: "#C0DD97",
        title: "Connected",
        sub: null,
    },
};

function InternetPopup() {
    const status = useInternetStatus();
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState("offline");
    const prevOnline = useRef(status.isOnline);
    const dismissTimer = useRef(null);

    useEffect(() => {
        const wasOnline = prevOnline.current;
        const isNowOnline = status.isOnline;
        prevOnline.current = isNowOnline;

        clearTimeout(dismissTimer.current);

        if (!isNowOnline) {
            setMode("offline");
            setVisible(true);
        } else if (!wasOnline && isNowOnline) {
            // reconnected
            setMode("online");
            setVisible(true);
            dismissTimer.current = setTimeout(() => setVisible(false), 3200);
        }
    }, [status.isOnline, status.effectiveType]);

    if (!visible) return null;

    const s = POPUP_STATES[mode];
    const quality = getQuality(status.effectiveType, status.rtt, status.downlink, status.isOnline);
    const bars = getBarCount(status.effectiveType, status.isOnline);
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const badgeStyles = {
        "badge-excellent": { background: "rgba(99,153,34,0.15)", color: "#97C459", border: "0.5px solid rgba(99,153,34,0.3)" },
        "badge-good": { background: "rgba(99,153,34,0.1)", color: "#C0DD97", border: "0.5px solid rgba(99,153,34,0.2)" },
        "badge-fair": { background: "rgba(239,159,39,0.12)", color: "#FAC775", border: "0.5px solid rgba(239,159,39,0.25)" },
        "badge-poor": { background: "rgba(226,75,74,0.12)", color: "#F09595", border: "0.5px solid rgba(226,75,74,0.25)" },
        "badge-none": { background: "rgba(226,75,74,0.15)", color: "#F09595", border: "0.5px solid rgba(226,75,74,0.3)" },
    };

    return (
        <div style={{
            position: "fixed", top: 20, right: 20, zIndex: 9999,
            width: 300, borderRadius: 14, overflow: "hidden",
            fontFamily: "'Syne', sans-serif",
            border: "0.5px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
            animation: "popup-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@400;500;600&display=swap');
        @keyframes popup-in {
          from { transform: translateY(-10px) scale(0.94); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes dot-pulse {
          0%   { box-shadow: 0 0 0 0 ${s.dotGlow}; }
          70%  { box-shadow: 0 0 0 7px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        @keyframes dot-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes scan {
          0%   { width:0%; margin-left:0% }
          50%  { width:60% }
          100% { width:0%; margin-left:100% }
        }
      `}</style>

            {/* Header */}
            <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "13px 14px 11px", background: s.bg,
            }}>
                <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: s.dotColor,
                    boxShadow: `0 0 6px ${s.dotGlow}`,
                    flexShrink: 0,
                    animation: mode === "offline"
                        ? "dot-pulse 1.5s infinite"
                        : mode === "reconnecting"
                            ? "dot-blink 0.8s infinite"
                            : "none",
                }} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: s.titleColor, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {s.title}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: s.titleColor + "99", marginTop: 1 }}>
                        {s.sub ?? `${status.effectiveType !== "unknown" ? status.effectiveType + " · " : ""}${status.networkType !== "unknown" ? status.networkType : "broadband"}`}
                    </div>
                </div>
                {mode === "online" && <AutoDismissRing running={true} />}
                <button onClick={() => setVisible(false)} style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)", border: "none",
                    color: "rgba(255,255,255,0.4)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, transition: "background 0.15s",
                }} aria-label="Dismiss">✕</button>
            </div>

            {/* Body */}
            <div style={{ background: "#111116", padding: "12px 14px 14px" }}>
                {mode === "reconnecting" ? (
                    <>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                            Scanning for networks…
                        </div>
                        <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{
                                height: "100%", borderRadius: 2,
                                background: "linear-gradient(90deg, #EF9F27, #FAC775)",
                                animation: "scan 1.4s ease-in-out infinite",
                            }} />
                        </div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", textAlign: "right", marginTop: 8 }}>
                            last seen · {now}
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                            {[
                                { label: "Signal", value: <SignalBars count={bars} /> },
                                { label: "Type", value: <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{status.effectiveType !== "unknown" ? status.effectiveType.toUpperCase() : "—"}</span> },
                                { label: "Downlink", value: <><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{status.downlink || "—"}</span><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>{status.downlink ? "Mbps" : ""}</span></> },
                                { label: "Latency", value: <><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{status.rtt || "—"}</span><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>{status.rtt ? "ms" : ""}</span></> },
                            ].map(({ label, value }) => (
                                <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 10px", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                                    {value}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Connection quality</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, ...badgeStyles[quality.cls] }}>{quality.text}</span>
                        </div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", textAlign: "right", marginTop: 8 }}>
                            updated · {now}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default InternetPopup;