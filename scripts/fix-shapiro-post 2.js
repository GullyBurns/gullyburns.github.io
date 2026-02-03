import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POST = {
  slug: 'critique-ben-shapiro',
  url: 'https://ars-veritatis.blogspot.com/2025/09/a-critique-of-ben-shapios-vision-lions.html',
  date: '2025-09-29'
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function htmlToMarkdown(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, (m, text) => `## ${text}\n\n`)
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (m, text) => `> ${text.trim()}\n\n`)
    .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<\/?ul>/gi, '\n')
    .replace(/<\/?ol>/gi, '\n')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '\n')
    .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '...')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractContent(html) {
  // Extract title
  const titleMatch = html.match(/<h3[^>]*class='post-title[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i) ||
                     html.match(/<title>([^<]+)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : 'Untitled';
  title = title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  
  // Extract post body
  const bodyMatch = html.match(/<div[^>]*class='post-body[^']*'[^>]*>([\s\S]*?)<\/div>\s*<div/i) ||
                    html.match(/<div[^>]*class="post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div/i);
  let body = bodyMatch ? bodyMatch[1] : '';
  
  // Extract labels
  const labelsMatch = html.match(/<span[^>]*class='post-labels'[^>]*>([\s\S]*?)<\/span>/i);
  let labels = [];
  if (labelsMatch) {
    const labelLinks = labelsMatch[1].match(/<a[^>]*>([^<]+)<\/a>/gi) || [];
    labels = labelLinks.map(l => l.replace(/<[^>]+>/g, '').trim());
  }
  
  return { title, body: htmlToMarkdown(body), labels };
}

async function main() {
  console.log(`Fetching: ${POST.url}`);
  
  try {
    const html = await fetchUrl(POST.url);
    const { title, body, labels } = extractContent(html);
    
    // Generate description
    const firstPara = body.split('\n\n')[0] || '';
    const description = firstPara.substring(0, 200).replace(/\n/g, ' ').trim() + (firstPara.length > 200 ? '...' : '');
    
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
pubDate: ${POST.date}
tags: ${JSON.stringify(labels)}
draft: false
---

${body}
`;
    
    const filePath = path.join(__dirname, '..', 'src', 'content', 'ars-veritatis', `${POST.slug}.md`);
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Written: ${filePath}`);
    console.log(`Title: ${title}`);
    console.log(`Labels: ${labels.join(', ') || 'none'}`);
    console.log(`Body length: ${body.length} chars`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

main();
