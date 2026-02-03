#!/usr/bin/env node

/**
 * Blog Migration Script
 * Fetches posts from ars-veritatis.blogspot.com and creates markdown files
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Post definitions with collection assignments
const posts = {
  poetry: [
    { slug: 'bereft-of-me', url: 'https://ars-veritatis.blogspot.com/2017/06/bereft-of-me.html', date: '2017-06-22' },
    { slug: 'kingfishers-wings', url: 'https://ars-veritatis.blogspot.com/2012/02/kingfishers-wings.html', date: '2012-02-15' },
    { slug: 'step-outside', url: 'https://ars-veritatis.blogspot.com/2012/02/step-outside.html', date: '2012-02-16' },
    { slug: 'cyclone', url: 'https://ars-veritatis.blogspot.com/2012/02/cyclone.html', date: '2012-02-15' },
    { slug: 'to-run-in-darkness', url: 'https://ars-veritatis.blogspot.com/2013/11/to-run-in-darkness-is-to-touch-night.html', date: '2013-11-01' },
    { slug: 'embrace-of-iron', url: 'https://ars-veritatis.blogspot.com/2012/04/embrace-of-iron.html', date: '2012-04-25' },
    { slug: 'this-piece-of-life', url: 'https://ars-veritatis.blogspot.com/2014/03/this-piece-of-life.html', date: '2014-03-25' },
    { slug: 'dancer-dancer', url: 'https://ars-veritatis.blogspot.com/2012/02/dancer-dancer.html', date: '2012-02-15' },
    { slug: 'la-observatory', url: 'https://ars-veritatis.blogspot.com/2012/02/la-observatory.html', date: '2012-02-15' },
    { slug: 'faces-of-my-colleagues', url: 'https://ars-veritatis.blogspot.com/2020/04/to-last-breath.html', date: '2020-04-03' },
    { slug: 'every-final-goodbye', url: 'https://ars-veritatis.blogspot.com/2012/02/every-final-goodbye-is-killing.html', date: '2012-02-15' },
    { slug: 'the-rise', url: 'https://ars-veritatis.blogspot.com/2014/01/the-rise.html', date: '2014-01-26' },
    { slug: 'stationary-glide', url: 'https://ars-veritatis.blogspot.com/2012/07/stationary-glide.html', date: '2012-07-27' },
    { slug: 'yoga-practice', url: 'https://ars-veritatis.blogspot.com/2012/02/yoga-practice.html', date: '2012-02-15' },
    { slug: 'whirr-of-wings', url: 'https://ars-veritatis.blogspot.com/2013/02/whirr-of-wings.html', date: '2013-02-12' },
    { slug: 'west-coast-vibe', url: 'https://ars-veritatis.blogspot.com/2012/12/west-coast-vibe.html', date: '2012-12-02' },
    { slug: 'i-am-point-mass', url: 'https://ars-veritatis.blogspot.com/2012/06/i-am-point-mass.html', date: '2012-06-02' },
    { slug: 'and-let-me-be', url: 'https://ars-veritatis.blogspot.com/2012/01/and-let-me-be.html', date: '2012-01-21' },
    { slug: 'i-see-you', url: 'https://ars-veritatis.blogspot.com/2013/03/i-see-you.html', date: '2013-03-02' },
  ],
  blog: [
    { slug: 'surreal-encounter', url: 'https://ars-veritatis.blogspot.com/2010/07/surreal-encounter-over-real-food.html', date: '2010-07-24' },
    { slug: 'athletic-rebirth', url: 'https://ars-veritatis.blogspot.com/2013/09/an-athletic-rebirth.html', date: '2013-09-06' },
    { slug: 'on-being-50', url: 'https://ars-veritatis.blogspot.com/2020/04/on-being-50-almost-dying-and-what-it.html', date: '2020-04-17' },
    { slug: 'walled-gardens', url: 'https://ars-veritatis.blogspot.com/2012/06/walled-gardens_09.html', date: '2012-06-09' },
    { slug: 'eyes-on-wire', url: 'https://ars-veritatis.blogspot.com/2012/06/eyes-on-wire.html', date: '2012-06-21' },
    { slug: 'intimate-embrace-of-failure', url: 'https://ars-veritatis.blogspot.com/2014/06/the-intimate-embrace-of-failure.html', date: '2014-06-13' },
    { slug: 'tink', url: 'https://ars-veritatis.blogspot.com/2011/04/tink.html', date: '2011-04-02' },
    { slug: 'all-raf', url: 'https://ars-veritatis.blogspot.com/2011/02/all-raf.html', date: '2011-02-02' },
    { slug: 'riding-bus-rose-king', url: 'https://ars-veritatis.blogspot.com/2012/02/riding-bus-with-rose-king.html', date: '2012-02-18' },
  ],
  'ars-veritatis': [
    { slug: 'federal-agents-intent', url: 'https://ars-veritatis.blogspot.com/2026/01/federal-agents-intent-and-willingness.html', date: '2026-01-12' },
    { slug: 'through-glass-darkly', url: 'https://ars-veritatis.blogspot.com/2025/12/through-glass-darkly.html', date: '2025-12-22' },
    { slug: 'trying-and-failing-to-talk', url: 'https://ars-veritatis.blogspot.com/2025/10/trying-and-failing-to-talk-lessons.html', date: '2025-10-28' },
    { slug: 'critique-ben-shapiro', url: 'https://ars-veritatis.blogspot.com/2025/09/a-critique-of-ben-shapiros-vision-lions.html', date: '2025-09-29' },
    { slug: 'when-masculinity-gets-fragile', url: 'https://ars-veritatis.blogspot.com/2025/09/when-masculinity-gets-fragile-real-time.html', date: '2025-09-27' },
    { slug: 'we-need-to-talk', url: 'https://ars-veritatis.blogspot.com/2025/09/we-have-to-talk.html', date: '2025-09-21' },
    { slug: 'moment-of-truth', url: 'https://ars-veritatis.blogspot.com/2025/09/moment-of-truth.html', date: '2025-09-08' },
    { slug: 'american-evil-part-two', url: 'https://ars-veritatis.blogspot.com/2025/03/american-evil-part-two.html', date: '2025-03-16' },
    { slug: 'american-evil', url: 'https://ars-veritatis.blogspot.com/2017/01/american-evil.html', date: '2017-01-28' },
    { slug: 'dont-be-troll-be-wizard', url: 'https://ars-veritatis.blogspot.com/2017/05/dont-be-troll-be-wizard.html', date: '2017-05-19' },
    { slug: 'greatest-trick-devil', url: 'https://ars-veritatis.blogspot.com/2015/12/the-greatest-trick-devil-ever-pulled.html', date: '2015-12-21' },
    { slug: 'on-fighting', url: 'https://ars-veritatis.blogspot.com/2015/12/on-fighting_7.html', date: '2015-12-07' },
    { slug: 'barbarism-of-fear', url: 'https://ars-veritatis.blogspot.com/2013/01/the-barbarism-of-fear.html', date: '2013-01-08' },
    { slug: 'harry-potter-heroism', url: 'https://ars-veritatis.blogspot.com/2013/01/the-harry-potter-school-of-heroism.html', date: '2013-01-20' },
    { slug: 'my-feelings-for-truth', url: 'https://ars-veritatis.blogspot.com/2011/12/my-feelings-for-truth.html', date: '2011-12-10' },
    { slug: 'what-is-life-worth', url: 'https://ars-veritatis.blogspot.com/2012/02/what-is-life-worth.html', date: '2012-02-04' },
    { slug: 'fundamental-virtues', url: 'https://ars-veritatis.blogspot.com/2012/05/fundamental-virtues.html', date: '2012-05-02' },
    { slug: 'love-sex-toys-gucci', url: 'https://ars-veritatis.blogspot.com/2012/05/love-sex-toys-and-gucci-couture.html', date: '2012-05-20' },
  ]
};

// Fetch HTML from URL
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract post content from Blogger HTML
function extractContent(html) {
  // Extract title
  const titleMatch = html.match(/<h3 class='post-title[^>]*>([^<]+)<\/h3>/i)
    || html.match(/<title>([^<|]+)/i);
  const title = titleMatch ? titleMatch[1].trim().replace(/&amp;/g, '&').replace(/&#39;/g, "'") : 'Untitled';

  // Extract post body - look for the post-body div
  const bodyMatch = html.match(/<div class='post-body[^>]*>([\s\S]*?)<\/div>\s*<div class='post-footer/i)
    || html.match(/<div class="post-body[^>]*>([\s\S]*?)<\/div>\s*<div class="post-footer/i);

  let content = bodyMatch ? bodyMatch[1] : '';

  // Extract labels/tags
  const labels = [];
  const labelMatches = html.matchAll(/rel='tag'>([^<]+)<\/a>/gi);
  for (const match of labelMatches) {
    labels.push(match[1].trim());
  }

  // Convert HTML to markdown
  content = htmlToMarkdown(content);

  return { title, content, labels };
}

// Simple HTML to Markdown converter
function htmlToMarkdown(html) {
  let md = html;

  // Remove script and style tags
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Convert line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Convert paragraphs
  md = md.replace(/<p[^>]*>/gi, '\n\n');
  md = md.replace(/<\/p>/gi, '');

  // Convert divs to newlines
  md = md.replace(/<div[^>]*>/gi, '\n');
  md = md.replace(/<\/div>/gi, '');

  // Convert headers
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');

  // Convert emphasis
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

  // Convert links
  md = md.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Convert blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, p1) => {
    return '\n> ' + p1.trim().replace(/\n/g, '\n> ') + '\n';
  });

  // Convert lists
  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&mdash;/g, '—');
  md = md.replace(/&ndash;/g, '–');
  md = md.replace(/&hellip;/g, '...');

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();

  return md;
}

// Generate frontmatter
function generateFrontmatter(title, date, labels, collection) {
  const tagsStr = labels.length > 0
    ? `tags: [${labels.map(l => `"${l}"`).join(', ')}]`
    : 'tags: []';

  if (collection === 'poetry') {
    return `---
title: "${title.replace(/"/g, '\\"')}"
pubDate: ${date}
${tagsStr}
---`;
  } else {
    return `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
pubDate: ${date}
${tagsStr}
draft: false
---`;
  }
}

// Process a single post
async function processPost(post, collection) {
  console.log(`  Fetching: ${post.slug}`);

  try {
    const html = await fetchUrl(post.url);
    const { title, content, labels } = extractContent(html);

    const frontmatter = generateFrontmatter(title, post.date, labels, collection);
    const markdown = `${frontmatter}\n\n${content}\n`;

    const outputDir = path.join(__dirname, '..', 'src', 'content', collection);
    const outputPath = path.join(outputDir, `${post.slug}.md`);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, markdown);
    console.log(`  ✓ Created: ${outputPath}`);

    return true;
  } catch (err) {
    console.error(`  ✗ Error processing ${post.slug}: ${err.message}`);
    return false;
  }
}

// Main function
async function main() {
  console.log('Blog Migration Script');
  console.log('=====================\n');

  let total = 0;
  let success = 0;

  for (const [collection, postList] of Object.entries(posts)) {
    console.log(`\nProcessing ${collection} (${postList.length} posts)...`);

    for (const post of postList) {
      total++;
      // Add delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
      if (await processPost(post, collection)) {
        success++;
      }
    }
  }

  console.log(`\n=====================`);
  console.log(`Done! ${success}/${total} posts migrated successfully.`);
}

main().catch(console.error);
