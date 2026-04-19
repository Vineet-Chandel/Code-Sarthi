import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../nav';
import Footer from '../../../Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const FEEDBACK_TYPES = [
    { id: 'bug', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 48 48"><path fill="#dea47a" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M47.21 24.54c-.44 1.41-1.44 2.35-2.23 2.1s-1.07-1.6-.63-3s1.45-2.35 2.24-2.1s1.07 1.59.62 3" strokeWidth={1}></path><path fill="#87898c" d="M14.58 6.12A9.15 9.15 0 0 1 22 .65C26.88.2 28 3 26.57 4.66c-1.82 2.06-5-3.15-9.93 1.73c-2.11 2.11-2.06-.27-2.06-.27"></path><path fill="#87898c" d="M15.64 6.12A9.15 9.15 0 0 0 8.26.65C3.34.2 2.18 3 3.65 4.66c1.82 2.06 5-3.15 9.93 1.73c2.11 2.11 2.06-.27 2.06-.27"></path><path fill="#bdbec0" d="M15 7.21a8.93 8.93 0 0 1 7-4.6c2.79-.26 4.37.53 4.95 1.56C27.79 2.5 26.43.24 22 .65a9.15 9.15 0 0 0-7.38 5.47s-.06.88.38 1.09"></path><path fill="#bdbec0" d="M8.26 2.61a8.93 8.93 0 0 1 6.94 4.6c.46-.23.44-1.09.44-1.09A9.15 9.15 0 0 0 8.26.65C3.79.24 2.43 2.5 3.31 4.17c.58-1.03 2.16-1.82 4.95-1.56"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M14.58 6.12A9.15 9.15 0 0 1 22 .65C26.88.2 28 3 26.57 4.66c-1.82 2.06-5-3.15-9.93 1.73c-2.11 2.11-2.06-.27-2.06-.27" strokeWidth={1}></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M15.64 6.12A9.15 9.15 0 0 0 8.26.65C3.34.2 2.18 3 3.65 4.66c1.82 2.06 5-3.15 9.93 1.73c2.11 2.11 2.06-.27 2.06-.27" strokeWidth={1}></path><path fill="#45413c" d="M5 45.5a19 1.5 0 1 0 38 0a19 1.5 0 1 0-38 0" opacity={0.15}></path><path fill="#9ceb60" d="M37.14 28.75a4.75 4.75 0 1 0 9.5 0a4.75 4.75 0 1 0-9.5 0"></path><path fill="#c8ffa1" d="M41.89 26.28a4.75 4.75 0 0 1 4.6 3.61a4.75 4.75 0 1 0-9.2 0a4.75 4.75 0 0 1 4.6-3.61"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M37.14 28.75a4.75 4.75 0 1 0 9.5 0a4.75 4.75 0 1 0-9.5 0" strokeWidth={1}></path><path fill="#9ceb60" d="M29.64 32.75a6.75 6.75 0 1 0 13.5 0a6.75 6.75 0 1 0-13.5 0"></path><path fill="#c8ffa1" d="M36.39 28.14a6.75 6.75 0 0 1 6.66 5.68a7.5 7.5 0 0 0 .09-1.07a6.75 6.75 0 0 0-13.5 0a7.5 7.5 0 0 0 .09 1.07a6.75 6.75 0 0 1 6.66-5.68"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M29.64 32.75a6.75 6.75 0 1 0 13.5 0a6.75 6.75 0 1 0-13.5 0" strokeWidth={1}></path><path fill="#9ceb60" d="M19.64 33.5a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0"></path><path fill="#c8ffa1" d="M28.14 27.5a8.5 8.5 0 0 1 8.4 7.25a8.5 8.5 0 1 0-16.8 0a8.5 8.5 0 0 1 8.4-7.25"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M19.64 33.5a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0" strokeWidth={1}></path><path fill="#9ceb60" d="M11.64 33.5a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0"></path><path fill="#6dd627" d="M11.64 33.5a8.5 8.5 0 0 0 .27 2.1a8.49 8.49 0 0 0 14-6.43a8.7 8.7 0 0 0-.27-2.11a8.49 8.49 0 0 0-14 6.44"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M11.64 33.5a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0" strokeWidth={1}></path><path fill="#9ceb60" d="M7.64 26a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0"></path><path fill="#6dd627" d="M7.66 25.57a8.49 8.49 0 0 0 16.09-3.35a8.49 8.49 0 0 0-16.09 3.35"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M7.64 26a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0" strokeWidth={1}></path><path fill="#9ceb60" d="M3.64 16a10.5 10.5 0 1 0 21 0a10.5 10.5 0 1 0-21 0"></path><path fill="#c8ffa1" d="M14.14 9a10.49 10.49 0 0 1 10.34 8.75a10 10 0 0 0 .16-1.75a10.5 10.5 0 0 0-21 0a10 10 0 0 0 .16 1.75A10.49 10.49 0 0 1 14.14 9"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M3.64 16a10.5 10.5 0 1 0 21 0a10.5 10.5 0 1 0-21 0" strokeWidth={1}></path><path fill="#87898c" d="M13.88 29.36c1.15 1.72 1 3.86-.4 4.79s-3.43.28-4.58-1.44s-1-3.86.4-4.79s3.43-.28 4.58 1.44"></path><path fill="#bdbec0" d="M9.3 29.92c1.37-.92 3.43-.28 4.58 1.44a4.6 4.6 0 0 1 .62 1.36a4.07 4.07 0 0 0-.62-3.36c-1.15-1.72-3.21-2.36-4.58-1.44a3.06 3.06 0 0 0-1 3.43a2.55 2.55 0 0 1 1-1.43"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M13.88 29.36c1.15 1.72 1 3.86-.4 4.79s-3.43.28-4.58-1.44s-1-3.86.4-4.79s3.43-.28 4.58 1.44" strokeWidth={1}></path><path fill="#87898c" d="M18.86 37.23c2 .62 3.17 2.41 2.67 4S19 43.57 17.05 43s-3.17-2.42-2.67-4s2.51-2.4 4.48-1.77"></path><path fill="#bdbec0" d="M18.86 39.24a4.05 4.05 0 0 1 2.57 2.23a2 2 0 0 0 .1-.25c.5-1.58-.7-3.37-2.67-4s-4 .14-4.48 1.72a2.57 2.57 0 0 0 .09 1.77c.62-1.4 2.53-2.06 4.39-1.47"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M18.86 37.23c2 .62 3.17 2.41 2.67 4S19 43.57 17.05 43s-3.17-2.42-2.67-4s2.51-2.4 4.48-1.77" strokeWidth={1}></path><path fill="#87898c" d="M31.12 37.2c2-.56 4 .27 4.43 1.87s-.8 3.34-2.79 3.9s-4-.27-4.43-1.86s.8-3.34 2.79-3.91"></path><path fill="#bdbec0" d="M28.45 41.43a4 4 0 0 1 2.67-2.23c1.86-.52 3.71.17 4.31 1.55a2.5 2.5 0 0 0 .12-1.68c-.45-1.6-2.43-2.43-4.43-1.87s-3.24 2.32-2.79 3.91a2 2 0 0 0 .12.32"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M31.12 37.2c2-.56 4 .27 4.43 1.87s-.8 3.34-2.79 3.9s-4-.27-4.43-1.86s.8-3.34 2.79-3.91" strokeWidth={1}></path><path fill="#45413c" d="M12.61 13.34a1.76 1.76 0 1 1-1.31-2.12a1.77 1.77 0 0 1 1.31 2.12"></path><path fill="#46b000" d="M15.63 18.46a2.1 2.1 0 0 1-2.13.75c-.95-.13-1.53-.67-1.31-1.21s1.17-.87 2.12-.74s1.54.66 1.32 1.2"></path><path fill="#ffaa54" d="M4.14 13.5a4.68 4.68 0 0 0-2.5 5c.5 3.25 4 3.5 4 3.5s2.25-.14 2.5-3c.31-3.5-4-5.5-4-5.5"></path><path fill="#fc9" d="M1.68 18.66v-.07a2.93 2.93 0 0 1 5-1.27A5.25 5.25 0 0 1 8 19.67a4.5 4.5 0 0 0 .14-.67c.31-3.5-4-5.5-4-5.5a4.68 4.68 0 0 0-2.5 5c.01.06.03.1.04.16"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M4.14 13.5a4.68 4.68 0 0 0-2.5 5c.5 3.25 4 3.5 4 3.5s2.25-.14 2.5-3c.31-3.5-4-5.5-4-5.5" strokeWidth={1}></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M1.64 18.5a8.24 8.24 0 0 0 6.5 0" strokeWidth={1}></path><path fill="#dea47a" d="M11.13 30.9c-1.21-1.89-2.26-.33-4.05.36s-1.81 2.31 1 3c3.1.74 4.36-1.26 3.05-3.36"></path><path fill="#f0c2a1" d="M7.08 32.87c1.79-.69 2.84-2.25 4.05-.36a3.7 3.7 0 0 1 .35.73a2.51 2.51 0 0 0-.35-2.34c-1.21-1.89-2.26-.33-4.05.36c-1.31.5-1.67 1.39-.88 2.13a2.8 2.8 0 0 1 .88-.52"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M11.13 30.9c-1.21-1.89-2.26-.33-4.05.36s-1.81 2.31 1 3c3.1.74 4.36-1.26 3.05-3.36" strokeWidth={1}></path><path fill="#dea47a" d="M17.13 39.93c-2.24 0-1.46 1.76-1.8 3.64s1 2.75 3.08.71c2.26-2.28 1.16-4.39-1.28-4.35"></path><path fill="#f0c2a1" d="M16.44 42c1.42 0 2.38.68 2.51 1.71c1.51-2 .4-3.78-1.82-3.74c-1.66 0-1.66 1-1.69 2.24a2.2 2.2 0 0 1 1-.21"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M17.13 39.93c-2.24 0-1.46 1.76-1.8 3.64s1 2.75 3.08.71c2.26-2.28 1.16-4.39-1.28-4.35" strokeWidth={1}></path><path fill="#dea47a" d="M31.38 41c-1.35 1.79.48 2.22 1.75 3.66s2.8.88 2.46-2c-.38-3.13-2.74-3.58-4.21-1.66"></path><path fill="#f0c2a1" d="M31.37 42.75c1.46-1.93 3.78-1.51 4.2 1.55a5.2 5.2 0 0 0 0-1.6c-.38-3.17-2.74-3.62-4.22-1.67c-.65.87-.55 1.42-.14 1.92Z"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M31.38 41c-1.35 1.79.48 2.22 1.75 3.66s2.8.88 2.46-2c-.38-3.13-2.74-3.58-4.21-1.66" strokeWidth={1}></path><path fill="#87898c" d="M39.54 35.52c1.37-.94 3.08-.81 3.82.29a2.75 2.75 0 0 1-1.12 3.66a2.75 2.75 0 0 1-3.82-.29a2.75 2.75 0 0 1 1.12-3.66"></path><path fill="#bdbec0" d="M39.54 37.16c1.37-.93 3.08-.8 3.82.29a2 2 0 0 1 .19.36a2.19 2.19 0 0 0-.19-2c-.74-1.1-2.45-1.23-3.82-.29a2.87 2.87 0 0 0-1.31 3.3a3.46 3.46 0 0 1 1.31-1.66"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M39.54 35.52c1.37-.94 3.08-.81 3.82.29a2.75 2.75 0 0 1-1.12 3.66a2.75 2.75 0 0 1-3.82-.29a2.75 2.75 0 0 1 1.12-3.66" strokeWidth={1}></path><path fill="#dea47a" d="M40.32 38.27c-.75 1.62.75 1.66 2 2.56s2.34.22 1.58-2c-.84-2.36-2.76-2.32-3.58-.56"></path><path fill="#f0c2a1" d="M40.32 39.57c.82-1.77 2.74-1.81 3.56.59a6 6 0 0 1 .17.58a2.92 2.92 0 0 0-.17-1.87c-.82-2.4-2.74-2.36-3.56-.6c-.29.63-.24 1 0 1.31Z"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M40.32 38.27c-.75 1.62.75 1.66 2 2.56s2.34.22 1.58-2c-.84-2.36-2.76-2.32-3.58-.56" strokeWidth={1}></path></svg>), label: 'Bug report', desc: 'Something isn\'t working' },
    { id: 'feature', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVGgc1zneTU)" d="M5.5 10L9 9.5l3.5.5h.264c.155 0 .308.036.447.106l1.342.67A.81.81 0 0 1 15 11.5H3a.81.81 0 0 1 .447-.724l1.342-.67A1 1 0 0 1 5.236 10z"></path><path fill="url(#SVGWsJYqbPw)" d="M5.5 10L9 9.5l3.5.5h.264c.155 0 .308.036.447.106l1.342.67A.81.81 0 0 1 15 11.5H3a.81.81 0 0 1 .447-.724l1.342-.67A1 1 0 0 1 5.236 10z"></path><path fill="url(#SVG1emb8UIE)" d="M3.5 11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1z"></path><path fill="url(#SVGciNQDPid)" d="M4 4.5A1.5 1.5 0 0 1 5.5 3h7A1.5 1.5 0 0 1 14 4.5v4a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 4 8.5z"></path><path fill="url(#SVGjeV2bcwA)" fillOpacity={0.3} d="M5.5 3A1.5 1.5 0 0 0 4 4.5v4A1.5 1.5 0 0 0 5.5 10h-.264a1 1 0 0 0-.447.106l-1.342.67A.81.81 0 0 0 3 11.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5a.81.81 0 0 0-.447-.724l-1.342-.67a1 1 0 0 0-.447-.106H12.5A1.5 1.5 0 0 0 14 8.5v-4A1.5 1.5 0 0 0 12.5 3z"></path><path fill="url(#SVGvyCfdciA)" d="M2.5 5A1.5 1.5 0 0 0 1 6.5v6A1.5 1.5 0 0 0 2.5 14h3A1.5 1.5 0 0 0 7 12.5v-6A1.5 1.5 0 0 0 5.5 5z"></path><path fill="url(#SVGkiOjzjCO)" d="M4 12.5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path><defs><radialGradient id="SVGgc1zneTU" cx={0} cy={0} r={1} gradientTransform="rotate(15.65 -26.912 6.479)scale(29.931 24.247)" gradientUnits="userSpaceOnUse"><stop stopColor="#f08af4"></stop><stop offset={0.265} stopColor="#9c6cfe"></stop><stop offset={0.453} stopColor="#4e44db"></stop></radialGradient><radialGradient id="SVGjeV2bcwA" cx={0} cy={0} r={1} gradientTransform="matrix(2.5 0 0 5.23437 6 9.5)" gradientUnits="userSpaceOnUse"><stop offset={0.148} stopColor="#4a43cb"></stop><stop offset={1} stopColor="#4a43cb" stopOpacity={0}></stop></radialGradient><radialGradient id="SVGvyCfdciA" cx={0} cy={0} r={1} gradientTransform="rotate(60.63 -1.88 .526)scale(14.9101 30.1586)" gradientUnits="userSpaceOnUse"><stop stopColor="#f08af4"></stop><stop offset={0.535} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#4e44db"></stop></radialGradient><radialGradient id="SVGkiOjzjCO" cx={0} cy={0} r={1} gradientTransform="rotate(69.573 -6.653 8.19)scale(2.59661 2.03173)" gradientUnits="userSpaceOnUse"><stop stopColor="#decbff"></stop><stop offset={1} stopColor="#d6cfff"></stop></radialGradient><linearGradient id="SVGWsJYqbPw" x1={15} x2={13.951} y1={11.976} y2={7.257} gradientUnits="userSpaceOnUse"><stop stopColor="#63686e"></stop><stop offset={1} stopColor="#889096"></stop></linearGradient><linearGradient id="SVG1emb8UIE" x1={15} x2={14.846} y1={11.929} y2={10.084} gradientUnits="userSpaceOnUse"><stop stopColor="#889096"></stop><stop offset={1} stopColor="#aab3bd"></stop></linearGradient><linearGradient id="SVGciNQDPid" x1={11} x2={11.408} y1={3} y2={11.007} gradientUnits="userSpaceOnUse"><stop stopColor="#6ce0ff"></stop><stop offset={1} stopColor="#4894fe"></stop></linearGradient></defs></g></svg>), label: 'Feature request', desc: 'I have an idea' },
    { id: 'ux', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 32 32"><g fill="none"><path fill="url(#SVGUNiJkdnj)" d="M6 3a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v12H6z"></path><path fill="url(#SVGBb3CJetW)" d="M26 15.5H6v3.25A3.25 3.25 0 0 0 9.25 22H13v5a3 3 0 1 0 6 0v-5h3.75A3.25 3.25 0 0 0 26 18.75z"></path><path fill="url(#SVGm8zzae8F)" d="M6 15a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1H6z"></path><path fill="url(#SVGoCeymcXK)" d="M17 2v5a1 1 0 1 0 2 0V2z"></path><path fill="url(#SVGoCeymcXK)" d="M23 9V2h-2v7a1 1 0 1 0 2 0"></path><defs><linearGradient id="SVGUNiJkdnj" x1={12} x2={18.902} y1={-2.062} y2={20.028} gradientUnits="userSpaceOnUse"><stop offset={0.085} stopColor="#ffcd0f"></stop><stop offset={0.991} stopColor="#e67505"></stop></linearGradient><linearGradient id="SVGBb3CJetW" x1={6} x2={7.262} y1={10.383} y2={33.752} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#ac80ff"></stop><stop offset={1} stopColor="#5750e2"></stop></linearGradient><linearGradient id="SVGm8zzae8F" x1={10.756} x2={10.897} y1={14.266} y2={16.523} gradientUnits="userSpaceOnUse"><stop offset={0.125} stopColor="#9c6cfe"></stop><stop offset={1} stopColor="#5750e2"></stop></linearGradient><linearGradient id="SVGoCeymcXK" x1={17} x2={23.575} y1={-0.222} y2={7.877} gradientUnits="userSpaceOnUse"><stop stopColor="#ff921f"></stop><stop offset={1} stopColor="#eb4824"></stop></linearGradient></defs></g></svg>), label: 'UX / design', desc: 'Design or usability' },
    { id: 'performance', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="#f85b2d" d="M15 22.007H5v-2h10ZM22 4l-4.735 5.955l-.22.27l-5.63 7.19a2.001 2.001 0 1 1-2.83-2.83ZM2.645 7.234A10.84 10.84 0 0 0 1.19 15H2v-1a9.7 9.7 0 0 1 1.69-5.52ZM12 2a10.96 10.96 0 0 0-8.119 3.597L5.025 6.96A7.43 7.43 0 0 1 10 5a7.43 7.43 0 0 1 4.997 1.978l3.55-2.802A10.94 10.94 0 0 0 12 2m6.83 9.2l-.233.287l-.728.93A10 10 0 0 1 18 14v1h4.81a10.88 10.88 0 0 0-1.183-7.318Z"></path></svg>), label: 'Performance', desc: 'It\'s slow or crashing' },
    { id: 'docs', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={55} height={55} viewBox="0 0 64 64"><path fill="#bb324a" d="M31.928 48.656c0 1.801-1.705 3.26-3.81 3.26H3.814C1.708 51.916 0 50.457 0 48.656V19.29c0-1.801 1.708-3.257 3.814-3.257h24.304c2.105 0 3.81 1.457 3.81 3.257z"></path><path fill="#de374b" d="M31.928 46.36c0 1.802-1.705 3.261-3.81 3.261H3.814C1.708 49.621 0 48.162 0 46.36V16.996c0-1.799 1.708-3.258 3.814-3.258h24.304c2.105 0 3.81 1.459 3.81 3.258z"></path><path fill="#bb324a" d="M31.622 48.656c0 1.801 1.707 3.26 3.812 3.26H59.74c2.101 0 3.809-1.459 3.809-3.26V19.29c0-1.801-1.708-3.257-3.809-3.257H35.436c-2.105 0-3.813 1.457-3.813 3.257v29.366"></path><path fill="#de374b" d="M31.622 46.36c0 1.802 1.707 3.261 3.812 3.261H59.74c2.101 0 3.809-1.459 3.809-3.261V16.996c0-1.799-1.708-3.258-3.809-3.258H35.436c-2.105 0-3.813 1.459-3.813 3.258V46.36"></path><path fill="#d0d1d2" d="M32.26 45.922c0 1.801-1.608 3.26-3.594 3.26H5.772c-1.982 0-3.588-1.459-3.588-3.26V16.557c0-1.803 1.606-3.259 3.588-3.259h22.895c1.986 0 3.594 1.457 3.594 3.259z"></path><path fill="#e7e6e6" d="M32.26 43.624c0 1.803-1.608 3.26-3.594 3.26H5.772c-1.982 0-3.588-1.457-3.588-3.26V14.258C2.184 12.459 3.79 11 5.772 11h22.895c1.986 0 3.594 1.459 3.594 3.258v29.366"></path><path fill="#35494d" d="M6.706 18.893h20.369c1.369 0 1.369-1.926 0-1.926H6.706c-1.368 0-1.368 1.926 0 1.926m0 3.907h20.369c1.369 0 1.369-1.924 0-1.924H6.706c-1.368 0-1.368 1.924 0 1.924m0 3.997h20.369c1.369 0 1.369-1.926 0-1.926H6.706c-1.368 0-1.368 1.926 0 1.926m0 3.91h20.369c1.369 0 1.369-1.926 0-1.926H6.706c-1.368 0-1.368 1.926 0 1.926m0 4.044h20.369c1.369 0 1.369-1.926 0-1.926H6.706c-1.368 0-1.368 1.926 0 1.926m0 4.569h20.369c1.369 0 1.369-1.926 0-1.926H6.706c-1.368 0-1.368 1.926 0 1.926"></path><path fill="#d0d1d2" d="M62.33 46.54c0 1.801-1.607 3.259-3.592 3.259H35.844c-1.979 0-3.589-1.458-3.589-3.259V17.173c0-1.799 1.61-3.257 3.589-3.257h22.894c1.984 0 3.592 1.458 3.592 3.257z"></path><path fill="#e7e6e6" d="M62.33 44.24c0 1.799-1.607 3.258-3.592 3.258H35.844c-1.979 0-3.589-1.459-3.589-3.258V14.87c0-1.798 1.61-3.255 3.589-3.255h22.894c1.984 0 3.592 1.457 3.592 3.255z"></path><path fill="#35494d" d="M36.779 19.509h20.369c1.369 0 1.369-1.926 0-1.926H36.779c-1.369 0-1.369 1.926 0 1.926m0 3.911h20.369c1.369 0 1.369-1.924 0-1.924H36.779c-1.369 0-1.369 1.924 0 1.924m0 3.996h20.369c1.369 0 1.369-1.926 0-1.926H36.779c-1.369 0-1.369 1.926 0 1.926m0 3.914h20.369c1.369 0 1.369-1.928 0-1.928H36.779c-1.369 0-1.369 1.928 0 1.928m0 4.04h20.369c1.369 0 1.369-1.927 0-1.927H36.779c-1.369 0-1.369 1.927 0 1.927m7.331 4.566h13.393c.9 0 .9-1.927 0-1.927H44.11c-.899 0-.899 1.927 0 1.927"></path></svg>), label: 'Content', desc: 'Missing or unclear docs' },
    { id: 'other', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 32 32"><path fill="#ff9800" d="m13.844 7.536l-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"></path><path fill="#fff9c4" d="M31 12H15a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3v3a1 1 0 0 0 1 1h.697a1 1 0 0 0 .555-.168L26 26h5a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1m-15 6h8v2h-8Zm10 6H16v-2h10Zm4-8H16v-2h14Z"></path></svg>), label: 'Other', desc: 'Something else' },
];

const AREA_TAGS = [
    'API', 'Dashboard', 'Bots', 'Onboarding', 'SDK',
    'Accounts', 'Safety', 'Server settings', 'Performance', 'Other'
];

const STAR_LABELS = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];

const HEAR_OPTIONS = [
    'Friend or colleague', 'Twitter / X', 'GitHub',
    'Product Hunt', 'Search engine', 'Other',
];

const STEP_PROGRESS = [0, 20, 45, 70, 100];
const STEP_LABELS = [
    '',
    'Step 1 of 4 — Choose feedback type',
    'Step 2 of 4 — Rate & tag',
    'Step 3 of 4 — Describe your feedback',
    'Step 4 of 4 — About you (optional)',
];

// ─── REUSABLE TAILWIND CLASSES ────────────────────────────────────────────────

const TW = {
    sectionLabel: "text-[11px] font-semibold tracking-widest uppercase text-white/25 font-sans mb-3.5 block",
    fieldLabel: "block text-[13px] font-medium text-white/60 mb-2 font-sans",
    input: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-sans outline-none focus:border-blue-500/50 transition-colors",
    primaryBtn: "flex-1 bg-[#1a6cf6] hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl py-4 text-[15px] font-semibold text-white transition-all active:scale-[0.98] font-sans",
    backBtn: "flex-[0_0_100px] bg-white/5 hover:bg-white/10 rounded-2xl py-4 text-[15px] font-semibold text-white/60 transition-colors font-sans",
};

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

function Step1({ feedbackType, onSelect, onNext }) {
    return (
        <div>
            <p className={TW.sectionLabel}>What kind of feedback is this?</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] gap-2.5 mb-8">
                {FEEDBACK_TYPES.map(ft => (
                    <button
                        key={ft.id}
                        onClick={() => onSelect(ft.id)}
                        className={`p-4 rounded-2xl text-left transition-all border ${feedbackType === ft.id
                            ? 'bg-blue-500/10 border-blue-500/40'
                            : 'bg-white/[0.03] border-white/5 hover:border-white/20'
                            }`}
                    >
                        <span className="text-xl mb-2 block">{ft.icon}</span>
                        <div className="text-[13px] font-medium text-white font-sans mb-1">{ft.label}</div>
                        <div className="text-[11px] text-white/30 font-sans leading-relaxed">{ft.desc}</div>
                    </button>
                ))}
            </div>
            <button
                onClick={onNext}
                disabled={!feedbackType}
                className={`${TW.primaryBtn} w-full`}
            >
                Continue →
            </button>
        </div>
    );
}

function Step2({ rating, onRate, tags, onToggleTag, onBack, onNext }) {
    return (
        <div>
            <p className={TW.sectionLabel}>How would you rate your overall experience?</p>
            <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(v => (
                    <span
                        key={v}
                        onClick={() => onRate(v)}
                        className={`text-3xl cursor-pointer transition-all hover:scale-110 select-none ${v <= rating ? 'text-amber-500' : 'text-white/15'
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>
            <p className="text-[13px] text-white/30 italic font-sans mb-7 min-h-[20px]">
                {rating ? STAR_LABELS[rating] : 'Tap a star to rate'}
            </p>

            <hr className="border-none border-t border-white/5 mb-7" />

            <p className={TW.sectionLabel}>Which area does this relate to?</p>
            <div className="flex flex-wrap gap-2 mb-8">
                {AREA_TAGS.map(tag => (
                    <button
                        key={tag}
                        onClick={() => onToggleTag(tag)}
                        className={`px-3.5 py-1 rounded-full text-xs font-sans transition-all border ${tags.includes(tag)
                            ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="flex gap-2.5">
                <button onClick={onBack} className={TW.backBtn}>← Back</button>
                <button onClick={onNext} className={TW.primaryBtn}>Continue →</button>
            </div>
        </div>
    );
}

function Step3({ title, onTitleChange, description, onDescChange, fileName, onFileChange, onBack, onNext }) {
    const fileRef = useRef(null);
    const canContinue = title.trim() && description.trim();

    return (
        <div>
            <div className="mb-6">
                <label className={TW.fieldLabel}>
                    Title <span className="text-white/20 font-normal">(required)</span>
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={e => onTitleChange(e.target.value)}
                    placeholder="Short summary of your feedback…"
                    maxLength={100}
                    className={TW.input}
                />
            </div>

            <div className="mb-6">
                <label className={TW.fieldLabel}>
                    Description <span className="text-white/20 font-normal">(required)</span>
                </label>
                <textarea
                    value={description}
                    onChange={e => onDescChange(e.target.value)}
                    placeholder="Describe your feedback in detail..."
                    maxLength={1000}
                    rows={5}
                    className={`${TW.input} resize-none`}
                />
                <p className="text-[11px] text-white/20 text-right mt-1 font-sans">
                    {description.length} / 1000
                </p>
            </div>

            <div className="mb-8">
                <label className={TW.fieldLabel}>
                    Attach a screenshot <span className="text-white/20 font-normal">(optional)</span>
                </label>
                <div
                    onClick={() => fileRef.current?.click()}
                    className="border border-dashed border-white/15 rounded-2xl p-7 text-center cursor-pointer transition-all hover:border-blue-500/40 hover:bg-blue-500/5 group"
                >
                    <div className="text-2xl mb-1">📎</div>
                    <div className="text-sm font-medium text-white/50 font-sans">Click to attach file</div>
                    <p className="text-xs text-white/20 mt-1 font-sans">PNG, JPG or GIF up to 10MB</p>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => onFileChange(e.target.files?.[0]?.name || null)}
                    />
                </div>
                {fileName && (
                    <p className="text-xs text-blue-400 mt-1.5 font-sans">
                        Attached: {fileName}
                    </p>
                )}
            </div>

            <div className="flex gap-2.5">
                <button onClick={onBack} className={TW.backBtn}>← Back</button>
                <button
                    onClick={onNext}
                    disabled={!canContinue}
                    className={TW.primaryBtn}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}

function Step4({ name, onNameChange, email, onEmailChange, source, onSourceChange, onBack, onSubmit }) {
    return (
        <div>
            <div className="mb-6">
                <label className={TW.fieldLabel}>Name <span className="text-white/20 font-normal">(optional)</span></label>
                <input
                    type="text"
                    value={name}
                    onChange={e => onNameChange(e.target.value)}
                    placeholder="How should we address you?"
                    className={TW.input}
                />
            </div>

            <div className="mb-6">
                <label className={TW.fieldLabel}>Email <span className="text-white/20 font-normal">(optional — for follow-up)</span></label>
                <input
                    type="email"
                    value={email}
                    onChange={e => onEmailChange(e.target.value)}
                    placeholder="you@example.com"
                    className={TW.input}
                />
            </div>

            <div className="mb-8">
                <label className={TW.fieldLabel}>How did you hear about CodeSarthi? <span className="text-white/20 font-normal">(optional)</span></label>
                <select
                    value={source}
                    onChange={e => onSourceChange(e.target.value)}
                    className={`${TW.input} appearance-none cursor-pointer`}
                >
                    <option value="" className="bg-[#0f0f12]">Select…</option>
                    {HEAR_OPTIONS.map(o => <option key={o} value={o} className="bg-[#0f0f12]">{o}</option>)}
                </select>
            </div>

            <div className="flex gap-2.5">
                <button onClick={onBack} className={TW.backBtn}>← Back</button>
                <button onClick={onSubmit} className={TW.primaryBtn}>Submit feedback 🚀</button>
            </div>
        </div>
    );
}

function SuccessScreen({ onReset }) {
    return (
        <div className="text-center py-20 px-5">
            <div className="text-5xl mb-5">🎉</div>
            <h2 className="text-3xl font-bold text-white font-display mb-3">
                Thank you for your feedback!
            </h2>
            <p className="text-[15px] text-white/40 leading-relaxed font-sans max-w-[380px] mx-auto mb-8">
                We've received your submission. If you left an email, we'll follow up within 2 business days.
            </p>
            <button
                onClick={onReset}
                className={`${TW.primaryBtn} max-w-[240px] w-full block mx-auto`}
            >
                Submit another →
            </button>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const Feedback = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [visible, setVisible] = useState(false);

    // State management...
    const [feedbackType, setFeedbackType] = useState(null);
    const [rating, setRating] = useState(0);
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileName, setFileName] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [source, setSource] = useState('');

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const toggleTag = (tag) => {
        setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const handleSubmit = () => setSubmitted(true);

    const resetForm = () => {
        setStep(1); setSubmitted(false); setFeedbackType(null); setRating(0);
        setTags([]); setTitle(''); setDescription(''); setFileName(null);
        setName(''); setEmail(''); setSource('');
    };

    return (
        <div className="min-h-screen w-full bg-[#050508] relative overflow-x-hidden">
            {/* Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

            {/* Ambient Blobs */}
            <div className="fixed -top-[200px] left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 -right-[200px] w-full h-[600px] bg-purple-600/5 blur-[120px] pointer-events-none z-0" />

            <Nav />

            <div className="relative z-10 max-w-[80%] mx-auto px-6 pb-32">
                {/* Hero Section */}
                <div className={`text-center pt-32 pb-16 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-block bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-1.5 text-[11px] font-semibold text-blue-400 tracking-widest uppercase mb-6 font-sans">
                        Feedback
                    </div>
                    <h1 className="text-[100px]  font-extrabold font-display text-white leading-[1.05] -tracking-wider mb-4 font-head">
                        Help us build<br />
                        <span className="text-[#1a6cf6]">something great</span>
                    </h1>
                    <p className="text-lg text-white/40 font-sans font-light leading-relaxed max-w-[420px] mx-auto">
                        Your feedback shapes CodeSarthi. Every report, idea, and rating goes directly to the team.
                    </p>
                </div>

                {/* Form Card */}
                <div className={`bg-white/[0.02] border border-white/10 rounded-[32px] p-6 md:p-12 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    {!submitted ? (
                        <>
                            {/* Progress bar */}
                            <div className="h-[3px] bg-white/5 rounded-full mb-3 overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${STEP_PROGRESS[step]}%` }}
                                />
                            </div>
                            <p className="text-xs text-white/30 font-sans mb-7">{STEP_LABELS[step]}</p>

                            {step === 1 && <Step1 feedbackType={feedbackType} onSelect={setFeedbackType} onNext={() => setStep(2)} />}
                            {step === 2 && <Step2 rating={rating} onRate={setRating} tags={tags} onToggleTag={toggleTag} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
                            {step === 3 && <Step3 title={title} onTitleChange={setTitle} description={description} onDescChange={setDescription} fileName={fileName} onFileChange={setFileName} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
                            {step === 4 && <Step4 name={name} onNameChange={setName} email={email} onEmailChange={setEmail} source={source} onSourceChange={setSource} onBack={() => setStep(3)} onSubmit={handleSubmit} />}
                        </>
                    ) : (
                        <SuccessScreen onReset={resetForm} />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Feedback;