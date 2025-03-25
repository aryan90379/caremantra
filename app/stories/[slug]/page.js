import { notFound } from "next/navigation";
import { NextSeo } from "next-seo";
import fs from "fs/promises";
import path from "path";
import { AmpOptimizer } from "@ampproject/toolbox-optimizer";

export default async function WebStory({ params }) {
  
  console.log("Received params:", params); // Debugging output

  // Read stories.json dynamically
  const filePath = path.join(process.cwd(), "public", "stories.json");
  let stories;

  try {
    const storiesData = await fs.readFile(filePath, "utf-8");
    stories = JSON.parse(storiesData);
  } catch (error) {
    console.error("Error reading stories.json:", error);
    return notFound();
  }

  // Find the story by slug
  const story = stories.find((s) => s.id === params.slug);
  if (!story) {
    console.log("Story not found for slug:", params.slug);
    return notFound();
  }

  // AMP HTML content
  const ampHtml = `
    <!doctype html>
    <html ⚡>
    <head>
      <meta charset="utf-8">
      <link rel="canonical" href="https://caremantrahealth.com/web-stories/${story.id}" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
      <style amp-boilerplate>
        body { animation: -amp-start 8s steps(1,end) 0s 1 normal both; }
        @keyframes -amp-start { from { visibility: hidden; } to { visibility: visible; } }
      </style>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
      <title>${story.title}</title>
    </head>
    <body>
      <amp-story standalone title="${story.title}">
        ${story.slides
          .map(
            (slide) => `
          <amp-story-page>
            <amp-story-grid-layer template="fill">
              <amp-img src="${slide.image}" width="720" height="1280" layout="responsive"></amp-img>
            </amp-story-grid-layer>
            <amp-story-grid-layer template="thirds">
              <h2 class="title">${slide.text}</h2>
            </amp-story-grid-layer>
          </amp-story-page>
        `
          )
          .join("")}
      </amp-story>
    </body>
    </html>
  `;

  // Initialize AmpOptimizer
  const ampOptimizer = AmpOptimizer.create();
  const optimizedHtml = await ampOptimizer.transformHtml(ampHtml);

  return (
    <>
      <NextSeo title={story.title} description={`Read ${story.title}`} />
      <div dangerouslySetInnerHTML={{ __html: optimizedHtml }} />
    </>
  );
}
