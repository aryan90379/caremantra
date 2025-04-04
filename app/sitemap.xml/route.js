import { fetchArticles } from "@/actions/useractions"; // Import from useractions.js

export async function GET() {
  const currentTime = new Date();

  const baseUrl = process.env.baseUrl; // Replace with your actual domain
  const articles = await fetchArticles(); // Get articles from DB

  // console.log("Sitemap API Hit")
  const urls = articles.filter((article) => {
    const publishedAt = new Date(article.publishedAt);
    return (
      article.status === "published" && publishedAt < currentTime
    );
  })
  .sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  )
    .map(
      (article) => `
    <url>
      <loc>${baseUrl}/blogs/${article.slug}</loc>
      <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${urls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}


export const dynamic = "force-dynamic";