import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../nav';
import Footer from '../../../Footer';
import axios from 'axios';
import BASE_URL from '../../../../Pages/auth/baseURL';
// ─── DATA ────────────────────────────────────────────────────────────────────

const USER_ROLES = [
    { id: 'student', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 128 128"><path fill="#312d2d" d="M64.57 4.87c-41.01 0-40.68 35.92-40.68 36.52c0 24.56 1.88 59.25 11.71 72.9c3.9 5.41 11.43 5.71 11.43 5.71l16.97-.02l16.97.02s7.54-.3 11.43-5.71c9.83-13.65 11.71-48.34 11.71-72.9c-.01-.6 1.47-36.52-39.54-36.52"></path><radialGradient id="SVGJKrASbHO" cx={64} cy={68.51} r={46.963} gradientTransform="matrix(1 0 0 -1.1901 0 141.022)" gradientUnits="userSpaceOnUse"><stop offset={0.794} stopColor="#454140" stopOpacity={0}></stop><stop offset={1} stopColor="#454140"></stop></radialGradient><path fill="url(#SVGJKrASbHO)" d="M64.57 4.87c-41.01 0-40.68 35.92-40.68 36.52c0 24.56 1.88 59.25 11.71 72.9c3.9 5.41 11.43 5.71 11.43 5.71l16.97-.02l16.97.02s7.54-.3 11.43-5.71c9.83-13.65 11.71-48.34 11.71-72.9c-.01-.6 1.47-36.52-39.54-36.52"></path><path fill="#edc391" d="M73.78 89.18H54.1v19.48c0 4.89 4.01 8.85 8.95 8.85h1.79c4.94 0 8.95-3.97 8.95-8.85V89.18z"></path><path fill="#f9ddbd" d="M63.95 16.23c-17.2 0-33.13 12.79-33.13 39.91c0 21.79 13.49 34.67 25.23 38.83c2.8.99 5.5 1.49 7.9 1.49c2.38 0 5.07-.49 7.85-1.47c11.76-4.14 25.28-17.03 25.28-38.84c0-27.13-15.93-39.92-33.13-39.92"></path><path fill="#dba689" d="M67.76 68.24c-.1-.04-.21-.07-.32-.08h-6.99c-.11.01-.21.04-.32.08c-.63.26-.98.91-.68 1.61s1.69 2.66 4.49 2.66s4.19-1.96 4.49-2.66c.31-.69-.03-1.35-.67-1.61"></path><g fill="#312d2d"><ellipse cx={47.7} cy={59.06} rx={4.87} ry={5.04}></ellipse><ellipse cx={80.2} cy={59.06} rx={4.87} ry={5.04}></ellipse></g><path fill="#454140" d="M54.93 50.01C54 48.78 51.86 47 47.7 47s-6.31 1.79-7.23 3.01c-.41.54-.31 1.17-.02 1.55c.26.35 1.04.68 1.9.39s2.54-1.16 5.35-1.18c2.81.02 4.49.89 5.35 1.18s1.64-.03 1.9-.39c.29-.38.39-1.01-.02-1.55m32.5 0C86.5 48.78 84.36 47 80.2 47s-6.31 1.79-7.23 3.01c-.41.54-.31 1.17-.02 1.55c.26.35 1.04.68 1.9.39s2.54-1.16 5.35-1.18c2.81.02 4.49.89 5.35 1.18s1.64-.03 1.9-.39c.29-.38.39-1.01-.02-1.55"></path><path fill="#444" d="M72.27 76.33c-3.15 1.87-13.46 1.87-16.61 0c-1.81-1.07-3.65.57-2.9 2.21c.74 1.61 6.37 5.36 11.23 5.36s10.42-3.75 11.16-5.36c.75-1.64-1.08-3.29-2.88-2.21"></path><path fill="#212121" d="M114.45 120.99c0-14.61-21.75-21.54-40.72-23.1l-8.6 11.03c-.28.36-.72.58-1.18.58s-.9-.21-1.18-.58l-8.61-11.05c-10.55.81-40.71 4.75-40.71 23.12V124h101z"></path><radialGradient id="SVGSGSzRbih" cx={63.95} cy={5.397} r={54.167} gradientTransform="matrix(1 0 0 -.5247 0 125.435)" gradientUnits="userSpaceOnUse"><stop offset={0.598} stopColor="#212121"></stop><stop offset={1} stopColor="#616161"></stop></radialGradient><path fill="url(#SVGSGSzRbih)" d="M114.45 120.99c0-14.61-21.75-21.54-40.72-23.1l-8.6 11.03c-.28.36-.72.58-1.18.58s-.9-.21-1.18-.58l-8.61-11.05c-10.55.81-40.71 4.75-40.71 23.12V124h101z"></path><path fill="#312d2d" d="M64.57 4.87c-41.01 0-40.68 35.92-40.68 36.52c0 7.76.19 16.53.75 25.32l6.72-.02c-.06-2.92 1.99-20.97 8.08-22.34c22.36-5.03 35.01-16.89 35.01-16.89c3.29 7.18 13.58 14.19 17.27 16.86c3.03 2.19 4.26 18.55 4.2 22.38h7.41c0-.05.02-.1.02-.16c.56-8.75.74-17.46.74-25.17c.01-.58 1.49-36.5-39.52-36.5"></path><radialGradient id="SVGh6QvOIqT" cx={64.333} cy={65.404} r={49.771} gradientTransform="matrix(1 0 0 -1.2135 0 141.967)" gradientUnits="userSpaceOnUse"><stop offset={0.794} stopColor="#454140" stopOpacity={0}></stop><stop offset={1} stopColor="#454140"></stop></radialGradient><path fill="url(#SVGh6QvOIqT)" d="M64.57 4.87c-41.01 0-40.68 35.92-40.68 36.52c0 7.76.19 16.53.75 25.32l6.72-.02c-.06-2.92 1.99-20.97 8.08-22.34c22.36-5.03 35.01-16.89 35.01-16.89c3.29 7.18 13.58 14.19 17.27 16.86c3.03 2.19 4.26 18.55 4.2 22.38h7.41c0-.05.02-.1.02-.16c.56-8.75.74-17.46.74-25.17c.01-.58 1.49-36.5-39.52-36.5"></path><path fill="#e8ad00" d="M116.62 53.3c-1.24 0-2.25.96-2.25 2.14v9.2c0 1.18 1.01 2.14 2.25 2.14s2.25-.96 2.25-2.14v-9.2c0-1.18-1.01-2.14-2.25-2.14m-4.5 0c-1.24 0-2.25.96-2.25 2.14v9.2c0 1.18 1.01 2.14 2.25 2.14s2.25-.96 2.25-2.14v-9.2c0-1.18-1.01-2.14-2.25-2.14"></path><path fill="#ffca28" d="M114.37 53.3c-1.24 0-2.25.96-2.25 2.14v11.19c0 1.18 1.01 2.14 2.25 2.14s2.25-.96 2.25-2.14V55.44c0-1.18-1.01-2.14-2.25-2.14"></path><ellipse cx={114.37} cy={52.07} fill="#ffca28" rx={2.76} ry={2.63}></ellipse><path fill="#504f4f" d="M114.37 52.04c-.55 0-1-.45-1-1v-38c0-.55.45-1 1-1s1 .45 1 1v38c0 .55-.45 1-1 1"></path><linearGradient id="SVGKcA6Wc5m" x1={63.366} x2={63.366} y1={128.333} y2={99.693} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0.003} stopColor="#424242"></stop><stop offset={0.472} stopColor="#353535"></stop><stop offset={1} stopColor="#212121"></stop></linearGradient><path fill="url(#SVGKcA6Wc5m)" d="M115.37 12c-30.83-7.75-52-8-52-8s-21.17.25-52 8v.77c0 1.33.87 2.5 2.14 2.87c3.72 1.1 12.09 3.32 17.15 4.33c-.08.08-1.29 1.89-2.05 3.35c0 0 9.39 6.12 34.76 8.68c25.37-2.56 36.65-8.5 36.65-8.5c-.88-1.81-1.92-3.34-1.92-3.34c4.5-.74 11.46-3.3 15.18-4.48c1.25-.4 2.09-1.55 2.09-2.86z"></path><linearGradient id="SVGrvOTybdt" x1={63.366} x2={63.366} y1={128.167} y2={97.167} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0.003} stopColor="#616161"></stop><stop offset={0.324} stopColor="#505050"></stop><stop offset={0.955} stopColor="#242424"></stop><stop offset={1} stopColor="#212121"></stop></linearGradient><path fill="url(#SVGrvOTybdt)" d="M63.37 4s-21.17.25-52 8c0 0 35.41 9.67 52 9.38c16.59.29 52-9.38 52-9.38c-30.84-7.75-52-8-52-8"></path><linearGradient id="SVGORLHgdmi" x1={13.259} x2={114.087} y1={110.001} y2={110.001} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0.001} stopColor="#bfbebe"></stop><stop offset={0.3} stopColor="#212121" stopOpacity={0}></stop><stop offset={0.7} stopColor="#212121" stopOpacity={0}></stop><stop offset={1} stopColor="#bfbebe"></stop></linearGradient><path fill="url(#SVGORLHgdmi)" d="M115.37 12c-30.83-7.75-52-8-52-8s-21.17.25-52 8v.77c0 1.33.87 2.5 2.14 2.87c3.72 1.1 12.09 3.21 17.15 4.35c0 0-1.07 1.49-2.05 3.33c0 0 9.39 6.12 34.76 8.68c25.37-2.56 36.65-8.5 36.65-8.5c-.88-1.81-1.92-3.34-1.92-3.34c4.5-.74 11.46-3.3 15.18-4.48c1.25-.4 2.09-1.55 2.09-2.86z" opacity={0.4}></path></svg>), label: 'Student', desc: 'Currently enrolled' },
    { id: 'developer', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 72 72"><path fill="#92d3f5" d="M17.135 58.899s-2-13.5 10-13.5c3.191 2.128 5.926 3.598 9 3.592h-.125c3.102-.152 5.408-2.164 8.6-4.292c15.57 0 10.8 14.2 10.8 14.2"></path><path fill="#61b2e4" d="M49.297 58.861V45.986l-4.491-.784v7.245H26.929l.002-7.245l-4.666.784v12.875z"></path><path fill="#d0cfce" d="m67.087 43.423l-6.95 16.349h-24.99l6.95-16.349z"></path><path fill="#9b9b9a" d="m67.303 43.423l-6.95 16.349h-8.99l6.95-16.349z"></path><path fill="#f4aa41" d="M49.163 33.788c-2.113 5.285-7.42 8.703-13.631 8.703c-5.355 0-11.31-3.308-13.423-8.592l-.075-.182c-.67-1.657-.562-3.686-.562-5.583L23.626 9.37l6.008 5.843a14.4 14.4 0 0 1 5.586-1.124h.624c1.919-.002 3.818.38 5.586 1.124l6.595-6.423l2.187 19.636a14.3 14.3 0 0 1-1.04 5.366"></path><path fill="#e27022" d="M35.532 42.49c6.231.2 11.955-3.397 14.068-8.682l.065-.134c.67-1.658.563-3.998.563-5.895L48.025 8.79"></path><path fill="#b399c8" d="m22.652 17.7l-.487 4.728l27.132-1.641l-.283-2.454z"></path><path fill="#b399c8" d="M50.897 19.6a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path><path fill="#fff" d="M47.072 24.975s-8.168 3.407-7.783 3.84c7.815 7.016 8.428-2.863 7.783-3.84m-22.444 0s7.557 4.01 7.784 3.84c-7.545 7.384-8.546-2.237-7.784-3.84m29.094 26.763a3.42 3.42 0 0 1-2.85 2c-1.103 0-1.62-.896-1.15-2a3.42 3.42 0 0 1 2.849-2c1.103 0 1.619.896 1.15 2"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M36.872 47.899c-.352.054-.71.082-1.066.08h.125c-3.074.007-5.808-1.463-9-3.591c-12 0-9.886 13.56-9.886 13.56"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M35.467 52.133h-8.538l.002-7.245m-4.666.869v12.11m12.882 1.905h24.99l6.95-16.349h-24.99zm-10.97.001h10.97"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m38.294 35.589l-2.444-3.014m-2.443 3.014l2.443-3.014m-2.443 0h4.887"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m49.767 23.869l.438 4.184a13.7 13.7 0 0 1-1.017 5.19m-26.676-.001a13.7 13.7 0 0 1-1.017-5.189l2.138-18.99l6.45 6.211a14.2 14.2 0 0 1 5.462-1.086h.61a14.2 14.2 0 0 1 5.464 1.086l6.448-6.21l.666 6.398"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M28.112 39.972a14.1 14.1 0 0 0 7.433 2.097h.61c2.625.005 5.199-.72 7.433-2.097"></path><ellipse cx={28.52} cy={27.752} rx={1.222} ry={1.206}></ellipse><ellipse cx={43.181} cy={27.752} rx={1.222} ry={1.206}></ellipse><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M47.072 24.947s-8.168 3.408-7.783 3.84c7.815 7.016 8.428-2.862 7.783-3.84m3.85 12.248l-5.498-3.015m3.254 5.629l-5.497-3.014M24.628 24.947s7.557 4.01 7.784 3.84c-7.545 7.384-8.546-2.237-7.784-3.84m-3.849 12.248l5.497-3.015m-3.254 5.629l5.498-3.014m18.478-18.511L22.652 17.7l-.487 4.728l24.84-1.502"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M50.497 19.6a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path></svg>), label: 'Developer', desc: 'Working professional' },
    { id: 'founder', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 36 36"><path fill="#a0041e" d="m1 17l8-7l16 1l1 16l-7 8s.001-5.999-6-12s-12-6-12-6"></path><path fill="#ffac33" d="M.973 35s-.036-7.979 2.985-11S15 21.187 15 21.187S14.999 29 11.999 32S.973 35 .973 35"></path><circle cx={8.999} cy={27} r={4} fill="#ffcc4d"></circle><path fill="#55acee" d="M35.999 0s-10 0-22 10c-6 5-6 14-4 16s11 2 16-4c10-12 10-22 10-22"></path><path d="M26.999 5a4 4 0 0 0-3.641 2.36A4 4 0 0 1 24.999 7a4 4 0 0 1 4 4c0 .586-.133 1.139-.359 1.64A3.99 3.99 0 0 0 30.999 9a4 4 0 0 0-4-4"></path><path fill="#a0041e" d="M8 28s0-4 1-5s13.001-10.999 14-10s-9.001 13-10.001 14S8 28 8 28"></path></svg>), label: 'Founder', desc: 'Building a startup' },
    { id: 'educator', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 128 128"><linearGradient id="SVG94UxKdBD" x1={63.999} x2={63.999} y1={116.605} y2={39.511} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#26a69a"></stop><stop offset={1} stopColor="#00796b"></stop></linearGradient><path fill="url(#SVG94UxKdBD)" d="M6.36 10.9h115.29v77.52H6.36z"></path><linearGradient id="SVGtNRZjddE" x1={63.999} x2={63.999} y1={119.455} y2={37.224} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#8d6e63"></stop><stop offset={0.779} stopColor="#795548"></stop></linearGradient><path fill="url(#SVGtNRZjddE)" d="M119.29 13.26v72.81H8.71V13.26zM124 8.55H4v82.23h120z"></path><path fill="#543930" d="M64.57 2.87c-41.01 0-40.68 37.92-40.68 38.52c0 24.56 1.88 59.25 11.71 72.9c3.9 5.41 11.43 5.71 11.43 5.71l16.97-.02l16.97.02s7.54-.3 11.43-5.71c9.83-13.65 11.71-48.34 11.71-72.9c-.01-.6 1.47-38.52-39.54-38.52"></path><radialGradient id="SVGlnTXIbgX" cx={64} cy={69.561} r={47.532} gradientTransform="matrix(1 0 0 -1.1901 0 141.221)" gradientUnits="userSpaceOnUse"><stop offset={0.794} stopColor="#6d4c41" stopOpacity={0}></stop><stop offset={1} stopColor="#6d4c41"></stop></radialGradient><path fill="url(#SVGlnTXIbgX)" d="M64.57 2.87c-41.01 0-40.68 37.92-40.68 38.52c0 24.56 1.88 59.25 11.71 72.9c3.9 5.41 11.43 5.71 11.43 5.71l16.97-.02l16.97.02s7.54-.3 11.43-5.71c9.83-13.65 11.71-48.34 11.71-72.9c-.01-.6 1.47-38.52-39.54-38.52"></path><linearGradient id="SVGLi62rc9w" x1={64} x2={64} y1={18.343} y2={4.85} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#b3e5fc"></stop><stop offset={1} stopColor="#70afe3"></stop></linearGradient><path fill="url(#SVGLi62rc9w)" d="M114.5 123.94v-3.18c0-15.47-25.34-23.56-50.36-23.56H64c-25.14.03-50.5 7.32-50.5 23.56v3.18z"></path><path fill="#3488c1" d="M15 123.94v-3.18c0-15.2 24.61-22.03 49-22.06h.13c12.9 0 25.42 2.19 34.36 6c6.62 2.83 14.51 7.91 14.51 16.05v3.18h3v-3.18C116 104 89.74 95.7 64.13 95.7H64c-25.49.03-52 7.28-52 25.06v3.18z"></path><linearGradient id="SVGW94yLbXC" x1={30.39} x2={30.39} y1={32.297} y2={4.991} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#651fff"></stop><stop offset={0.705} stopColor="#5914f2"></stop><stop offset={1} stopColor="#530eeb"></stop></linearGradient><path fill="url(#SVGW94yLbXC)" d="M12 120.75v3.18h32.6c.78-21.78 4.18-28.01 4.18-28.01C31.83 99.62 12.75 104 12 120.75"></path><linearGradient id="SVGLcyrvdsh" x1={98} x2={98} y1={30.994} y2={5.033} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#651fff"></stop><stop offset={0.705} stopColor="#5914f2"></stop><stop offset={1} stopColor="#530eeb"></stop></linearGradient><path fill="url(#SVGLcyrvdsh)" d="M79.61 95.93s3.39 6.23 4.18 28.01h32.6v-3.18c-.75-16.76-19.83-21.14-36.78-24.83"></path><linearGradient id="SVGZ388lcwj" x1={39.001} x2={39.001} y1={29} y2={5.422} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#d1c4e9" stopOpacity={0.2}></stop><stop offset={0.785} stopColor="#d1c4e9" stopOpacity={0.6}></stop></linearGradient><path fill="url(#SVGZ388lcwj)" d="M38.45 123.94c.03-4.94.58-15.24 4.12-26.67l-3.38.82c-3.22 11.18-3.74 20.96-3.75 25.85z"></path><linearGradient id="SVGb1E0IdHY" x1={997.477} x2={997.477} y1={30.237} y2={5.612} gradientTransform="rotate(180 543.238 64)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#d1c4e9" stopOpacity={0.2}></stop><stop offset={0.785} stopColor="#d1c4e9" stopOpacity={0.6}></stop></linearGradient><path fill="url(#SVGb1E0IdHY)" d="M92.56 123.94c-.01-4.89-.53-14.67-3.75-25.85l-3.38-.82c3.54 11.43 4.09 21.73 4.12 26.67z"></path><path fill="#99674f" d="M64 92.33h-9.08v9.98c0 4.51 3.7 8.17 8.26 8.17h1.65c4.56 0 8.26-3.66 8.26-8.17v-9.98z"></path><linearGradient id="SVGVXuvreHM" x1={54.339} x2={55.176} y1={16.875} y2={37.154} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#e1f5fe"></stop><stop offset={1} stopColor="#81d4fa"></stop></linearGradient><path fill="url(#SVGVXuvreHM)" d="m54 91.88l9.98 12.81s.5-.38 0 0l-16.23 6.64l-2.41-14.54z"></path><linearGradient id="SVGkFbIHdVC" x1={72.97} x2={73.807} y1={16.106} y2={36.385} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#e1f5fe"></stop><stop offset={1} stopColor="#81d4fa"></stop></linearGradient><path fill="url(#SVGkFbIHdVC)" d="m74.21 91.88l-9.98 12.81s-.5-.38 0 0l16.23 6.64l2.41-14.54z"></path><linearGradient id="SVGsN0QNblA" x1={79.15} x2={72.817} y1={21.117} y2={-5.55} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0.002} stopColor="#212121" stopOpacity={0.2}></stop><stop offset={1} stopColor="#212121" stopOpacity={0.6}></stop></linearGradient><path fill="url(#SVGsN0QNblA)" d="m100.99 123.94l.76-2.65l.63-2.18l-.06-.02l.01-.05l-1.55-.44l1.64-5.72c.1-.35.09-.7 0-1.02c0-.01-.01-.03-.01-.04a.3.3 0 0 0-.04-.1c-.17-.54-.56-.97-1.09-1.13l-.15-.04h-.01l-3.75-1.08l-34.93-10.05c-.05-.01-.09-.01-.13-.03a6.177 6.177 0 0 0-7.51 4.27l-1.44 5.03q-.15.51-.33 1.11l-1.32 4.61l-2.74 9.53z"></path><path fill="#424242" d="m102.29 123.94l3.46-12.06c.29-1.01-.29-2.06-1.3-2.34l-38.69-11.1a6.19 6.19 0 0 0-7.65 4.24l-6.1 21.27z"></path><linearGradient id="SVG3w6cadFc" x1={81.888} x2={76.721} y1={17.259} y2={-0.074} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#ef5350"></stop><stop offset={1} stopColor="#e53935"></stop></linearGradient><path fill="url(#SVG3w6cadFc)" d="m104.04 123.94l1.04-3.63c.35-1.22-.38-2.5-1.62-2.85l-41.52-11.9c-4.53-1.3-5.32 2.35-6.59 6.78l-3.33 11.6z"></path><path fill="#424242" d="M64.33 101.57c.18 0 .38.02.59.07l37.25 10.7l-.31 1.08c-11.79-3.29-34.29-9.62-38.94-11.16c.24-.33.71-.69 1.41-.69m0-3.33c-4.52 0-6.78 5.57-3.12 6.94c4.03 1.5 42.93 12.32 42.93 12.32l1.58-5.52c.31-1.06-.19-2.14-1.11-2.4L65.77 98.42q-.75-.18-1.44-.18" opacity={0.2}></path><linearGradient id="SVG9LC8wd6F" x1={-117.44} x2={-73.995} y1={-972.312} y2={-972.312} gradientTransform="matrix(.9612 .2758 -.3192 1.1123 -136.555 1216.41)" gradientUnits="userSpaceOnUse"><stop offset={0.01} stopColor="#bdbdbd"></stop><stop offset={0.987} stopColor="#f5f5f5"></stop></linearGradient><path fill="url(#SVG9LC8wd6F)" d="m103.37 112.12l-39.8-11.42c-1.08-.31-2.26.46-2.62 1.71l-.06.22c-.36 1.25.23 2.53 1.31 2.84l39.8 11.42s-.34-.83.07-2.3c.41-1.48 1.3-2.47 1.3-2.47"></path><defs><path id="SVGJK1MlpxS" d="m105.67 118.03l-44.5-12.66c-3.53-1-3.9.22-4.81 3.43l-4.34 15.18l51.97-.02z"></path></defs><clipPath id="SVGBIAh1dwa"><use href="#SVGJK1MlpxS"></use></clipPath><linearGradient id="SVG0RRDvcul" x1={52.555} x2={56.93} y1={5.954} y2={19.704} gradientTransform="matrix(1 0 0 -1 0 128)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#212121"></stop><stop offset={1} stopColor="#424242"></stop></linearGradient><path fill="url(#SVG0RRDvcul)" d="m55.88 123.94l7.75-26.99l-6.43-1.85l-8.28 28.84z" clipPath="url(#SVGBIAh1dwa)"></path><path fill="#ba8d68" d="M64.31 16.04c-17.2 0-33.13 12.79-33.13 39.91c0 21.78 13.49 34.67 25.23 38.83c2.8.99 5.5 1.49 7.9 1.49c2.38 0 5.07-.49 7.85-1.47c11.76-4.14 25.28-17.03 25.28-38.84c0-27.13-15.93-39.92-33.13-39.92"></path><path fill="#99674f" d="M68.37 68.06c-.11-.04-.21-.07-.32-.08h-6.99c-.11.01-.21.04-.32.08c-.63.26-.98.91-.68 1.61s1.69 2.66 4.49 2.66s4.19-1.96 4.5-2.66c.3-.7-.05-1.36-.68-1.61"></path><g fill="#49362e"><ellipse cx={49.31} cy={58.87} rx={4.87} ry={5.04}></ellipse><ellipse cx={79.8} cy={58.87} rx={4.87} ry={5.04}></ellipse></g><path fill="#613e31" d="M55.54 49.82c-.93-1.23-3.07-3.01-7.23-3.01S42 48.6 41.08 49.82c-.41.54-.31 1.17-.02 1.55c.26.35 1.04.68 1.9.39s2.54-1.16 5.35-1.18c2.81.02 4.49.89 5.35 1.18s1.64-.03 1.9-.39c.29-.38.39-1.01-.02-1.55m32.5 0c-.93-1.23-3.07-3.01-7.23-3.01s-6.31 1.79-7.23 3.01c-.41.54-.31 1.17-.02 1.55c.26.35 1.04.68 1.9.39s2.54-1.16 5.35-1.18c2.81.02 4.49.89 5.35 1.18s1.64-.03 1.9-.39c.28-.38.38-1.01-.02-1.55"></path><path fill="#5d4037" d="M72.62 76.14c-3.15 1.87-13.47 1.87-16.61 0c-1.81-1.07-3.65.57-2.9 2.21c.74 1.61 6.37 5.36 11.23 5.36s10.42-3.75 11.16-5.36c.75-1.64-1.07-3.29-2.88-2.21"></path><path fill="#212121" stroke="#212121" strokeMiterlimit={10} strokeWidth={0.55} d="M93.93 52.93c-.07-1.19-.12-1.31-1.69-1.81c-1.23-.39-7.95-.94-13.01-.66c-.36.02-.71.04-1.04.07c-4.59.39-10.1 2.24-14.24 2.34c-1.76.04-9.01-1.86-14.14-2.26c-.33-.02-.66-.05-1-.06c-5.07-.26-11.82.33-13.05.73c-1.57.51-1.62.63-1.68 1.82c-.07 1.18.13 2.2 1.06 2.51c1.27.42 1.28 2 2.13 6.54c.77 4.14 2.62 7.41 10.57 7.98c.34.02.66.04.98.04c7.03.1 9.45-4.53 10.25-6.07c1.49-2.86 1.02-6.8 4.96-6.81c3.93-.01 3.56 3.86 5.07 6.71c.81 1.53 3.17 6.18 10.14 6.08c.34 0 .69-.02 1.05-.05c7.94-.62 9.78-3.9 10.52-8.04c.82-4.55.83-6.14 2.09-6.56c.91-.3 1.1-1.31 1.03-2.5zM53.37 68.17c-1.22.57-2.85.86-4.57.86c-3.59-.01-7.57-1.27-9.01-3.81c-2.04-3.62-2.57-10.94.03-12.47c1.14-.67 4.99-1.13 8.97-.96c4.13.18 8.4 1.04 9.94 3.06c2.56 3.33-1.5 11.5-5.36 13.32zm34.9-3.1c-1.43 2.56-5.44 3.85-9.05 3.86c-1.7.01-3.31-.27-4.51-.83c-3.87-1.8-7.97-9.94-5.45-13.29c1.53-2.04 5.82-2.92 9.96-3.12c3.97-.19 7.81.25 8.94.91c2.62 1.52 2.13 8.84.11 12.47z"></path><path fill="#543930" d="M64.57 2.87c-41.01 0-40.68 37.92-40.68 38.52c0 7.76.19 16.53.75 25.32l6.72-.02c-.06-2.92 1.99-20.97 8.08-22.34c22.36-5.03 35.01-16.89 35.01-16.89c3.29 7.18 13.58 14.19 17.27 16.86c3.03 2.19 4.58 18.55 4.52 22.38h7.09c0-.05.02-.1.02-.16c.56-8.75.74-17.46.74-25.17c.01-.58 1.49-38.5-39.52-38.5"></path><radialGradient id="SVGZ7ahRF0L" cx={64.333} cy={65.537} r={49.788} gradientTransform="matrix(1 0 0 -1.2135 0 141.995)" gradientUnits="userSpaceOnUse"><stop offset={0.794} stopColor="#6d4c41" stopOpacity={0}></stop><stop offset={1} stopColor="#6d4c41"></stop></radialGradient><path fill="url(#SVGZ7ahRF0L)" d="M64.57 2.87c-41.01 0-40.68 37.92-40.68 38.52c0 7.76.19 16.53.75 25.32l6.72-.02c-.06-2.92 1.99-20.97 8.08-22.34c22.36-5.03 35.01-16.89 35.01-16.89c3.29 7.18 13.58 14.19 17.27 16.86c3.03 2.19 4.58 18.55 4.52 22.38h7.09c0-.05.02-.1.02-.16c.56-8.75.74-17.46.74-25.17c.01-.58 1.49-38.5-39.52-38.5"></path></svg>), label: 'Educator', desc: 'Teaching / mentoring' },
    { id: 'jobseeker', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M10.815 16.804a7.903 7.903 0 1 0 0-15.805a7.903 7.903 0 0 0 0 15.805"></path><path fill="#c2f3ff" d="M10.816 1A7.898 7.898 0 0 0 5.29 14.546L16.46 3.377A7.87 7.87 0 0 0 10.815 1"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M10.815 16.804a7.903 7.903 0 1 0 0-15.805a7.903 7.903 0 0 0 0 15.805" strokeWidth={1}></path><path fill="#c77f67" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M13.452 7.261q.045-.236.049-.478a2.912 2.912 0 1 0-5.775.478a3.85 3.85 0 0 0 2.863-1.333a3.85 3.85 0 0 0 2.863 1.333" strokeWidth={1}></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M10.59 5.928a3.85 3.85 0 0 1-2.862 1.333a2.9 2.9 0 0 0 5.724 0a3.85 3.85 0 0 1-2.862-1.333" strokeWidth={1}></path><path fill="#fff" d="M14.87 18.217h-2.146L11.846 23H9.351l-.876-4.783H6.26"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M14.87 18.217h-2.146L11.846 23H9.351l-.876-4.783H6.26" strokeWidth={1}></path><path fill="#fff" d="m7.39 13.913l.144-.546a3.157 3.157 0 0 1 6.147 0l.137.546s-.85 1.023-3.214 1.023s-3.213-1.023-3.213-1.023"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m7.39 13.913l.144-.546a3.157 3.157 0 0 1 6.147 0l.137.546m7.269 5.261L16.4 14.487" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m12.452 11.534l-1.844 2.904l-1.828-2.916" strokeWidth={1}></path></g></svg>), label: 'Job seeker', desc: 'Actively applying' },
    { id: 'teamlead', icon: (<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="#1fa0ff" d="M23.33 12.65v1a1 1 0 0 1-.8 1l-1.24.25a9.3 9.3 0 0 1-1.18 2.81l.71 1.06A1 1 0 0 1 20.7 20l-1.37 1.37a1 1 0 0 1-1.26.12L17 20.77A9.3 9.3 0 0 1 14.2 22l-.2 1.19a1 1 0 0 1-1 .8h-2a1 1 0 0 1-1-.8L9.8 22A9.3 9.3 0 0 1 7 20.77l-1.06.71a1 1 0 0 1-1.26-.12L3.3 20a1 1 0 0 1-.12-1.26l.71-1.06a9.3 9.3 0 0 1-1.18-2.81l-1.24-.25a1 1 0 0 1-.8-1v-1h6.56a4.77 4.77 0 0 0 9.54 0Zm-6.16-8.84a2.32 2.32 0 1 0 4.64 0a2.32 2.32 0 1 0-4.64 0m-14.97 0a2.32 2.32 0 1 0 4.64 0a2.32 2.32 0 1 0-4.64 0M6.8 8.8a5 5 0 0 0-1.15-.54A4.92 4.92 0 0 0 0 10.64h5.73A11 11 0 0 1 6.8 8.8m11.38 1.87H24a4.92 4.92 0 0 0-5.66-2.4a5 5 0 0 0-1.17.55a11.5 11.5 0 0 1 1.01 1.85m-1.11 0A5.74 5.74 0 0 0 12 7a5.76 5.76 0 0 0-5.12 3.68ZM8.99 2.91a2.91 2.91 0 1 0 5.82 0a2.91 2.91 0 1 0-5.82 0"></path></svg>), label: 'Team lead', desc: 'Managing a team' },
];

const EXP_LEVELS = ['Beginner (0–1 yr)', 'Junior (1–3 yrs)', 'Mid-level (3–5 yrs)', 'Senior (5+ yrs)'];
const DURATION_OPTIONS = ['Less than a week', '1–4 weeks', '1–3 months', '3–6 months', '6+ months'];

const FEATURE_RATINGS = [
    { key: 'msg', label: 'Messaging & real-time collaboration', sub: 'Integrated chat, channels, and media sharing' },
    { key: 'vid', label: 'Voice & video calls', sub: 'Built-in meetings and huddles' },
    { key: 'res', label: 'AI resume engine', sub: 'Resume generation, ATS-readiness, role adaptation' },
    { key: 'sch', label: 'Smart scheduler & task management', sub: 'Projects, teams, personal workspace, leader dashboard' },
    { key: 'tws', label: 'Team workspace & collaboration', sub: 'Shared spaces, contribution tracking, productivity insights' },
    { key: 'ov', label: 'Overall platform experience', sub: 'How the whole ecosystem feels together' },
];

const FEATURE_TAGS = [
    'Messaging', 'Voice calls', 'Video meetings', 'AI resume', 'Resume templates',
    'ATS checker', 'Smart scheduler', 'Personal workspace', 'Team projects',
    'Leader dashboard', 'Media sharing', 'Productivity analytics',
];

const REPLACE_OPTIONS = ['Yes — completely', 'Partially — for some workflows', 'Not yet — needs more features', 'No — I prefer my current setup'];
const DISCOVER_OPTIONS = ['College / university', 'Friend or colleague', 'Twitter / X', 'LinkedIn', 'GitHub', 'Product Hunt', 'Search engine', 'Other'];

const STEP_PROGRESS = [0, 25, 50, 75, 100];
const STEP_LABELS = [
    '',
    'Step 1 of 4 — About you',
    'Step 2 of 4 — Feature ratings',
    'Step 3 of 4 — Your written review',
    'Step 4 of 4 — Publishing preferences',
];

// ─── REUSABLE UI COMPONENTS ──────────────────────────────────────────────────

const inputClass = "w-full bg-white/[0.035] border border-white/10 rounded-xl px-[15px] py-[11px] text-[13px] text-white font-sans outline-none focus:border-blue-500/50 transition-colors resize-none";

function FG({ label, req, children }) {
    return (
        <div className="mb-5">
            <label className="block text-[12px] font-medium text-white/50 mb-[7px] tracking-wide font-sans">
                {label}{req && <span className="text-white/20 font-normal"> (required)</span>}
            </label>
            {children}
        </div>
    );
}

function In({ type = 'text', ...p }) { return <input type={type} className={inputClass} {...p} />; }
function Sel({ children, ...p }) { return <select className={inputClass} {...p}>{children}</select>; }
function Ta({ rows = 4, ...p }) { return <textarea rows={rows} className={inputClass} {...p} />; }

function StarRow({ dim, val, onRate }) {
    return (
        <div className="flex items-center justify-between py-[11px] border-b border-white/5">
            <div>
                <div className="text-[13px] text-white/65 font-sans">{dim.label}</div>
                <div className="text-[11px] text-white/30 mt-0.5 font-sans">{dim.sub}</div>
            </div>
            <div className="flex gap-[3px] shrink-0 ml-4">
                {[1, 2, 3, 4, 5].map(v => (
                    <span key={v} onClick={() => onRate(dim.key, v)}
                        className={`text-[22px] cursor-pointer transition-all duration-100 hover:scale-125 leading-none select-none inline-block ${v <= val ? 'text-blue-500' : 'text-white/10'}`}
                    >★</span>
                ))}
            </div>
        </div>
    );
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

function Step1({ data, onChange, role, onRole, onNext }) {
    const { name, email, github, linkedin, expLevel, duration } = data;
    const ok = name.trim() && email.trim();
    return (
        <div>
            <hr className="border-none border-t border-white/5 my-6" />
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-blue-500/50 mb-3.5 font-sans">About you</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FG label="Full name" req><In value={name} onChange={e => onChange('name', e.target.value)} placeholder="Your name" /></FG>
                <FG label="Email" req><In type="email" value={email} onChange={e => onChange('email', e.target.value)} placeholder="you@email.com" /></FG>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FG label="GitHub / Portfolio URL"><In value={github} onChange={e => onChange('github', e.target.value)} placeholder="github.com/yourhandle" /></FG>
                <FG label="LinkedIn URL"><In value={linkedin} onChange={e => onChange('linkedin', e.target.value)} placeholder="linkedin.com/in/yourhandle" /></FG>
            </div>
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-blue-500/50 mt-1 mb-3.5 font-sans">What best describes you?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                {USER_ROLES.map(r => (
                    <button key={r.id} onClick={() => onRole(r.id)}
                        className={`rounded-xl p-[13px_11px] cursor-pointer text-left transition-all duration-200 border ${role === r.id ? 'bg-blue-500/10 border-blue-500/40' : 'bg-white/[0.03] border-white/5'}`}>
                        <span className="text-[18px] mb-[7px] block">{r.icon}</span>
                        <div className="text-[12px] font-medium text-white font-sans">{r.label}</div>
                        <div className="text-[10px] text-white/30 mt-0.5 font-sans leading-tight">{r.desc}</div>
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FG label="Experience level">
                    <Sel value={expLevel} onChange={e => onChange('expLevel', e.target.value)}>
                        <option value="">Select…</option>
                        {EXP_LEVELS.map(o => <option key={o} className="bg-[#06060b]">{o}</option>)}
                    </Sel>
                </FG>
                <FG label="How long have you used CodeSarthi?">
                    <Sel value={duration} onChange={e => onChange('duration', e.target.value)}>
                        <option value="">Select…</option>
                        {DURATION_OPTIONS.map(o => <option key={o} className="bg-[#06060b]">{o}</option>)}
                    </Sel>
                </FG>
            </div>
            <button onClick={onNext} disabled={!ok}
                className={`w-full bg-[#1a6cf6] rounded-xl py-3.5 text-sm font-semibold text-white tracking-wide transition-colors font-sans hover:bg-blue-600 ${!ok ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'}`}>
                Continue →
            </button>
        </div>
    );
}

function Step2({ ratings, onRate, nps, onNps, onBack, onNext }) {
    return (
        <div>
            <hr className="border-none border-t border-white/5 my-6" />
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-blue-500/50 mb-3.5 font-sans">Feature ratings</p>
            <p className="text-[12px] text-white/30 mb-[18px] font-sans leading-relaxed">Rate each core feature. Skip any you haven't used yet.</p>
            <div className="mb-7">
                {FEATURE_RATINGS.map((dim, i) => (
                    <div key={dim.key} className={i < FEATURE_RATINGS.length - 1 ? "border-b border-white/5" : ""}>
                        <StarRow dim={dim} val={ratings[dim.key] || 0} onRate={onRate} />
                    </div>
                ))}
            </div>
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-blue-500/50 mb-3 font-sans">NPS — how likely are you to recommend CodeSarthi?</p>
            <div className="flex flex-wrap gap-1 mb-1.5">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                    <button key={v} onClick={() => onNps(v)}
                        className={`w-[42px] h-9 rounded-lg border text-[13px] font-medium transition-all duration-150 font-sans ${nps === v ? 'border-blue-500/50 bg-blue-500/20 text-blue-300' : 'border-white/10 bg-white/[0.03] text-white/45'}`}>
                        {v}
                    </button>
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-white/25 font-sans mb-6">
                <span>Not at all likely</span><span>Extremely likely</span>
            </div>
            <div className="flex gap-2.5">
                <button onClick={onBack} className="w-[86px] shrink-0 bg-white/5 rounded-xl py-3.5 text-sm text-white/40 hover:bg-white/10 transition-colors font-sans">← Back</button>
                <button onClick={onNext} className="flex-1 bg-[#1a6cf6] rounded-xl py-3.5 text-sm font-semibold text-white tracking-wide transition-colors font-sans hover:bg-blue-600">Continue →</button>
            </div>
        </div>
    );
}

function Step3({ data, onChange, tags, onToggleTag, onBack, onNext }) {
    const { reviewText, best, better, replace } = data;
    const ok = reviewText.trim().length >= 40;
    return (
        <div>
            <hr className="border-none border-t border-white/5 my-6" />
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-blue-500/50 mb-3.5 font-sans">Your written review</p>
            <div className="mb-5">
                <label className="block text-[12px] font-medium text-white/50 mb-[7px] tracking-wide font-sans">
                    Overall review <span className="text-white/20 font-normal">(required — min 40 chars)</span>
                </label>
                <Ta rows={5} value={reviewText} maxLength={2000} onChange={e => onChange('reviewText', e.target.value)}
                    placeholder="How has CodeSarthi changed the way you work? Be specific..." />
                <div className="text-[11px] text-white/20 text-right mt-1 font-sans">{reviewText.length}/2000</div>
            </div>
            <FG label="Best thing about CodeSarthi"><Ta rows={2} value={best} maxLength={2000} onChange={e => onChange('best', e.target.value)} /><div className="text-[11px] text-white/20 text-right mt-1 font-sans">{best.length}/2000</div></FG>
            <FG label="What could be better?"><Ta rows={2} value={better} maxLength={2000} onChange={e => onChange('better', e.target.value)} /><div className="text-[11px] text-white/20 text-right mt-1 font-sans">{better.length}/2000</div></FG>
            <div className="mb-5">
                <label className="block text-[12px] font-medium text-white/50 mb-[7px] font-sans">Which features have you used?</label>
                <div className="flex flex-wrap gap-1.5">
                    {FEATURE_TAGS.map(tag => (
                        <button key={tag} onClick={() => onToggleTag(tag)}
                            className={`rounded-full px-3 py-1 text-[11px] transition-all border font-sans ${tags.includes(tag) ? 'bg-blue-500/15 border-blue-500/35 text-blue-300' : 'bg-white/5 border-white/10 text-white/40'}`}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <FG label="Would you replace your current tools with CodeSarthi?">
                <Sel value={replace} onChange={e => onChange('replace', e.target.value)}>
                    <option value="">Select…</option>
                    {REPLACE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </Sel>
            </FG>
            <div className="flex gap-2.5">
                <button onClick={onBack} className="w-[86px] shrink-0 bg-white/5 rounded-xl py-3.5 text-sm text-white/40 font-sans">← Back</button>
                <button onClick={onNext} disabled={!ok}
                    className={`flex-1 bg-[#1a6cf6] rounded-xl py-3.5 text-sm font-semibold text-white transition-colors font-sans hover:bg-blue-600 ${!ok ? 'opacity-35 cursor-not-allowed' : ''}`}>
                    Continue →
                </button>
            </div>
        </div>
    );
}

function Step4({ data, onChange, publishAllowed, onTogglePublish, onBack, onSubmit }) {
    const { attrName, discover, extra } = data;
    return (
        <div>
            <hr className="border-none border-t border-white/5 my-6" />
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-blue-500/50 mb-3.5 font-sans">Publishing preferences</p>
            <div onClick={onTogglePublish} className="flex items-center gap-3 p-3.5 bg-blue-500/5 border border-blue-500/15 rounded-xl mb-4 cursor-pointer">
                <div className={`w-9 h-5 rounded-full relative transition-all duration-200 border ${publishAllowed ? 'bg-blue-500/50 border-blue-500/60' : 'bg-white/5 border-white/15'}`}>
                    <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all duration-200 ${publishAllowed ? 'left-[18px] bg-white' : 'left-0.5 bg-white/50'}`} />
                </div>
                <div className="text-[12px] text-white/50 leading-relaxed font-sans">
                    <strong className="text-white/70 font-medium">Allow CodeSarthi to publish this review</strong><br />
                    Your name and review may appear on the website.
                </div>
            </div>
            <FG label="Attribution display name (optional)"><In value={attrName} onChange={e => onChange('attrName', e.target.value)} /></FG>
            <FG label="How did you discover CodeSarthi?">
                <Sel value={discover} onChange={e => onChange('discover', e.target.value)}>
                    <option value="">Select…</option>
                    {DISCOVER_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </Sel>
            </FG>
            <FG label="Anything else?"><Ta rows={3} value={extra} onChange={e => onChange('extra', e.target.value)} /></FG>
            <div className="flex gap-2.5">
                <button onClick={onBack} className="w-[86px] shrink-0 bg-white/5 rounded-xl py-3.5 text-sm text-white/40 font-sans">← Back</button>
                <button onClick={onSubmit} className="flex-1 bg-[#1a6cf6] rounded-xl py-3.5 text-sm font-semibold text-white font-sans hover:bg-blue-600">Submit review →</button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const UserReview = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [refId, setRefId] = useState('');
    const [visible, setVisible] = useState(false);

    const [profile, setProfile] = useState({ name: '', email: '', github: '', linkedin: '', expLevel: '', duration: '' });
    const [role, setRole] = useState(null);
    const [ratings, setRatings] = useState({ msg: 0, vid: 0, res: 0, sch: 0, tws: 0, ov: 0 });
    const [nps, setNps] = useState(null);
    const [review, setReview] = useState({ reviewText: '', best: '', better: '', replace: '' });
    const [usedTags, setUsedTags] = useState([]);
    const [publish, setPublish] = useState({ attrName: '', discover: '', extra: '' });
    const [pubAllow, setPubAllow] = useState(false);

    useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

    const handleSubmit = () => {
        console.log(`name: ${wholeData.profile.name}`)
        console.log(`email: ${wholeData.profile.email}`)
        console.log(`github: ${wholeData.profile.github}`)
        console.log(`linkedin: ${wholeData.profile.linkedin}`)
        console.log(`expLevel: ${wholeData.profile.expLevel}`)
        console.log(`duration: ${wholeData.profile.duration}`)

        console.log(`role: ${wholeData.role}`)


        console.log(`msg: ${wholeData.ratings.msg}`)
        console.log(`ov: ${wholeData.ratings.ov}`)
        console.log(`res: ${wholeData.ratings.res}`)
        console.log(`sch: ${wholeData.ratings.sch}`)
        console.log(`tws: ${wholeData.ratings.tws}`)
        console.log(`vid: ${wholeData.ratings.vid}`)
        console.log(`nps: ${wholeData.nps}`)

        console.log(`best: ${wholeData.review.best}`)
        console.log(`better: ${wholeData.review.better}`)
        console.log(`replace: ${wholeData.review.replace}`)
        console.log(`reviewText: ${wholeData.review.reviewText}`)
        console.log(`usedTags: ${wholeData.usedTags}`)

        console.log(`attrName: ${wholeData.publish.attrName}`)
        console.log(`discover: ${wholeData.publish.discover}`)
        console.log(`extra: ${wholeData.publish.extra}`)
        console.log(`pubAllow: ${wholeData.pubAllow}`)
        setRefId('RVW-' + Math.floor(100000 + Math.random() * 900000));
        setSubmitted(true);
    };

    const resetForm = () => {
        setStep(1); setSubmitted(false); setRefId('');
        setProfile({ name: '', email: '', github: '', linkedin: '', expLevel: '', duration: '' });
        setRole(null); setRatings({ msg: 0, vid: 0, res: 0, sch: 0, tws: 0, ov: 0 });
        setNps(null); setReview({ reviewText: '', best: '', better: '', replace: '' });
        setUsedTags([]); setPublish({ attrName: '', discover: '', extra: '' }); setPubAllow(false);
    };


    const wholeData = {
        profile,
        role,
        ratings,
        nps,
        review,
        usedTags,
        publish,
        pubAllow,
        refId,
        submitted,
        step,
        visible,
    };

    const [doing, setDoing] = useState(false);
    const [err, setErr] = useState(false);
    const [errText, setErrText] = useState("");
    const revieew = async () => {
        try {
            setDoing(true);
            const response = await axios.post(
                `${BASE_URL}/create-review`, {
                name: wholeData.profile.name,
                email: wholeData.profile.email,
                github: wholeData.profile.github,
                linkedin: wholeData.profile.linkedin,
                expLevel: wholeData.profile.expLevel,
                duration: wholeData.profile.duration,

                role: wholeData.role,


                msg: parseInt(wholeData.ratings.msg),
                ov: parseInt(wholeData.ratings.ov),
                res: parseInt(wholeData.ratings.res),
                sch: parseInt(wholeData.ratings.sch),
                tws: parseInt(wholeData.ratings.tws),
                vid: parseInt(wholeData.ratings.vid),
                nps: parseInt(wholeData.nps),

                best: wholeData.review.best,
                better: wholeData.review.better,
                replace: wholeData.review.replace,
                reviewText: wholeData.review.reviewText,
                usedTags: wholeData.usedTags,

                attrName: wholeData.publish.attrName,
                discover: wholeData.publish.discover,
                extra: wholeData.publish.extra,
                pubAllow: wholeData.pubAllow,
            },
                { withCredentials: true }
            );

            //chats dispatching
            dispatch(setChatUsers(response.data.conversation));
        } catch (err) {
            console.error(err?.message || err);
            setErr(true);
            setErrText(err?.message || err);
            setTimeout(() => {
                setErr(false);
                setErrText("");
                resetForm();
            }, 3000);
        } finally {
            setDoing(false);
        }
    };
    useEffect(() => {
        revieew();
    }, [submitted]);

    return (
        <div className="min-h-screen w-full bg-[#06060b] text-white relative overflow-x-hidden">
            <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

            {/* Ambient Lighting */}
            <div className="fixed top-[-180px] left-1/2 -translate-x-1/2 w-[860px] h-[520px] bg-[radial-gradient(ellipse_at_50%_50%,rgba(26,108,246,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

            <Nav />

            <div className="relative z-10 max-w-[80%] mx-auto px-6 pb-[120px]">
                {/* Brand Bar */}
                <div className={`flex items-center justify-between mt-[110px] mb-10 pb-4 border-b border-blue-500/15 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2.5">
                        <div className="w-[40px] h-[40px] rounded-lg bg-blue-500/15  flex items-center justify-center text-[12px] font-bold  tracking-tight"><img src="../../img/image.png" alt="" className='rounded-lg' /></div>
                        <div>
                            <div className="font-sans text-[13px] font-bold text-white/70 tracking-wide">CodeSarthi</div>
                            <div className="font-sans text-[10px] text-blue-500/60 uppercase tracking-widest mt-0.5">User Review Panel</div>
                        </div>
                    </div>
                    <div className="font-sans text-[11px] text-white/20 text-right leading-relaxed">Beta Programme<br />Unified Dev Ecosystem</div>
                </div>

                {/* Hero */}
                <div className={`mb-9 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
                    <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-blue-500/70 mb-3.5">Community Voice</p>
                    <h1 className="font-syne text-[clamp(30px,5.5vw,50px)] font-extrabold text-white leading-[1.06] tracking-tight mb-3">
                        Your experience<br /><span className="text-[#1a6cf6]">shapes the platform</span>
                    </h1>
                    <p className="font-sans text-sm text-white/40 leading-relaxed max-w-[460px] mb-7">
                        Tell us how CodeSarthi is working for you — across collaboration, resume building, and smart scheduling.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {[{ l: 'Interaction layer', c: 'bg-blue-500' }, { l: 'AI resume engine', c: 'bg-purple-500' }, { l: 'Smart scheduler', c: 'bg-emerald-500' }, { l: 'Team workspaces', c: 'bg-amber-500' }].map(c => (
                            <div key={c.l} className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${c.c}`} />
                                <span className="font-sans text-[11px] text-white/45">{c.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <div className={`bg-white/[0.015] border border-blue-500/10 rounded-[22px] p-[clamp(24px,5vw,44px)] transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    {(!submitted && !doing) ? (
                        <>
                            <div className="h-0.5 bg-blue-500/10 rounded-full mb-2.5 overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${STEP_PROGRESS[step]}%` }} />
                            </div>
                            <p className="font-sans text-[11px] text-white/25 mb-1 tracking-wide">{STEP_LABELS[step]}</p>

                            {step === 1 && <Step1 data={profile} onChange={(k, v) => setProfile(p => ({ ...p, [k]: v }))} role={role} onRole={setRole} onNext={() => setStep(2)} />}
                            {step === 2 && <Step2 ratings={ratings} onRate={(k, v) => setRatings(p => ({ ...p, [k]: v }))} nps={nps} onNps={setNps} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
                            {step === 3 && <Step3 data={review} onChange={(k, v) => setReview(p => ({ ...p, [k]: v }))} tags={usedTags} onToggleTag={(t) => setUsedTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
                            {step === 4 && <Step4 data={publish} onChange={(k, v) => setPublish(p => ({ ...p, [k]: v }))} publishAllowed={pubAllow} onTogglePublish={() => setPubAllow(!pubAllow)} onBack={() => setStep(3)} onSubmit={handleSubmit} />}
                        </>
                    ) : (
                        <div className="text-center py-16 px-5">
                            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mx-auto mb-5.5 text-[26px]">🎯</div>
                            <h2 className="font-syne text-[28px] font-extrabold text-white mb-3">Review submitted!</h2>
                            <p className="font-sans text-sm text-white/40 leading-relaxed max-w-[360px] mx-auto mb-3">Thank you for shaping CodeSarthi.</p>
                            <div className="inline-block font-sans text-[12px] font-semibold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/25 rounded-lg px-4 py-1.5 my-2.5">{refId}</div>
                            <button onClick={resetForm} className="mt-8 mx-auto w-full max-w-[220px] bg-[#1a6cf6] rounded-xl py-3.5 text-sm font-semibold text-white font-sans">Submit another →</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserReview;