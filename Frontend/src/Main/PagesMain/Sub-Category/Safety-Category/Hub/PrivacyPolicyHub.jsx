import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../../../../Nav';
import Footer from '../../../../Footer';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
    {
        id: 'information-we-collect',
        num: '01',
        title: 'Information We Collect',
        intro: 'We collect only necessary data for legitimate purposes with your clear, informed, freely given, specific, and withdrawable consent.',
        subsections: [
            {
                heading: '1.1 Personal Data (Identifiable Information)',
                items: [
                    { label: 'Account / Profile', text: 'Name, email address, phone number, college or company name, profile photo, and location (city/state).' },
                    { label: 'Professional Data', text: 'Skills, education, work experience, projects, internships, certifications, achievements, GitHub and LinkedIn profile links.' },
                    { label: 'Resume Data', text: 'Information provided during onboarding or AI-assisted resume generation — including job history and skills matching inputs.' },
                    { label: 'Communication', text: 'Messages, files, voice and video recordings generated within collaboration workspaces and project channels.' },
                ],
            },
            {
                heading: '1.2 Usage & Technical Data',
                items: [
                    { label: 'Activity Logs', text: 'Login times, feature usage patterns (e.g., scheduler interactions, dashboard views), and productivity metrics.' },
                    { label: 'Device Info', text: 'IP address, browser type, operating system, device ID, and approximate location (used for security purposes only).' },
                    { label: 'Analytics', text: 'Aggregated platform trends such as team contributions and bottleneck analysis — anonymised wherever possible.' },
                ],
            },
            {
                heading: '1.3 Sensitive Data',
                items: [
                    { label: 'Minimal collection', text: 'We collect no financial or health data. Passwords are bcrypt-hashed; OTPs are stored temporarily in Redis with a 5-minute expiry and are never logged.' },
                    { label: 'Age restriction', text: 'We do not knowingly collect data from persons under 18 years of age. Parental consent is required where applicable under the DPDP Act 2023.' },
                ],
            },
        ],
    },
    {
        id: 'how-we-collect',
        num: '02',
        title: 'How We Collect Data',
        bullets: [
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><g fill="none"><path fill="url(#SVG8vVuobfw)" d="M14.188 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l2 5l5 2v7.188z"></path><path fill="url(#SVG4wnbzb0z)" fillOpacity={0.25} d="M14.188 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l2 5l5 2v7.188z"></path><path fill="url(#SVG81X8GbEl)" d="M13 7.5V2l7 7h-5.5A1.5 1.5 0 0 1 13 7.5"></path><path fill="url(#SVG20GZkc1q)" d="M20.585 14.456h-3.241l-4.142 4.146a3 3 0 0 0-.178.196v3.208h3.25a3 3 0 0 0 .171-.157l4.14-4.144z"></path><path fill="url(#SVGvgxJzcVb)" d="M16.28 21.998a2.7 2.7 0 0 1-1.087.556l-1.837.46a1.09 1.09 0 0 1-1.322-1.324l.459-1.84a2.7 2.7 0 0 1 .534-1.06a4.3 4.3 0 0 0 3.252 3.208"></path><path fill="url(#SVGS6WNEb0M)" d="m17.574 14.235l1.56-1.562a2.29 2.29 0 0 1 3.244 0c.896.896.896 2.35 0 3.246l-1.44 1.443z"></path><path fill="url(#SVGYefgNtXi)" d="M21.824 16.477a4.3 4.3 0 0 1-3.262-3.249l-1.227 1.228a4.3 4.3 0 0 0 3.263 3.249z"></path><defs><linearGradient id="SVG8vVuobfw" x1={15.2} x2={16.822} y1={2} y2={18.87} gradientUnits="userSpaceOnUse"><stop stopColor="#6ce0ff"></stop><stop offset={1} stopColor="#4894fe"></stop></linearGradient><linearGradient id="SVG81X8GbEl" x1={16.488} x2={14.738} y1={4.917} y2={7.833} gradientUnits="userSpaceOnUse"><stop stopColor="#9ff0f9"></stop><stop offset={1} stopColor="#b3e0ff"></stop></linearGradient><linearGradient id="SVG20GZkc1q" x1={15.03} x2={18.73} y1={16.308} y2={20.018} gradientUnits="userSpaceOnUse"><stop stopColor="#ffa43d"></stop><stop offset={1} stopColor="#fb5937"></stop></linearGradient><linearGradient id="SVGvgxJzcVb" x1={11.387} x2={14.456} y1={19.976} y2={23.042} gradientUnits="userSpaceOnUse"><stop offset={0.255} stopColor="#ffd394"></stop><stop offset={1} stopColor="#ff921f"></stop></linearGradient><linearGradient id="SVGS6WNEb0M" x1={21.904} x2={19.926} y1={13.116} y2={15.016} gradientUnits="userSpaceOnUse"><stop stopColor="#f97dbd"></stop><stop offset={1} stopColor="#dd3ce2"></stop></linearGradient><linearGradient id="SVGYefgNtXi" x1={19.657} x2={16.488} y1={16.292} y2={14.902} gradientUnits="userSpaceOnUse"><stop stopColor="#ff921f"></stop><stop offset={1} stopColor="#ffe994"></stop></linearGradient><radialGradient id="SVG4wnbzb0z" cx={0} cy={0} r={1} gradientTransform="rotate(133.623 9.771 5.739)scale(12.562 7.41695)" gradientUnits="userSpaceOnUse"><stop offset={0.362} stopColor="#4a43cb"></stop><stop offset={1} stopColor="#4a43cb" stopOpacity={0}></stop></radialGradient></defs></g></svg>), label: 'Directly from you', text: 'Through registration forms, onboarding flows, file uploads, and in-platform messages.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48"><path fill="#45413c" d="M4.5 45.5a19.5 1.5 0 1 0 39 0a19.5 1.5 0 1 0-39 0" opacity={0.15}></path><path fill="#daedf7" d="M42 40.5a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V27a18 18 0 0 1 36 0Z"></path><path fill="#fff" d="M24 9A18 18 0 0 0 6 27v5a18 18 0 0 1 36 0v-5A18 18 0 0 0 24 9"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M42 40.5a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V27a18 18 0 0 1 36 0Z" strokeWidth={1}></path><path fill="#c0dceb" d="M17.5 34h13v12h-13Z"></path><path fill="#adc4d9" d="M17.5 38.5h13v2h-13z"></path><path fill="#adc4d9" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M45.5 35.92a1 1 0 0 1-.5.87l-3 1.71V26l3 1.71a1 1 0 0 1 .5.87Zm-43 0a1 1 0 0 0 .5.87l3 1.71V26l-3 1.71a1 1 0 0 0-.5.87Z" strokeWidth={1}></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M24 9a9 9 0 0 1 10.5-6.73" strokeWidth={1}></path><path fill="#ff6242" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M33.5 3.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0" strokeWidth={1}></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M17.5 34h13v12h-13Z" strokeWidth={1}></path><path fill="#ff6242" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M19.5 34h9a2 2 0 0 1 2 2v2.5h0h-13h0V36a2 2 0 0 1 2-2" strokeWidth={1}></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M33.5 11.71a18 18 0 0 0-19 0V24h19Z" strokeWidth={1}></path><path fill="#00dfeb" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M27.5 25a5 5 0 1 0 10 0a5 5 0 1 0-10 0" strokeWidth={1}></path><path fill="#627b8c" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M30.5 25a2 2 0 1 0 4 0a2 2 0 1 0-4 0" strokeWidth={1}></path><path fill="#00dfeb" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M10.5 25a5 5 0 1 0 10 0a5 5 0 1 0-10 0" strokeWidth={1}></path><path fill="#627b8c" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M13.5 25a2 2 0 1 0 4 0a2 2 0 1 0-4 0" strokeWidth={1}></path></svg>), label: 'Automatically', text: 'Via cookies, server logs, and analytics tools such as Google Analytics (opt-out available in your privacy settings).' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 20 20"><g fill="none"><path fill="url(#SVGqUKwIcKg)" fillRule="evenodd" d="M5 4h6a4 4 0 0 1 0 8H5a4 4 0 0 1 0-8m6 2H5a2 2 0 1 0 0 4h6a2 2 0 1 0 0-4" clipRule="evenodd"></path><path fill="url(#SVGr4G4Obkb)" fillRule="evenodd" d="M5 4h6a4 4 0 0 1 0 8H5a4 4 0 0 1 0-8m6 2H5a2 2 0 1 0 0 4h6a2 2 0 1 0 0-4" clipRule="evenodd"></path><path fill="url(#SVGXD4F1bax)" fillRule="evenodd" d="M5 4h6a4 4 0 0 1 0 8H5a4 4 0 0 1 0-8m6 2H5a2 2 0 1 0 0 4h6a2 2 0 1 0 0-4" clipRule="evenodd"></path><path fill="url(#SVG9u1iEqQL)" d="M13 8H9a4 4 0 1 0 0 8h6a4 4 0 0 0 0-8c0 .729-.195 1.412-.535 2H15a2 2 0 1 1 0 4H9a2 2 0 1 1 0-4h2a2 2 0 0 0 2-2"></path><path fill="url(#SVGKVE8HesJ)" d="M13 8H9a4 4 0 1 0 0 8h6a4 4 0 0 0 0-8c0 .729-.195 1.412-.535 2H15a2 2 0 1 1 0 4H9a2 2 0 1 1 0-4h2a2 2 0 0 0 2-2"></path><path fill="url(#SVGRQroUdwy)" d="M13 8H9a4 4 0 1 0 0 8h6a4 4 0 0 0 0-8c0 .729-.195 1.412-.535 2H15a2 2 0 1 1 0 4H9a2 2 0 1 1 0-4h2a2 2 0 0 0 2-2"></path><defs><radialGradient id="SVGqUKwIcKg" cx={0} cy={0} r={1} gradientTransform="rotate(36.948 -5.168 4.449)scale(14.3329 12.726)" gradientUnits="userSpaceOnUse"><stop stopColor="#0fafff"></stop><stop offset={0.429} stopColor="#367af2"></stop><stop offset={0.942} stopColor="#5750e2"></stop><stop offset={1} stopColor="#6f47df"></stop></radialGradient><radialGradient id="SVGr4G4Obkb" cx={0} cy={0} r={1} gradientTransform="matrix(-6 0 0 -5.8875 9 12)" gradientUnits="userSpaceOnUse"><stop offset={0.229} stopColor="#261d82" stopOpacity={0}></stop><stop offset={0.396} stopColor="#261d82"></stop><stop offset={0.578} stopColor="#261d82"></stop><stop offset={0.781} stopColor="#261d82" stopOpacity={0}></stop></radialGradient><radialGradient id="SVGKVE8HesJ" cx={0} cy={0} r={1} gradientTransform="matrix(6 0 0 5.8875 11 8)" gradientUnits="userSpaceOnUse"><stop offset={0.229} stopColor="#2764e7" stopOpacity={0}></stop><stop offset={0.396} stopColor="#2764e7"></stop><stop offset={0.578} stopColor="#2764e7"></stop><stop offset={0.781} stopColor="#2764e7" stopOpacity={0}></stop></radialGradient><linearGradient id="SVGXD4F1bax" x1={13.5} x2={8} y1={13} y2={4.5} gradientUnits="userSpaceOnUse"><stop stopColor="#5157e4" stopOpacity={0}></stop><stop offset={0.066} stopColor="#5157e4"></stop><stop offset={0.273} stopColor="#5157e4"></stop><stop offset={0.6} stopColor="#5157e4" stopOpacity={0}></stop></linearGradient><linearGradient id="SVG9u1iEqQL" x1={0.5} x2={7.538} y1={4.5} y2={23.02} gradientUnits="userSpaceOnUse"><stop stopColor="#36dff1"></stop><stop offset={1} stopColor="#2764e7"></stop></linearGradient><linearGradient id="SVGRQroUdwy" x1={9.5} x2={13} y1={5} y2={11} gradientUnits="userSpaceOnUse"><stop stopColor="#31b3ee" stopOpacity={0.243}></stop><stop offset={0.208} stopColor="#31b3ee"></stop><stop offset={0.569} stopColor="#31b3ee"></stop><stop offset={0.878} stopColor="#31b3ee" stopOpacity={0}></stop></linearGradient></defs></g></svg>), label: 'From third parties', text: 'Through OAuth integrations (e.g., GitHub), or when collaborators share data with you on the Platform.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512"><path fill="#fff" d="M228.844 32.22v114.218h17.687V32.218h-17.686zm-108.25.624c-15.507 0-28.094 12.586-28.094 28.093S105.087 89 120.594 89c12.655 0 23.34-8.372 26.844-19.875h44.937v77.313h17.688v-95H147.03c-3.888-10.837-14.262-18.593-26.436-18.593zm193.25 0c-15.507 0-28.063 12.586-28.063 28.093c0 12.124 7.677 22.45 18.44 26.376v59.124h17.655V87.844c11.596-3.452 20.063-14.193 20.063-26.906c0-15.508-12.587-28.094-28.094-28.094zM266.124 92.5v53.938h17.657V92.5h-17.655zm188.532 4.03c-15.507 0-28.094 12.588-28.094 28.095c0 13.083 8.948 24.074 21.063 27.188v27.468h-92.938v17.657h110.624v-46.342c10.223-4.192 17.407-14.233 17.407-25.97c0-15.507-12.557-28.094-28.064-28.094zM30.187 123.657v17.688H96.75v55.594h62.814V179.28h-45.126v-55.624zm147.032 40.47v159.718h159.81v-159.72H177.22zm17.56 15.655h17.657v78.595l32.407 32.406h75.28v17.658H237.5l-2.594-2.594l-10.75-10.75c-1.033 7.385-7.36 13.062-15.03 13.062c-8.392 0-15.19-6.796-15.19-15.187c0-7.682 5.696-13.98 13.095-15l-9.655-9.658l-2.594-2.593V179.78zm54.94.157h17.686v55.313h52.53l.002 17.688H249.72v-73zM53.124 217.375v89.969c-11.49 3.512-19.844 14.198-19.844 26.844c0 15.505 12.557 28.093 28.064 28.093s28.093-12.587 28.093-28.092c0-12.195-7.79-22.564-18.656-26.438v-72.72h88.782v-17.655H53.124zm301.563 0v17.656h53.968v-17.655h-53.97zm99.968 21.97c-10.898 0-20.342 6.21-25 15.28h-74.97l.002 17.688H427c2.325 13.168 13.824 23.187 27.656 23.187c15.507 0 28.063-12.588 28.063-28.094s-12.557-28.062-28.064-28.062zm-349.062 15.28v17.688h53.97v-17.688zm17.156 36.47v84.217c-11.498 3.513-19.875 14.2-19.875 26.844c0 15.506 12.587 28.094 28.094 28.094c15.506 0 28.06-12.588 28.06-28.094c0-12.194-7.766-22.564-18.624-26.437v-66.94h19.156v-17.686h-36.81zm231.938 0v17.686h45.156v95.283c-11.323 3.624-19.53 14.26-19.53 26.78c-.002 15.506 12.585 28.063 28.092 28.063s28.063-12.557 28.063-28.062c0-12.32-7.935-22.778-18.97-26.563V291.095h-62.814zM192.375 341.53v54.033h17.688V341.53zm36.47 0v86.564c-11.013 3.794-18.94 14.233-18.94 26.53c0 15.506 12.588 28.095 28.095 28.095s28.063-12.59 28.063-28.095c0-12.53-8.203-23.14-19.532-26.75V341.53zm37.28 0v54.033h17.688l-.032-54.032h-17.655zm38.094 0v140.064h17.655V341.53H304.22z"></path></svg>), label: 'AI processing', text: 'Our resume engine analyses your inputs to generate tailored, ATS-friendly resume outputs and role-matching suggestions.' },
        ],
    },
    {
        id: 'how-we-use',
        num: '03',
        title: 'How We Use Your Data',
        intro: 'We process your data only for specified, lawful purposes under the DPDP Act 2023 — either with your explicit consent or on the basis of contract performance, legitimate interest, or legal obligation.',
        table: [
            { purpose: 'Provide Services', data: 'Profile, resume data, communications', basis: 'Contract performance / Consent' },
            { purpose: 'Personalise experience', data: 'Skills, usage data', basis: 'Consent' },
            { purpose: 'Improve Platform & AI models', data: 'Anonymised usage, opt-in data', basis: 'Legitimate interest / Consent' },
            { purpose: 'Security & fraud prevention', data: 'IP address, logs, activity', basis: 'Legitimate interest' },
            { purpose: 'Communications & support', data: 'Email, messages', basis: 'Consent' },
            { purpose: 'Legal compliance & disputes', data: 'Relevant data', basis: 'Legal obligation' },
        ],
        footer: 'AI-generated outputs (e.g., resumes) are derived from your data and provided "AS IS". We make no guarantees of accuracy, completeness, or job-placement outcomes. Always review AI outputs before use.',
    },
    {
        id: 'data-sharing',
        num: '04',
        title: 'Data Sharing & Disclosure',
        intro: 'We DO NOT sell, rent, or trade your personal data. Disclosure occurs only in the following strictly limited circumstances:',
        bullets: [
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48"><g fill="none"><path fill="url(#SVGlROO8bHf)" d="M24 9c-6.29 0-11.45 4.84-11.959 11H11.5a8.5 8.5 0 0 0 0 17h25a8.5 8.5 0 0 0 0-17h-.541C35.45 13.84 30.29 9 24 9"></path><path fill="url(#SVGyCyLqdjA)" fillOpacity={0.3} d="M20 28.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0"></path><path fill="url(#SVGblF96ciL)" fillOpacity={0.3} d="M24 33c6.627 0 12-5.373 12-12S30.627 9 24 9c-6.296 0-11.46 4.85-11.96 11.017a8.5 8.5 0 0 1 7.2 12.002C20.7 32.65 22.309 33 24 33"></path><path fill="url(#SVGsArCpeLq)" d="M24 33c6.627 0 12-5.373 12-12S30.627 9 24 9c-6.296 0-11.46 4.85-11.96 11.017a8.5 8.5 0 0 1 7.2 12.002C20.7 32.65 22.309 33 24 33"></path><path fill="url(#SVGm3jLDdWK)" fillOpacity={0.25} d="M24 9c-6.29 0-11.45 4.84-11.959 11H11.5a8.5 8.5 0 0 0 0 17h25a8.5 8.5 0 0 0 0-17h-.541C35.45 13.84 30.29 9 24 9"></path><defs><linearGradient id="SVGlROO8bHf" x1={4.5} x2={22.079} y1={14.25} y2={41.645} gradientUnits="userSpaceOnUse"><stop stopColor="#0fafff"></stop><stop offset={1} stopColor="#367af2"></stop></linearGradient><linearGradient id="SVGyCyLqdjA" x1={3} x2={14.46} y1={22.912} y2={33.055} gradientUnits="userSpaceOnUse"><stop stopColor="#fff"></stop><stop offset={1} stopColor="#fcfcfc" stopOpacity={0}></stop></linearGradient><linearGradient id="SVGblF96ciL" x1={16.193} x2={19.363} y1={10.35} y2={26.899} gradientUnits="userSpaceOnUse"><stop stopColor="#fff"></stop><stop offset={1} stopColor="#fcfcfc" stopOpacity={0}></stop></linearGradient><radialGradient id="SVGsArCpeLq" cx={0} cy={0} r={1} gradientTransform="rotate(-22.883 77.27 -17.737)scale(14.6589 13.0847)" gradientUnits="userSpaceOnUse"><stop offset={0.412} stopColor="#2c87f5"></stop><stop offset={1} stopColor="#2c87f5" stopOpacity={0}></stop></radialGradient><radialGradient id="SVGm3jLDdWK" cx={0} cy={0} r={1} gradientTransform="rotate(62.445 5.145 21.978)scale(34.9921 259.97)" gradientUnits="userSpaceOnUse"><stop offset={0.5} stopColor="#dd3ce2" stopOpacity={0}></stop><stop offset={1} stopColor="#dd3ce2"></stop></radialGradient></defs></g></svg>), label: 'Service providers', text: 'Cloud hosts (AWS/GCP), email delivery (SendGrid), anonymised analytics, and payment gateways (Razorpay) — all operating under DPDP-compliant data processing agreements.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><g fill="none"><path fill="url(#SVGhZdyleXp)" d="M20.25 10c.967 0 1.75.784 1.75 1.75V15a4 4 0 1 1-8-.001V11.75a1.75 1.75 0 0 1 1.607-1.744z"></path><path fill="url(#SVGS3LRTdtw)" fillOpacity={0.25} d="M20.25 10c.967 0 1.75.784 1.75 1.75V15a4 4 0 1 1-8-.001V11.75a1.75 1.75 0 0 1 1.607-1.744z"></path><path fill="url(#SVGQAaiVcet)" d="M8.25 10c.967 0 1.75.784 1.75 1.75V15a4 4 0 1 1-8-.001V11.75a1.75 1.75 0 0 1 1.606-1.744z"></path><path fill="url(#SVGiO87M56u)" fillOpacity={0.25} d="M8.25 10c.967 0 1.75.784 1.75 1.75V15a4 4 0 1 1-8-.001V11.75a1.75 1.75 0 0 1 1.606-1.744z"></path><path fill="url(#SVGzzYbYcTQ)" d="M14.754 10c.966 0 1.75.784 1.75 1.75v4.749a4.501 4.501 0 0 1-9.002 0V11.75c0-.966.783-1.75 1.75-1.75z"></path><path fill="url(#SVGLO3kxdrU)" d="M14.754 10c.966 0 1.75.784 1.75 1.75v4.749a4.501 4.501 0 0 1-9.002 0V11.75c0-.966.783-1.75 1.75-1.75z"></path><path fill="url(#SVGrughhcvJ)" d="M18.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"></path><path fill="url(#SVGNr4bseCi)" d="M5.5 4a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"></path><path fill="url(#SVGcolyeckW)" d="M12 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6"></path><defs><linearGradient id="SVGhZdyleXp" x1={15.902} x2={20.703} y1={11.196} y2={18.011} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#7a41dc"></stop><stop offset={1} stopColor="#5b2ab5"></stop></linearGradient><linearGradient id="SVGQAaiVcet" x1={3.903} x2={8.703} y1={11.196} y2={18.011} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#7a41dc"></stop></linearGradient><linearGradient id="SVGzzYbYcTQ" x1={9.643} x2={15.657} y1={11.462} y2={19.322} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#bd96ff"></stop><stop offset={1} stopColor="#9c6cfe"></stop></linearGradient><linearGradient id="SVGLO3kxdrU" x1={12.003} x2={21.131} y1={8.69} y2={22.648} gradientUnits="userSpaceOnUse"><stop stopColor="#885edb" stopOpacity={0}></stop><stop offset={1} stopColor="#e362f8"></stop></linearGradient><linearGradient id="SVGrughhcvJ" x1={17.189} x2={19.737} y1={4.665} y2={8.734} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#7a41dc"></stop><stop offset={1} stopColor="#5b2ab5"></stop></linearGradient><linearGradient id="SVGNr4bseCi" x1={4.189} x2={6.737} y1={4.665} y2={8.734} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#7a41dc"></stop></linearGradient><linearGradient id="SVGcolyeckW" x1={10.427} x2={13.485} y1={3.798} y2={8.68} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#bd96ff"></stop><stop offset={1} stopColor="#9c6cfe"></stop></linearGradient><radialGradient id="SVGS3LRTdtw" cx={0} cy={0} r={1} gradientTransform="matrix(6.43822 0 0 12.2867 12.743 14.29)" gradientUnits="userSpaceOnUse"><stop offset={0.433} stopColor="#3b148a"></stop><stop offset={1} stopColor="#3b148a" stopOpacity={0}></stop></radialGradient><radialGradient id="SVGiO87M56u" cx={0} cy={0} r={1} gradientTransform="matrix(-7.12497 0 0 -13.5973 12.592 14.29)" gradientUnits="userSpaceOnUse"><stop offset={0.433} stopColor="#3b148a"></stop><stop offset={1} stopColor="#3b148a" stopOpacity={0}></stop></radialGradient></defs></g></svg>), label: 'Collaborators', text: 'Workspace and project members can see content you choose to share within shared spaces. Project leaders control access permissions.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="#fff" d="M12 3c-1.27 0-2.4.8-2.82 2H3v2h1.95L2 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3L6.05 7h3.12c.33.85.98 1.5 1.83 1.83V20H2v2h20v-2h-9V8.82c.85-.32 1.5-.97 1.82-1.82h3.13L15 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3l-2.95-7H21V5h-6.17C14.4 3.8 13.27 3 12 3m0 2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-6.5 5.25L7 14H4zm13 0L20 14h-3z"></path></svg>), label: 'Legal & regulatory authorities', text: 'In response to court orders, fraud prevention requirements, or national security obligations as required by applicable law including the DPDP Act 2023.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48"><path fill="#45413c" d="M1.62 38.75a22.38 1.64 0 1 0 44.76 0a22.38 1.64 0 1 0-44.76 0" opacity={0.15}></path><path fill="#e4ffd1" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M3.08 32.13h41.84v3.55a2.18 2.18 0 0 1-2.18 2.18H5.26a2.18 2.18 0 0 1-2.18-2.18z" strokeWidth={1}></path><path fill="#e4ffd1" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M3.08 29.27h41.84v3.55A2.18 2.18 0 0 1 42.74 35H5.26a2.18 2.18 0 0 1-2.18-2.18z" strokeWidth={1}></path><path fill="#debb7e" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M18.41 32.13h11.18v6.21a.55.55 0 0 1-.55.55H19a.55.55 0 0 1-.55-.55v-6.21z" strokeWidth={1}></path><path fill="#f0ffe5" d="M3.08 9.57h41.84v22.56H3.08Z"></path><path fill="#fff" d="M42.74 9.57H5.26a2.19 2.19 0 0 0-2.18 2.19v3.78a2.19 2.19 0 0 1 2.18-2.18h37.48a2.19 2.19 0 0 1 2.18 2.18v-3.78a2.19 2.19 0 0 0-2.18-2.19"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M3.08 9.57h41.84v22.56H3.08Z" strokeWidth={1}></path><path fill="#f0d5a8" d="M19 8.5h10a.55.55 0 0 1 .55.55v23.08H18.41V9a.55.55 0 0 1 .59-.5"></path><path fill="#f7e5c6" d="M29.05 8.5H19a.54.54 0 0 0-.54.55v3.37a.54.54 0 0 1 .54-.54h10.1a.54.54 0 0 1 .54.54V9.05a.54.54 0 0 0-.59-.55"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M19 8.5h10a.55.55 0 0 1 .55.55v23.08h0h-11.14h0V9a.55.55 0 0 1 .59-.5" strokeWidth={1}></path><path fill="#c8ffa1" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M29.59 13.44h10.05a1.09 1.09 0 0 1 1.09 1.09v12.64a1.09 1.09 0 0 1-1.09 1.09H29.59h0zM18.41 28.26H8.36a1.09 1.09 0 0 1-1.09-1.09V14.53a1.09 1.09 0 0 1 1.09-1.09h10.05z" strokeWidth={1}></path><path fill="#45413c" d="M12.45 23.31v-1.66l-.72-.23a3.4 3.4 0 0 1-.74-.35a1.56 1.56 0 0 1-.5-.55a1.8 1.8 0 0 1-.19-.84a2.1 2.1 0 0 1 .29-1.1a2.24 2.24 0 0 1 .77-.79a2.9 2.9 0 0 1 1.09-.36v-.29a2 2 0 0 1 0-.26a.26.26 0 0 1 .07-.15a.27.27 0 0 1 .19-.06c.12 0 .2 0 .22.11a1 1 0 0 1 .05.36v.3a3.4 3.4 0 0 1 1.18.26a.79.79 0 0 1 .56.72a.8.8 0 0 1-.18.53a.63.63 0 0 1-.48.21a1.7 1.7 0 0 1-.53-.12a3 3 0 0 0-.55-.15v1.33a8 8 0 0 1 1.14.41a1.85 1.85 0 0 1 1.12 1.82a2.2 2.2 0 0 1-.17.9a2.1 2.1 0 0 1-.49.7a2.4 2.4 0 0 1-.73.48a3.3 3.3 0 0 1-.87.21v.56a.27.27 0 0 1-.08.16a.25.25 0 0 1-.18.07c-.12 0-.2 0-.23-.12a1.1 1.1 0 0 1 0-.35v-.31a5.6 5.6 0 0 1-1-.12a2.1 2.1 0 0 1-.84-.34a.75.75 0 0 1-.35-.64a.7.7 0 0 1 .18-.5a.6.6 0 0 1 .48-.21a2.5 2.5 0 0 1 .73.18a4 4 0 0 0 .76.19m0-3.28v-1.14a.8.8 0 0 0-.38.22a.56.56 0 0 0-.15.39a.38.38 0 0 0 .13.3a1.3 1.3 0 0 0 .4.2Zm.55 1.78v1.46a.82.82 0 0 0 .47-.29a.8.8 0 0 0 .18-.51c-.01-.29-.23-.47-.65-.66"></path><path fill="#6dd627" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M37.55 20.85a2.39 2.39 0 1 1-2.39-2.39a2.39 2.39 0 0 1 2.39 2.39" strokeWidth={1}></path></svg>), label: 'Business transfers', text: 'In the event of a merger, acquisition, or asset sale, with advance notice provided to affected users.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.5 7.538a3.375 3.375 0 1 0 0-6.75a3.375 3.375 0 0 0 0 6.75m4.75 3.75a6.027 6.027 0 0 0-9.5 0"></path><path strokeLinecap="round" strokeLinejoin="round" d="M21.875 4.275A6.8 6.8 0 0 1 20 4.538a6.73 6.73 0 0 1-4.568-1.78M5.5 19.288a3.375 3.375 0 1 0 0-6.75a3.375 3.375 0 0 0 0 6.75m4.749 3.75a6.026 6.026 0 0 0-9.5 0"></path><path strokeLinecap="round" strokeLinejoin="round" d="M8.875 16.024a6.76 6.76 0 0 1-6.443-1.516m2.839-4.546a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9"></path><path strokeLinecap="round" strokeLinejoin="round" d="m3.471 5.912l.975.974a.45.45 0 0 0 .684-.056l1.941-2.718"></path><path d="M12.5 19.788a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75m3-2.125a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75m3-2.125a.375.375 0 0 1 0-.75m0 .75a.375.375 0 0 0 0-.75"></path></g></svg>), label: 'With your consent', text: 'For any purpose not listed above, including marketing partnerships, only upon obtaining your explicit prior consent.' },
        ],
    },
    {
        id: 'cross-border',
        num: '05',
        title: 'Cross-Border Data Transfers',
        content: [
            { heading: 'Primary Storage', text: 'Your data is stored primarily in India on secure MongoDB servers with encrypted backups.' },
            { heading: 'International Transfers', text: 'Where data is transferred to US or EU-based providers (e.g., AWS), we ensure appropriate safeguards are in place — including Standard Contractual Clauses or adequacy decisions as recognised under applicable law.' },
            { heading: 'EU Users', text: 'If you access the Platform from the European Union, your rights under the General Data Protection Regulation (GDPR) apply in addition to rights under the DPDP Act 2023.' },
        ],
    },
    {
        id: 'storage-retention-security',
        num: '06',
        title: 'Data Storage, Retention & Security',
        subsections: [
            {
                heading: '6.1 Storage',
                items: [
                    { label: 'Infrastructure', text: 'Data is stored on secure servers located in India. All backups are encrypted and access-controlled.' },
                    { label: 'Credential security', text: 'Passwords are stored using bcrypt hashing. OTPs are stored temporarily in Redis with automatic expiry and are never persisted to primary databases.' },
                ],
            },
            {
                heading: '6.2 Retention',
                items: [
                    { label: 'Retention periods', text: 'Data is retained only as long as necessary for the purposes for which it was collected — for example, account data until you request deletion; security logs for up to 1 year.' },
                    { label: 'Deletion', text: 'Data is securely deleted or pseudonymised when it is no longer required for any specified purpose or legal retention obligation.' },
                ],
            },
            {
                heading: '6.3 Security Measures',
                items: [
                    { label: 'Encryption', text: 'AES-256 encryption applied at rest and in transit across all services and data stores.' },
                    { label: 'Access controls', text: 'Role-based access controls, firewall protections, and regular third-party security audits.' },
                    { label: 'Breach notification', text: 'In the event of a high-risk data breach, we will notify the relevant authorities and affected users within 72 hours in accordance with DPDP Act obligations.' },
                    { label: 'Reporting', text: 'Report any suspected security incidents to dpo@codesarthi.in for immediate investigation.' },
                ],
            },
        ],
    },
    {
        id: 'your-rights',
        num: '07',
        title: 'Your Rights as Data Principal',
        intro: 'Under the Digital Personal Data Protection Act 2023, you have the following rights, exercisable free of charge and fulfilled within 30 days of a verified request:',
        rights: [
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 20 20"><g fill="none"><path fill="url(#SVGCliKdc4T)" d="M15 11v3l-3.958 3.958Q10.53 18 10 18c-1.855 0-3.583-.386-4.865-1.203C3.833 15.967 3 14.69 3 13c0-1.113.903-2 2.009-2z"></path><path fill="url(#SVGPY6wAdUi)" d="M15 11v3l-3.958 3.958Q10.53 18 10 18c-1.855 0-3.583-.386-4.865-1.203C3.833 15.967 3 14.69 3 13c0-1.113.903-2 2.009-2z"></path><path fill="url(#SVGYgfgZbeJ)" fillOpacity={0.75} d="M15 11v3l-3.958 3.958Q10.53 18 10 18c-1.855 0-3.583-.386-4.865-1.203C3.833 15.967 3 14.69 3 13c0-1.113.903-2 2.009-2z"></path><path fill="url(#SVGLCLPEcdo)" fillOpacity={0.75} d="M15 11v3l-3.958 3.958Q10.53 18 10 18c-1.855 0-3.583-.386-4.865-1.203C3.833 15.967 3 14.69 3 13c0-1.113.903-2 2.009-2z"></path><path fill="url(#SVG2nnAlbUk)" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8"></path><path fill="url(#SVGPjczcd1M)" d="M10.148 18.852A.48.48 0 0 0 10.5 19h2a.6.6 0 0 0 .273-.07a.37.37 0 0 0 .149-.172a1 1 0 0 0 .062-.235q.016-.125.016-.257V18q.36-.008.563-.023a.47.47 0 0 0 .304-.118a.46.46 0 0 0 .117-.297Q14 17.368 14 17h.5q.165 0 .266-.07a.5.5 0 0 0 .156-.172a.7.7 0 0 0 .07-.235q.015-.133.016-.273a3 3 0 0 1-.008-.227v-.195q.258.094.523.133q.266.039.54.039a2.87 2.87 0 0 0 2.078-.898q.405-.423.632-.961Q19 13.6 19 13q0-.625-.234-1.172a3 3 0 0 0-.641-.953a3 3 0 0 0-.953-.64A2.9 2.9 0 0 0 16 10q-.61.015-1.148.234a2.9 2.9 0 0 0-.954.625q-.414.407-.656.938a2.7 2.7 0 0 0-.242 1.14q0 .367.086.774l-2.938 2.937A.48.48 0 0 0 10 17v1.5q0 .203.148.352m7.133-7.133a.72.72 0 0 1 .219.531a.72.72 0 0 1-.219.531a.72.72 0 0 1-.531.219a.72.72 0 0 1-.531-.219a.72.72 0 0 1-.219-.531q0-.312.219-.531a.72.72 0 0 1 .531-.219q.312 0 .531.219"></path><defs><linearGradient id="SVGCliKdc4T" x1={6.329} x2={8.591} y1={11.931} y2={19.153} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#7a41dc"></stop></linearGradient><linearGradient id="SVGPY6wAdUi" x1={10} x2={13.167} y1={10.167} y2={22} gradientUnits="userSpaceOnUse"><stop stopColor="#885edb" stopOpacity={0}></stop><stop offset={1} stopColor="#e362f8"></stop></linearGradient><linearGradient id="SVG2nnAlbUk" x1={7.902} x2={11.979} y1={3.063} y2={9.574} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#7a41dc"></stop></linearGradient><linearGradient id="SVGPjczcd1M" x1={19.013} x2={10.465} y1={18.997} y2={12.004} gradientUnits="userSpaceOnUse"><stop stopColor="#ff6f47"></stop><stop offset={1} stopColor="#ffcd0f"></stop></linearGradient><radialGradient id="SVGYgfgZbeJ" cx={0} cy={0} r={1} gradientTransform="rotate(-59.931 24.028 -.59)scale(10.9772 6.09215)" gradientUnits="userSpaceOnUse"><stop stopColor="#0a1852" stopOpacity={0.75}></stop><stop offset={1} stopColor="#0a1852" stopOpacity={0}></stop></radialGradient><radialGradient id="SVGLCLPEcdo" cx={0} cy={0} r={1} gradientTransform="matrix(0 -4 5.375 0 16.5 13.5)" gradientUnits="userSpaceOnUse"><stop stopColor="#0a1852" stopOpacity={0.75}></stop><stop offset={1} stopColor="#0a1852" stopOpacity={0}></stop></radialGradient></defs></g></svg>), right: 'Right to Access', desc: 'Request a summary of the personal data we hold about you and how it is being processed.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><g fill="none"><path fill="url(#SVGdFie5cDw)" d="M8 6.25A2.25 2.25 0 0 1 10.25 4h7.5A2.25 2.25 0 0 1 20 6.25v8.5A2.25 2.25 0 0 1 17.75 17h-7.5A2.25 2.25 0 0 1 8 14.75z"></path><path fill="url(#SVGXYfMve6h)" d="M8 6.25A2.25 2.25 0 0 1 10.25 4h7.5A2.25 2.25 0 0 1 20 6.25v8.5A2.25 2.25 0 0 1 17.75 17h-7.5A2.25 2.25 0 0 1 8 14.75z"></path><path fill="url(#SVGCfFQgeqH)" d="M4 4.25A2.25 2.25 0 0 1 6.25 2h9a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 15.25 17h-9A2.25 2.25 0 0 1 4 14.75z"></path><path fill="url(#SVGBFc5OckO)" d="M5.25 8A2.25 2.25 0 0 0 3 10.25v8.5A3.25 3.25 0 0 0 6.25 22h11.5A3.25 3.25 0 0 0 21 18.75v-1.5A2.25 2.25 0 0 0 18.75 15h-2.846a.75.75 0 0 1-.55-.24l-5.61-6.04A2.25 2.25 0 0 0 8.097 8z"></path><defs><linearGradient id="SVGdFie5cDw" x1={21.8} x2={23.639} y1={19.5} y2={5.773} gradientUnits="userSpaceOnUse"><stop stopColor="#bb45ea"></stop><stop offset={1} stopColor="#9c6cfe"></stop></linearGradient><linearGradient id="SVGXYfMve6h" x1={20} x2={17} y1={8.5} y2={8.5} gradientUnits="userSpaceOnUse"><stop offset={0.338} stopColor="#5750e2" stopOpacity={0}></stop><stop offset={1} stopColor="#5750e2"></stop></linearGradient><linearGradient id="SVGBFc5OckO" x1={6.857} x2={6.857} y1={8} y2={27.091} gradientUnits="userSpaceOnUse"><stop offset={0.241} stopColor="#ffd638"></stop><stop offset={0.637} stopColor="#fab500"></stop><stop offset={0.985} stopColor="#ca6407"></stop></linearGradient><radialGradient id="SVGCfFQgeqH" cx={0} cy={0} r={1} gradientTransform="matrix(8.775 -11.5 18.53666 14.14428 8.05 14)" gradientUnits="userSpaceOnUse"><stop offset={0.228} stopColor="#2764e7"></stop><stop offset={0.685} stopColor="#5cd1ff"></stop><stop offset={1} stopColor="#6ce0ff"></stop></radialGradient></defs></g></svg>), right: 'Right to Correction', desc: 'Request correction of inaccurate, incomplete, or outdated personal data.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 20 20"><g fill="none"><path fill="url(#SVG5mN9ZcVu)" d="m12 6l-2-4H5.5A1.5 1.5 0 0 0 4 3.5v13A1.5 1.5 0 0 0 5.5 18h6l4.5-4.5V8z"></path><path fill="url(#SVGMC1cCbvy)" fillOpacity={0.25} d="m12 6l-2-4H5.5A1.5 1.5 0 0 0 4 3.5v13A1.5 1.5 0 0 0 5.5 18h6l4.5-4.5V8z"></path><path fill="url(#SVG1WutQcjQ)" fillOpacity={0.25} d="m12 6l-2-4H5.5A1.5 1.5 0 0 0 4 3.5v13A1.5 1.5 0 0 0 5.5 18h6l4.5-4.5V8z"></path><path fill="url(#SVGkS1tAb8J)" d="M10.01 6.5V2l6 6h-4.5a1.5 1.5 0 0 1-1.5-1.5"></path><path fill="url(#SVG7OVUGb4A)" d="M14.352 12h2.64v2.646l-3.371 3.376a2.2 2.2 0 0 1-1.02.578l-1.496.375a.89.89 0 0 1-1.078-1.079l.374-1.498a2.2 2.2 0 0 1 .578-1.021z"></path><path fill="url(#SVGwOxhZdgd)" d="M13.485 18.143a2.2 2.2 0 0 1-.884.453l-1.496.375a.89.89 0 0 1-1.078-1.079l.374-1.498c.08-.318.229-.613.436-.864a3.5 3.5 0 0 0 2.648 2.613"></path><path fill="url(#SVGDVKQLbRW)" d="m14.54 11.82l1.271-1.272a1.87 1.87 0 0 1 2.642 2.644l-1.174 1.175z"></path><path fill="url(#SVGTJpfpQeq)" d="M18.002 13.647A3.5 3.5 0 0 1 15.344 11l-.999 1a3.5 3.5 0 0 0 2.658 2.647z"></path><defs><linearGradient id="SVG5mN9ZcVu" x1={12.4} x2={13.782} y1={2} y2={15.479} gradientUnits="userSpaceOnUse"><stop stopColor="#6ce0ff"></stop><stop offset={1} stopColor="#4894fe"></stop></linearGradient><linearGradient id="SVGkS1tAb8J" x1={13} x2={11.5} y1={4.5} y2={7} gradientUnits="userSpaceOnUse"><stop stopColor="#9ff0f9"></stop><stop offset={1} stopColor="#b3e0ff"></stop></linearGradient><linearGradient id="SVG7OVUGb4A" x1={11.855} x2={15.286} y1={13.718} y2={17.149} gradientUnits="userSpaceOnUse"><stop stopColor="#ffa43d"></stop><stop offset={1} stopColor="#fb5937"></stop></linearGradient><linearGradient id="SVGwOxhZdgd" x1={9.501} x2={12.001} y1={16.496} y2={18.993} gradientUnits="userSpaceOnUse"><stop offset={0.255} stopColor="#ffd394"></stop><stop offset={1} stopColor="#ff921f"></stop></linearGradient><linearGradient id="SVGDVKQLbRW" x1={18.067} x2={16.455} y1={10.909} y2={12.456} gradientUnits="userSpaceOnUse"><stop stopColor="#f97dbd"></stop><stop offset={1} stopColor="#dd3ce2"></stop></linearGradient><linearGradient id="SVGTJpfpQeq" x1={16.236} x2={13.655} y1={13.496} y2={12.364} gradientUnits="userSpaceOnUse"><stop stopColor="#ff921f"></stop><stop offset={1} stopColor="#ffe994"></stop></linearGradient><radialGradient id="SVGMC1cCbvy" cx={0} cy={0} r={1} gradientTransform="rotate(131.781 7.69 4.942)scale(9.75567 5.7303)" gradientUnits="userSpaceOnUse"><stop offset={0.362} stopColor="#4a43cb"></stop><stop offset={1} stopColor="#4a43cb" stopOpacity={0}></stop></radialGradient><radialGradient id="SVG1WutQcjQ" cx={0} cy={0} r={1} gradientTransform="matrix(-6 6 -3.21875 -3.21875 15.5 16)" gradientUnits="userSpaceOnUse"><stop offset={0.535} stopColor="#4a43cb"></stop><stop offset={1} stopColor="#4a43cb" stopOpacity={0}></stop></radialGradient></defs></g></svg>), right: 'Right to Erasure', desc: '"Right to be Forgotten" — request deletion of your data, subject to legal retention obligations.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 32 32"><path fill="#26a69a" d="m13.844 7.536l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"></path><path fill="#b2dfdb" d="M21.651 20a6 6 0 1 0 0 4H26v4h4v-4h2v-4ZM16 24a2 2 0 1 1 2-2a2 2 0 0 1-2 2"></path></svg>), right: 'Withdraw Consent', desc: 'Withdraw consent for any processing at any time via Settings → Privacy, without affecting the lawfulness of prior processing.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 32 32"><g fill="none"><path fill="#212121" d="M7.5 18A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.206C26.477 26.418 28 24.394 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"></path><path fill="url(#SVGKCH4Jk8K)" d="M7.5 18A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.206C26.477 26.418 28 24.394 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"></path><path fill="url(#SVGcp1ycBLD)" d="M7.5 18A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.206C26.477 26.418 28 24.394 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"></path><path fill="#242424" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14"></path><path fill="url(#SVGUxDSsduC)" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14"></path><defs><linearGradient id="SVGKCH4Jk8K" x1={9.707} x2={13.584} y1={19.595} y2={31.977} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#7a41dc"></stop></linearGradient><linearGradient id="SVGcp1ycBLD" x1={16} x2={21.429} y1={16.571} y2={36.857} gradientUnits="userSpaceOnUse"><stop stopColor="#885edb" stopOpacity={0}></stop><stop offset={1} stopColor="#e362f8"></stop></linearGradient><linearGradient id="SVGUxDSsduC" x1={12.329} x2={19.464} y1={3.861} y2={15.254} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#7a41dc"></stop></linearGradient></defs></g></svg>), right: 'Nominee Access', desc: 'Designate a nominee to exercise your data rights in the event of your incapacity or death.' },
            { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48"><g fill="none"><path fill="#2859c5" fillRule="evenodd" d="M44.5 19.5a2 2 0 0 1-2 2h-3a2 2 0 1 1 0-4h3a2 2 0 0 1 2 2m-38 0a2 2 0 0 0 2 2h3a2 2 0 1 0 0-4h-3a2 2 0 0 0-2 2m19-19a2 2 0 0 0-2 2v3a2 2 0 1 0 4 0v-3a2 2 0 0 0-2-2M12.064 6.067a2 2 0 0 0 0 2.828l2.122 2.121a2 2 0 1 0 2.828-2.828l-2.121-2.121a2 2 0 0 0-2.829 0m26.87 0a2 2 0 0 1 0 2.828l-2.122 2.121a2 2 0 1 1-2.828-2.828l2.121-2.121a2 2 0 0 1 2.829 0m-16.74 29.41a2 2 0 0 0-1.414 2.45l.594 2.216a2.59 2.59 0 1 1-5.005 1.341l-.495-1.847a2 2 0 0 0-3.864 1.035l.495 1.848a6.59 6.59 0 1 0 12.733-3.412l-.594-2.217a2 2 0 0 0-2.45-1.414" clipRule="evenodd"></path><path fill="#8fbffa" fillRule="evenodd" d="M27.169 10.137a1.5 1.5 0 0 0-2.233 2.004c-8.604 7.6-17.611 16.789-20.875 20.165c-1.181 1.222-1.598 3.056-.881 4.691a19 19 0 0 0 .919 1.855a19 19 0 0 0 1.147 1.724C6.304 42.014 8.1 42.57 9.75 42.158c4.555-1.138 17.015-4.345 27.9-7.996a1.5 1.5 0 0 0 2.85-.935l-.001-.002a13 13 0 0 0-.275-.751a41 41 0 0 0-.924-2.147c-.886-1.928-2.368-4.88-4.773-9.045s-4.22-6.925-5.447-8.656a41 41 0 0 0-1.397-1.874a18 18 0 0 0-.512-.612z" clipRule="evenodd"></path><path fill="#2859c5" d="M33.869 35.396a72 72 0 0 0-1.256-2.88a98 98 0 0 0-4.048-7.789a98 98 0 0 0-4.721-7.399a72 72 0 0 0-1.866-2.527c-.74.676-1.48 1.359-2.212 2.042l.208.271a70 70 0 0 1 1.419 1.944a95 95 0 0 1 4.574 7.17a95 95 0 0 1 3.922 7.546a69 69 0 0 1 1.105 2.517q1.438-.44 2.875-.895"></path></g></svg>), right: 'Right to Grieve', desc: 'Escalate unresolved concerns to our Data Protection Officer (DPO) and further to the Data Protection Board of India.' },
        ],
        footer: 'Exercise your rights via Settings → Privacy → Requests, or email dpo@codesarthi.in.',
    },
    {
        id: 'cookies',
        num: '08',
        title: 'Cookies & Tracking Technologies',
        content: [
            { heading: 'Essential Cookies', text: 'Required for authentication, session management, and core Platform functionality. These cannot be disabled without affecting service operation.' },
            { heading: 'Analytics & Performance', text: 'We use Google Analytics to understand usage patterns and improve the Platform. You may opt out at any time through your privacy settings or the Google Analytics opt-out browser add-on.' },
            { heading: 'Cookie Management', text: 'You can manage or withdraw consent for non-essential cookies through your browser settings or our Cookie Consent Banner, which is displayed upon first visit.' },
            { heading: 'No Ad Tracking', text: 'We do not use targeted advertising cookies or sell browsing data to any advertising network.' },
        ],
    },
    {
        id: 'third-party',
        num: '09',
        title: 'Third-Party Links & Services',
        content: [
            { heading: 'Integrations', text: 'The Platform may integrate with third-party services such as Zoom for video calls and GitHub for developer profiles. These services operate under their own independent privacy policies, which we encourage you to review before connecting.' },
            { heading: 'No Liability', text: 'CodeSarthi is not responsible for the privacy practices or data handling of third-party services accessed through our Platform.' },
        ],
    },
    {
        id: 'childrens-privacy',
        num: '10',
        title: "Children's Privacy",
        content: [
            { heading: 'Age Restriction', text: 'CodeSarthi is not designed for or directed at persons under 18 years of age. We do not knowingly collect personal data from minors.' },
            { heading: 'Discovery & Deletion', text: 'If we become aware that personal data has been collected from a person under 18 without verifiable parental consent, we will immediately delete that data and terminate the associated account.' },
        ],
    },
    {
        id: 'policy-changes',
        num: '11',
        title: 'Changes to This Policy',
        content: [
            { heading: 'Updates', text: 'We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated "Last Updated" date.' },
            { heading: 'Material Changes', text: 'For material changes that affect your rights or how we process your data, we will provide advance notice via email or a prominent Platform notification.' },
            { heading: 'Continued Use', text: 'Your continued use of the Platform after the effective date of any update constitutes your acceptance of the revised Privacy Policy.' },
        ],
    },
    {
        id: 'grievance',
        num: '12',
        title: 'Grievance Redressal',
        content: [
            { heading: 'Data Protection Officer', text: 'Mr. Vineet Singh — dpo@codesarthi.in — reachable at +91-XXXX-XXXXXX during business hours (Monday–Friday, 10:00–18:00 IST).' },
            { heading: 'Response Timeline', text: 'Grievances will be acknowledged within 7 days and fully resolved within 30 days of receipt.' },
            { heading: 'Escalation', text: 'If you are not satisfied with our response, you may escalate your complaint to the Data Protection Board of India, as constituted under the DPDP Act 2023.' },
        ],
    },
];

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────

function TableOfContents({ active, onJump }) {
    return (
        <nav style={{ position: 'sticky', top: '120px', alignSelf: 'flex-start', width: '220px', flexShrink: 0 }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(16,185,129,0.55)', marginBottom: '16px' }}>
                Contents
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {SECTIONS.map(sec => (
                    <button
                        key={sec.id}
                        onClick={() => onJump(sec.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: active === sec.id ? 'rgba(16,185,129,0.08)' : 'transparent',
                            border: 'none', borderRadius: '8px', padding: '7px 10px',
                            cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', width: '100%',
                        }}
                    >
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 700, color: active === sec.id ? '#6ee7b7' : 'rgba(255,255,255,0.2)', minWidth: '20px' }}>{sec.num}</span>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: active === sec.id ? '#6ee7b7' : 'rgba(255,255,255,0.35)', lineHeight: 1.4, transition: 'color 0.18s' }}>{sec.title}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

// ─── SECTION BLOCK ────────────────────────────────────────────────────────────

function SectionBlock({ sec }) {
    const cardStyle = {
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderLeft: '2px solid rgba(16,185,129,0.25)',
        borderRadius: '0 10px 10px 0',
        padding: '16px 20px',
        marginBottom: '12px',
    };

    return (
        <section id={sec.id} style={{ marginBottom: '64px', scrollMarginTop: '140px' }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', marginBottom: '28px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '50px', fontWeight: 800, color: 'rgba(16,185,129,0.4)', letterSpacing: '0.08em', paddingTop: '6px', flexShrink: 0, minWidth: '28px' }}>
                    {sec.num}
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(25px,3vw,30px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, borderBottom: '1px solid rgba(16,185,129,0.12)', width: '100%', background: '#10b981', border: '2px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '10px', height: '50px' }}>
                    <div >
                        {sec.title}
                    </div>

                </div>
            </div>

            <div style={{ marginLeft: '48px' }}>
                {sec.intro && (
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '20px' }}>
                        {sec.intro}
                    </p>
                )}

                {/* Subsections with labelled items */}
                {sec.subsections && sec.subsections.map((sub, si) => (
                    <div key={si} style={{ marginBottom: '24px' }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(16,185,129,0.5)', marginBottom: '12px' }}>
                            {sub.heading}
                        </p>
                        {sub.items.map((item, ii) => (
                            <div key={ii} style={cardStyle}>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(16,185,129,0.65)', letterSpacing: '0.04em', marginBottom: '5px' }}>
                                    {item.label}
                                </p>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}

                {/* Bullet list with icons */}
                {sec.bullets && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                        {sec.bullets.map((b, i) => (
                            <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '14px 16px' }}>
                                <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{b.icon}</span>
                                <div>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{b.label} — </span>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75 }}>{b.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Plain content cards */}
                {sec.content && sec.content.map((item, i) => (
                    <div key={i} style={{ ...cardStyle }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(16,185,129,0.65)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '5px' }}>
                            {item.heading}
                        </p>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
                            {item.text}
                        </p>
                    </div>
                ))}

                {/* Data processing table */}
                {sec.table && (
                    <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans',sans-serif" }}>
                            <thead>
                                <tr>
                                    {['Purpose', 'Data Used', 'Legal Basis'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(16,185,129,0.55)', borderBottom: '1px solid rgba(16,185,129,0.15)', background: 'rgba(16,185,129,0.03)' }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sec.table.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <td style={{ padding: '11px 14px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{row.purpose}</td>
                                        <td style={{ padding: '11px 14px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{row.data}</td>
                                        <td style={{ padding: '11px 14px' }}>
                                            <span style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '100px', padding: '2px 10px', fontSize: '11px', color: '#6ee7b7', whiteSpace: 'nowrap' }}>
                                                {row.basis}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Rights grid */}
                {sec.rights && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                        {sec.rights.map((r, i) => (
                            <div key={i} style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: '12px', padding: '16px' }}>
                                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{r.icon}</div>
                                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 600, color: '#6ee7b7', marginBottom: '5px' }}>{r.right}</div>
                                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{r.desc}</div>
                            </div>
                        ))}
                    </div>
                )}

                {sec.footer && (
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                        {sec.footer}
                    </p>
                )}
            </div>
        </section>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const PrivacyPolicyHub = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [activeId, setActiveId] = useState(SECTIONS[0].id);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!visible) return;
        const observers = [];
        SECTIONS.forEach(sec => {
            const el = document.getElementById(sec.id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        setActiveId(sec.id);
                    }
                },
                { rootMargin: '-30% 0px -60% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, [visible]);

    const jumpTo = (id) => {
        setActiveId(id); // 🔥 ADD THIS
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return (
        <div style={{ minHeight: '100vh', width: '100%', background: '#060b09', overflowX: 'hidden', position: 'relative' }}>
            <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

            {/* Ambient green glow */}
            <div style={{ position: 'fixed', top: '-180px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: 0, right: '-200px', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(16,185,129,0.03) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <Nav />

            {/* ── HERO ── */}
            <div style={{
                position: 'relative', zIndex: 1, maxWidth: '90%', margin: '0 auto',
                padding: '130px 32px 72px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
                {/* Brand bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '7px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, color: '#6ee7b7', letterSpacing: '-0.5px' }}><img src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776693732/image_wxefat.png" alt="" className='rounded-xl' /></div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>CodeSarthi </span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(16,185,129,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Privacy</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
                    <div>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(16,185,129,0.65)', marginBottom: '14px' }}>
                            DPDP Act 2023 Compliant
                        </p>
                        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(36px,6vw,64px)', fontWeight: 800, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                            Privacy<br /><span style={{ color: '#10b981' }}>Policy</span>
                        </h1>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, maxWidth: '520px' }}>
                            CodeSarthi is committed to transparent, secure, and responsible data handling. This policy explains exactly what we collect, why we collect it, and how you control it — in plain language.
                        </p>
                    </div>

                    {/* Meta card */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '14px', padding: '20px 24px', flexShrink: 0, minWidth: '220px' }}>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Last updated</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>April 20, 2026</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { dot: '#10b981', label: 'DPDP Act 2023 compliant' },
                                { dot: '#6ba3ff', label: 'GDPR ready (EU users)' },
                                { dot: '#f59e0b', label: 'IT Act 2000 & SPI Rules' },
                                { dot: '#a78bfa', label: 'No data sold ever' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DPO callout */}
                <div style={{ marginTop: '32px', display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '16px 20px' }}>
                    <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>🔒</span>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0 }}>
                        <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Questions about your data?</strong>{' '}
                        Contact us at{' '} <a href="mailto:codesarthi.help@gmail.com" style={{ color: '#6ee7b7', textDecoration: 'none' }}>codesarthi.help@gmail.com</a>.
                        We respond within 7 days.
                    </p>
                </div>
            </div>

            {/* ── BODY ── */}
            <div style={{
                position: 'relative', zIndex: 1, maxWidth: '90%', margin: '0 auto',
                padding: '0 32px 120px', display: 'flex', gap: '48px', alignItems: 'flex-start',
                opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s',
            }}>
                <TableOfContents active={activeId} onJump={jumpTo} />

                <div style={{ flex: 1, minWidth: 0 }}>
                    {SECTIONS.map(sec => <SectionBlock key={sec.id} sec={sec} />)}

                    {/* Contact section */}
                    <section style={{ marginBottom: '64px', scrollMarginTop: '140px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '28px' }}>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '11px', fontWeight: 800, color: 'rgba(16,185,129,0.4)', letterSpacing: '0.08em', paddingTop: '6px', flexShrink: 0, minWidth: '28px' }}>13</div>
                            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(20px,3vw,26px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, borderBottom: '1px solid rgba(16,185,129,0.12)', paddingBottom: '16px', width: '100%' }}>
                                Contact Information
                            </h2>
                        </div>
                        <div style={{ marginLeft: '48px' }}>
                            <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '14px', padding: '28px 32px', marginBottom: '20px' }}>
                                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>CodeSarthi </div>
                                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Registered under the Indian Companies Act · CIN pending</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {[
                                        { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 14 14"><g fill="none"><path fill="#8fbffa" fillRule="evenodd" d="M7 1.5a3.25 3.25 0 0 0-3.25 3.25v2.5a.75.75 0 0 1-1.5 0v-2.5A4.75 4.75 0 0 1 7 0h.25A4.75 4.75 0 0 1 12 4.75v5.382c0 .892-.448 1.667-.993 2.198c-.534.521-1.274.92-2.007.92a.75.75 0 0 1 0-1.5c.221 0 .606-.148.96-.493c.341-.334.54-.743.54-1.125V4.75A3.25 3.25 0 0 0 7.25 1.5z" clipRule="evenodd"></path><path fill="#2859c5" d="M5 12.5A1.5 1.5 0 0 1 6.5 11H8a1.5 1.5 0 0 1 0 3H6.5A1.5 1.5 0 0 1 5 12.5m-5-6A1.5 1.5 0 0 1 1.5 5h2.25v4a1 1 0 0 1-1 1H1.5A1.5 1.5 0 0 1 0 8.5zM10.5 5h2A1.5 1.5 0 0 1 14 6.5v2a1.5 1.5 0 0 1-1.5 1.5h-2z"></path></g></svg>), label: 'General support', val: 'codesarthi.help@gmail.com', href: 'mailto:codesarthi.help@gmail.com' },
                                        { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 14 14"><g fill="none"><path fill="#8fbffa" d="M1.75 0A1.75 1.75 0 0 0 0 1.75v3.257a9.31 9.31 0 0 0 6.57 8.895c.28.087.58.087.86 0A9.31 9.31 0 0 0 14 5.007V1.75A1.75 1.75 0 0 0 12.25 0z"></path><path fill="#2859c5" fillRule="evenodd" d="M9.25 4.25a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0M7 7.5c1.657 0 3.143.733 4.152 1.893A7.8 7.8 0 0 1 7 12.465a7.8 7.8 0 0 1-4.152-3.072A5.5 5.5 0 0 1 7 7.5" clipRule="evenodd"></path></g></svg>), label: 'Data Protection Officer', val: 'dpo@codesarthi.in', href: 'mailto:dpo@codesarthi.in' },
                                        { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 48 48"><path fill="#673ab7" d="M38 44H12V4h26c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4"></path><path fill="#311b92" d="M10 4h2v40h-2c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4"></path><path fill="#fff" d="M36 24.2c-.1 4.8-3.1 6.9-5.3 6.7c-.6-.1-2.1-.1-2.9-1.6c-.8 1-1.8 1.6-3.1 1.6c-2.6 0-3.3-2.5-3.4-3.1c-.1-.7-.2-1.4-.1-2.2c.1-1 1.1-6.5 5.7-6.5c2.2 0 3.5 1.1 3.7 1.3l-.6 6.8c0 .3-.2 1.6 1.1 1.6c2.1 0 2.4-3.9 2.4-4.6c.1-1.2.3-8.2-7-8.2c-6.9 0-7.9 7.4-8 9.2c-.5 8.5 6 8.5 7.2 8.5c1.7 0 3.7-.7 3.9-.8l.4 2c-.3.2-2 1.1-4.4 1.1c-2.2 0-10.1-.4-9.8-10.8c.3-2.1 1.6-11.2 10.8-11.2S36 22.1 36 24.2m-11.9 1.3c-.1 1 0 1.8.2 2.3s.6.8 1.2.8c.1 0 .3 0 .4-.1c.2-.1.3-.1.5-.3c.2-.1.3-.3.5-.6c.2-.2.3-.6.4-1l.5-5.4c-.2-.1-.5-.1-.7-.1q-.75 0-1.2.3c-.3.2-.6.5-.9.8c-.2.4-.4.8-.6 1.3s-.2 1.3-.3 2"></path></svg>), label: 'Registered address', val: 'Kanpur, Uttar Pradesh, India', href: null },
                                        { icon: (<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><g fill="none"><path fill="#e3e3e3" d="M17.261 8.652H6.74a1.913 1.913 0 0 0-1.913 1.913v10.522A1.913 1.913 0 0 0 6.74 23h10.522a1.913 1.913 0 0 0 1.913-1.913V10.565a1.913 1.913 0 0 0-1.913-1.913"></path><path fill="#fff" d="M12 8.652H6.74a1.913 1.913 0 0 0-1.914 1.913v10.522A1.913 1.913 0 0 0 6.74 23H12z"></path><path stroke="#ffffffff" strokeLinecap="round" strokeLinejoin="round" d="M17.261 8.652H6.74a1.913 1.913 0 0 0-1.913 1.913v10.522A1.913 1.913 0 0 0 6.74 23h10.522a1.913 1.913 0 0 0 1.913-1.913V10.565a1.913 1.913 0 0 0-1.913-1.913M7.926 5.83a5.76 5.76 0 0 1 8.148 0" strokeWidth={1}></path><path stroke="#ffffffff" strokeLinecap="round" strokeLinejoin="round" d="M5.704 3.608a8.905 8.905 0 0 1 12.593 0M12 17.26v2.87" strokeWidth={1}></path><path fill="#66e1ff" stroke="#000000ff" strokeLinecap="round" strokeLinejoin="round" d="M12 17.26a1.913 1.913 0 1 0 0-3.825a1.913 1.913 0 0 0 0 3.826" strokeWidth={1}></path><path stroke="#ffffffff" strokeLinecap="round" strokeLinejoin="round" d="M15.827 15.348a3.826 3.826 0 0 0-7.653 0" strokeWidth={1}></path></g></svg>), label: 'Website', val: 'codesarthi.in', href: 'https://codesarthi.in' },
                                    ].map(item => (
                                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '14px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)', minWidth: '160px' }}>{item.label}</span>
                                            {item.href ? (
                                                <a href={item.href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: '#6ee7b7', textDecoration: 'none' }}>{item.val}</a>
                                            ) : (
                                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{item.val}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Compliance badges */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['DPDP Act 2023', 'IT Act 2000', 'SPI Rules', 'GDPR (EU)', 'AES-256 Encryption', 'Zero Data Sales'].map(badge => (
                                    <div key={badge} style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '100px', padding: '4px 14px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: '#6ee7b7', fontWeight: 500 }}>
                                        {badge}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer acknowledgement */}
                    <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '12px', widt: 'full', display: 'flex', justifyContent: 'center' }}><svg xmlns="http://www.w3.org/2000/svg" width={55} height={55} viewBox="0 0 80 80"><g fill="none" fillRule="evenodd" clipRule="evenodd"><path fill="#f2c94c" d="M19.833 38.25c-1.012 0-1.833.82-1.833 1.833v26.334c0 1.012.82 1.833 1.833 1.833h40.334c1.012 0 1.833-.82 1.833-1.833V40.083c0-1.012-.82-1.833-1.833-1.833zM43 56.25a4.243 4.243 0 1 1-6-6a4.243 4.243 0 0 1 6 6"></path><path fill="#828282" d="M40 14.25c-8.56 0-15.5 6.94-15.5 15.5v8.5h4v-8.5c0-6.351 5.149-11.5 11.5-11.5s11.5 5.149 11.5 11.5v8.5h4v-8.5c0-8.56-6.94-15.5-15.5-15.5"></path></g></svg></div>
                        <p style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                            We prioritise your privacy
                        </p>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 20px' }}>
                            This Policy complies with the Digital Personal Data Protection Act 2023. We are committed to transparent, secure, and responsible data handling — always.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => navigate('/terms-and-conditions')}
                                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '10px 22px', fontSize: '13px', fontWeight: 600, color: '#6ee7b7', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}
                            >
                                View Terms & Conditions →
                            </button>
                            <a href="mailto:codesarthi.help@gmail.com" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 22px', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif" }}>
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div >
    );
};

export default PrivacyPolicyHub;