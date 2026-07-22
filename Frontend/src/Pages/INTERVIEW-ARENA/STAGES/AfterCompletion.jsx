import React, { useRef, useState, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion, MotionConfig } from "framer-motion";
import Stage0 from "./Stage0";
import Stage1 from "./Stage1";
import Stage2a from "./Stage2a";
import Stage2b from "./Stage2b";
import Stage2c from "./Stage2c";
import Stage2d from "./Stage2d";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";

// CSS overrides applied only inside the cloned capture document, forcing
// print-safe colors regardless of your dark glassmorphism theme variables.
const PDF_CAPTURE_STYLES = `
    html, body {
        background: #fff !important;
        color: #000 !important;
    }
    * {
        color: inherit !important;
        background-image: none !important;
        animation: none !important;
        transition: none !important;
    }
    /* Framer Motion (and similar) leave elements at opacity:0 / translated /
       hidden via inline style until an entrance animation or whileInView
       trigger fires. The capture only ever needs the FINAL visible state,
       so force it — this is what was producing blank white pages. */
    [style] {
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
    }
    :root {
        --color-base-100: #ffffff !important;
        --color-base-200: #f5f5f5 !important;
        --color-base-300: #e5e5e5 !important;
        --color-base-content: #000000 !important;
        --color-primary: #2563eb !important;
        --color-secondary: #9333ea !important;
        --color-accent: #14b8a6 !important;
        --color-neutral: #404040 !important;
        --root-bg: #ffffff !important;
    }
`;

// Waits two animation frames so the browser has actually painted the
// freshly mounted stage before html2canvas reads its layout.
const waitForPaint = () =>
    new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

// Some stages render <img> tags (avatars, icons, charts-as-images). If those
// haven't finished loading, html2canvas can capture a 0-height canvas, which
// is what was blowing up jsPDF's internal scale() with "Invalid argument".
const waitForImages = async (container) => {
    const imgs = Array.from(container.querySelectorAll("img"));
    await Promise.all(
        imgs.map((img) =>
            img.complete
                ? Promise.resolve()
                : new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                })
        )
    );
};

const AfterCompletion = ({
    auditData,
    strategyData,
    rewrittingData,
    profileAssebly,
    skillGapData,
    growthData,
}) => {
    const [downloading, setDownloading] = useState(false);
    const [progress, setProgress] = useState({ index: 0, total: 0, label: "" });
    const captureContainerRef = useRef(null);

    const pdfStages = useMemo(
        () => [
            { Component: Stage0, props: { auditData }, label: "Profile Audit" },
            { Component: Stage1, props: { strategyData }, label: "Strategy" },
            { Component: Stage2a, props: { rewrittingData }, label: "Rewrite · Summary" },
            { Component: Stage2b, props: { rewrittingData }, label: "Rewrite · Experience" },
            { Component: Stage2c, props: { rewrittingData }, label: "Rewrite · Projects" },
            { Component: Stage2d, props: { rewrittingData }, label: "Rewrite · Skills" },
            { Component: Stage3, props: { profileAssebly }, label: "Coherence Analysis" },
            { Component: Stage4, props: { skillGapData }, label: "Skill Gap" },
            { Component: Stage5, props: { growthData }, label: "Growth Recommendations" },
        ],
        [auditData, strategyData, rewrittingData, profileAssebly, skillGapData, growthData]
    );

    // Mounts exactly one stage into the shared hidden container, waits for
    // it to paint, captures it, then tears it down immediately — instead of
    // keeping all 9 animated stages alive in memory for the whole run.
    const captureStage = useCallback(async ({ Component, props, label }, container) => {
        const root = createRoot(container);

        root.render(
            <MotionConfig reducedMotion="always">
                <div className="bg-white">
                    <Component {...props} />
                </div>
            </MotionConfig>
        );

        await waitForPaint();
        await waitForImages(container);

        if (document.fonts?.ready) {
            try {
                await document.fonts.ready;
            } catch {
                // non-fatal — proceed with whatever fonts are already loaded
            }
        }

        const captureOptions = {
            scale: Math.min(2, window.devicePixelRatio || 1),
            useCORS: true,
            backgroundColor: "#ffffff",
            imageTimeout: 0,
            onclone: (doc) => {
                doc.documentElement.removeAttribute("data-theme");
                const style = doc.createElement("style");
                style.innerHTML = PDF_CAPTURE_STYLES;
                doc.head.appendChild(style);
            },
        };

        let canvas = await html2canvas(container, captureOptions);

        // A 0-width/height canvas means the stage hadn't actually finished
        // laying out yet (async data, late image, etc). Give it one more
        // beat and recapture before giving up — this is what was silently
        // producing NaN image dimensions and crashing jsPDF's addImage.
        if (!canvas.width || !canvas.height) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            canvas = await html2canvas(container, captureOptions);
        }

        root.unmount();

        if (!canvas.width || !canvas.height) {
            throw new Error(
                `"${label}" rendered with zero size — check that its data prop is populated before export.`
            );
        }

        return canvas;
    }, []);

    const downloadPDF = useCallback(async () => {
        if (downloading) return;

        const container = captureContainerRef.current;
        if (!container) return;

        setDownloading(true);
        setProgress({ index: 0, total: pdfStages.length, label: "" });

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        try {
            for (let i = 0; i < pdfStages.length; i++) {
                setProgress({
                    index: i + 1,
                    total: pdfStages.length,
                    label: pdfStages[i].label,
                });

                const canvas = await captureStage(pdfStages[i], container);

                // JPEG at 0.95 is visually lossless for UI screenshots and
                // encodes/embeds far faster than PNG on large canvases.
                const imgData = canvas.toDataURL("image/jpeg", 0.95);

                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (!Number.isFinite(imgWidth) || !Number.isFinite(imgHeight) || imgHeight <= 0) {
                    throw new Error(
                        `Computed an invalid image size for "${pdfStages[i].label}" (${imgWidth}x${imgHeight}).`
                    );
                }

                let heightLeft = imgHeight;
                let position = 0;

                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }

                // Hand control back to the browser between stages so the
                // progress UI actually repaints and the tab never appears frozen.
                await new Promise((resolve) => setTimeout(resolve, 0));
            }

            pdf.save("Career-Analysis.pdf");
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally {
            setDownloading(false);
            setProgress({ index: 0, total: 0, label: "" });
            // Make sure nothing is left mounted in the capture container.
            try {
                createRoot(container).unmount();
            } catch {
                // container already empty — fine
            }
        }
    }, [downloading, pdfStages, captureStage]);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10 py-6">
            <div className="mx-auto flex flex-col md:flex-row items-center justify-center gap-5 lg:gap-8 max-w-5xl">
                {/* Download Analysis */}
                <button
                    onClick={downloadPDF}
                    disabled={downloading}
                    aria-busy={downloading}
                    className="w-full md:w-1/2 rounded-full bg-black text-white py-5 px-6 transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {downloading ? (
                        <div className="w-full mx-auto flex flex-col items-center gap-1 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12">
                                    <animateTransform attributeName="transform" attributeType="XML" dur="560ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate"></animateTransform>
                                </path>
                            </svg>
                            <p className="text-xs sm:text-sm font-medium text-neutral-300 text-center">
                                {progress.total > 0
                                    ? `Rendering ${progress.index}/${progress.total} · ${progress.label}`
                                    : "Preparing…"}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm sm:text-base lg:text-lg font-semibold leading-relaxed text-center">
                            Download the Analysis
                            <br />
                            <span className="text-neutral-300 font-medium">
                                & Improve the Career Profile
                            </span>
                        </p>
                    )}
                </button>

                {/* Create Resume */}
                <button className="w-full md:w-1/2 rounded-full bg-black text-white py-5 px-6 transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900 active:scale-95">
                    <p className="text-sm sm:text-base lg:text-lg font-semibold leading-relaxed text-center">
                        Create Resume from
                        <br />
                        <span className="text-neutral-300 font-medium">
                            Rewritten Data Sets
                        </span>
                    </p>
                </button>
            </div>

            {/* Single reusable off-screen capture target — only ever holds ONE
                stage at a time instead of all 9 mounted simultaneously. */}
            <div
                ref={captureContainerRef}
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "794px", // A4 width at 96dpi
                    background: "#fff",
                    zIndex: -1,
                    opacity: 0,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
};

export default AfterCompletion;