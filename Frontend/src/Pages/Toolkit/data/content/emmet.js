export default {
  topics: [
    {
      id: "html-abbrev",
      title: "HTML Abbreviations',",
      sections: [
        {
          heading: "Basic element expansion",
          description: "Type an abbreviation and press Tab (or Enter in VS Code). Emmet is built into VS Code, WebStorm, and Sublime.",
          language: "html",
          code: `<!-- div → -->
<div></div>

<!-- p.intro → -->
<p class="intro"></p>

<!-- a[href=#] → -->
<a href="#"></a>

<!-- input[type=email placeholder='Email'] → -->
<input type="email" placeholder="Email">

<!-- button#submit.btn.btn-primary → -->
<button id="submit" class="btn btn-primary"></button>

<!-- h1{Hello, World!} → -->
<h1>Hello, World!</h1>

<!-- img[src=./logo.png alt=Logo] → -->
<img src="./logo.png" alt="Logo">`,
        },
        {
          heading: "Nesting & multiplication',",
          description: "> nests children; + creates siblings; * multiplies; ^ climbs up the tree.",
          language: "html",
          code: `<!-- ul>li*3 → -->
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>

<!-- nav>ul>li*4>a[href=#] → -->
<nav>
  <ul>
    <li><a href="#"></a></li>
    <li><a href="#"></a></li>
    <li><a href="#"></a></li>
    <li><a href="#"></a></li>
  </ul>
</nav>

<!-- section>h2+p — h2 and p are siblings inside section -->
<section>
  <h2></h2>
  <p></p>
</section>`,
        },
        {
          heading: "Numbering & text content',",
          description: "$ inserts an auto-incrementing number; {} adds text content.",
          language: "html",
          code: `<!-- ul>li.item-$*3 → -->
<ul>
  <li class="item-1"></li>
  <li class="item-2"></li>
  <li class="item-3"></li>
</ul>

<!-- ul>li{Item $}*4 → -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
</ul>

<!-- $@0 starts from 0, $@- counts down -->
<!-- ul>li.item-$@0*3 → item-0, item-1, item-2 -->`,
        },
      ],
    },
    {
      id: "common-snippets",
      title: "Common Snippets',",
      sections: [
        {
          heading: "Boilerplate",
          description: "! generates a full HTML5 boilerplate. doc generates the doctype + html tag.",
          language: "html",
          code: `<!-- ! expands to: -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>`,
        },
        {
          heading: "Semantic structures",
          description: "Build common layouts with a single Emmet expression.",
          language: "html",
          code: `<!-- header>nav>ul>li*4>a — nav bar -->
<header>
  <nav>
    <ul>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>
  </nav>
</header>

<!-- main>article>h1+p+footer — article -->
<main>
  <article>
    <h1></h1>
    <p></p>
    <footer></footer>
  </article>
</main>`,
        },
      ],
    },
    {
      id: "css-emmet",
      title: "CSS Abbreviations',",
      sections: [
        {
          heading: "CSS property shortcuts",
          description: "In a CSS file, Emmet shortcuts expand to full property: value declarations.",
          language: "css",
          code: `/* m20 → */         margin: 20px;
/* p10-20 → */      padding: 10px 20px;
/* mt0 → */         margin-top: 0;
/* w100p → */       width: 100%;
/* h100vh → */      height: 100vh;
/* fz16 → */        font-size: 16px;
/* fw700 → */       font-weight: 700;
/* lh1.5 → */       line-height: 1.5;
/* d-f → */         display: flex;
/* ai-c → */        align-items: center;
/* jc-sb → */       justify-content: space-between;
/* pos-r → */       position: relative;
/* c#fff → */       color: #fff;
/* bg#0a0a0b → */   background: #0a0a0b;
/* bd1px-solid-red → */ border: 1px solid red;`,
        },
        {
          heading: "Vendor prefixes",
          description: "-prefix- before a property adds vendor-prefixed versions automatically.",
          language: "css",
          code: `/* -webkit-transform → */
-webkit-transform: translateX(10px);
transform: translateX(10px);

/* -webkit-animation → */
-webkit-animation: spin 1s linear infinite;
animation: spin 1s linear infinite;`,
        },
      ],
    },
  ],
};
