// Central content registry — maps tech IDs to their cheat-sheet data.
// Adding a new technology:
//   1. Create src/data/content/<techId>.js
//   2. Import and add it here
// DocPage uses getContentForTech() to load the right module.

// ─── Web Development ────────────────────────────────────────────────────────
import html       from "./html.js";
import css        from "./css.js";
import tailwind   from "./tailwind.js";
import react      from "./react.js";
import node       from "./node.js";
import jquery     from "./jquery.js";
import htmx       from "./htmx.js";
import express    from "./express.js";
import django     from "./django.js";
import flask      from "./flask.js";
import fastapi    from "./fastapi.js";
import restapi    from "./restapi.js";
import socketio   from "./socketio.js";
import graphql    from "./graphql.js";
import scss       from "./scss.js";
import markdown   from "./markdown.js";
import yaml       from "./yaml.js";
import json       from "./json.js";

// ─── Programming Languages ──────────────────────────────────────────────────
import javascript from "./javascript.js";
import typescript from "./typescript.js";
import python     from "./python.js";
import java       from "./java.js";
import c          from "./c.js";
import cpp        from "./cpp.js";
import csharp     from "./csharp.js";
import rust       from "./rust.js";
import ruby       from "./ruby.js";
import bash       from "./bash.js";
import matlab     from "./matlab.js";
import numpy      from "./numpy.js";
import pandas     from "./pandas.js";
import dsa        from "./dsa.js";

// ─── App Development ────────────────────────────────────────────────────────
import swift       from "./swift.js";
import dart        from "./dart.js";
import reactnative from "./reactnative.js";
import flutter     from "./flutter.js";

// ─── Databases ──────────────────────────────────────────────────────────────
import mysql      from "./mysql.js";
import postgresql from "./postgresql.js";
import mongodb    from "./mongodb.js";
import neo4j      from "./neo4j.js";

// ─── Important Tools ────────────────────────────────────────────────────────
import docker        from "./docker.js";
import kubernetes    from "./kubernetes.js";
import npm           from "./npm.js";
import git           from "./git.js";
import vscode        from "./vscode.js";
import vim           from "./vim.js";
import homebrew      from "./homebrew.js";
import github        from "./github.js";
import githubactions from "./githubactions.js";
import selenium      from "./selenium.js";
import latex         from "./latex.js";
import emmet         from "./emmet.js";
import chatgpt       from "./chatgpt.js";

// ─── Registry ────────────────────────────────────────────────────────────────
const contentMap = {
  // Web Development
  html, css, tailwind, react, node,
  jquery, htmx, express, django, flask,
  fastapi, restapi, socketio, graphql, scss,
  markdown, yaml, json,

  // Programming Languages
  javascript, typescript, python, java,
  c, cpp, csharp, rust, ruby, bash, matlab, numpy, pandas, dsa,

  // App Development
  swift, dart, reactnative, flutter,

  // Databases
  mysql, postgresql, mongodb, neo4j,

  // Important Tools
  docker, kubernetes, npm, git, vscode,
  vim, homebrew, github, githubactions,
  selenium, latex, emmet, chatgpt,
};

export const getContentForTech = (techId) => contentMap[techId] ?? null;
