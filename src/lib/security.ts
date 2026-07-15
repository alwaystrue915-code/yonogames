import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

export const SITE_URL = 'https://yonogamelive.app';
export const slugSchema = z.string().trim().min(1).max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug');

const shortText = z.string().trim().max(300);
const url = z.string().trim().url().max(2048);
const imageUrl = z.string().trim().max(2048).refine(
  (value) => value.startsWith('/') || /^https:\/\//i.test(value),
  'Image must use HTTPS or a local path'
);

export function sanitizeArticle(value: string) {
  return sanitizeHtml(value, {
    allowedTags: [
      'p', 'br', 'h1', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u',
      'ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th',
      'td', 'a', 'img', 'code', 'pre', 'hr', 'span', 'div'
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      '*': ['class'],
    },
    allowedSchemes: ['https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow' }, true),
    },
  });
}

export const appInputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  slug: slugSchema,
  logo: imageUrl,
  banner: imageUrl.optional().or(z.literal('')),
  screenshots: z.array(imageUrl).max(20).optional(),
  description: z.string().max(100_000).transform(sanitizeArticle),
  category: shortText,
  tags: z.array(shortText).max(50),
  features: z.array(shortText).max(50),
  rating: z.coerce.number().min(0).max(5),
  installs: shortText,
  bonus: shortText,
  minWithdrawal: shortText,
  downloadUrl: url.refine((value) => value.startsWith('https://'), 'Download URL must use HTTPS'),
  status: z.enum(['active', 'inactive']),
  featured: z.boolean(),
  priority: z.coerce.number().int().min(-10000).max(10000),
  seoTitle: z.string().trim().max(160),
  seoDescription: z.string().trim().max(320),
  keywords: z.string().trim().max(1000).optional(),
  faqs: z.array(z.object({ question: shortText, answer: z.string().trim().max(2000) })).max(50),
  categories: z.array(shortText).max(50).optional(),
  isRecommended: z.boolean().optional(),
  isNewPick: z.boolean().optional(),
  isAllApps: z.boolean().optional(),
}).strict();

export const blogInputSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: slugSchema,
  content: z.array(z.string().max(10_000)).max(200).default([]),
  htmlContent: z.string().max(200_000).transform(sanitizeArticle).optional(),
  category: shortText,
  tags: z.array(shortText).max(50),
  authorName: shortText.optional(),
  authorImage: imageUrl.optional().or(z.literal('')),
  authorRole: shortText.optional(),
  authorBio: z.string().trim().max(2000).optional(),
  image: imageUrl,
  date: z.string().trim().max(50),
  readTime: shortText,
  status: z.enum(['published', 'draft']),
  featured: z.boolean(),
  metaTitle: z.string().trim().max(160).optional(),
  metaDescription: z.string().trim().max(320).optional(),
  keywords: z.string().trim().max(1000).optional(),
  faqs: z.array(z.object({ question: shortText, answer: z.string().trim().max(2000) })).max(50).optional(),
  guide: z.string().max(20_000).optional(),
  views: z.coerce.number().int().min(0).optional(),
  likes: z.coerce.number().int().min(0).optional(),
}).strict();



export const settingsInputSchema = z.object({
  siteName: z.string().trim().max(100).optional(),
  siteTitle: z.string().trim().max(160).optional(),
  siteDescription: z.string().trim().max(320).optional(),
  footerText: z.string().trim().max(1000).optional(),
  featuredAppsLimit: z.coerce.number().int().min(1).max(100).optional(),
  footerAdImage: imageUrl.optional().or(z.literal('')),
  footerAdLink: url.optional().or(z.literal('')),
  footerAdActive: z.boolean().optional(),
  backgroundType: z.string().trim().max(50).optional(),
  cardStyle: z.string().trim().max(50).optional(),
  banner1: imageUrl.optional().or(z.literal('')),
  banner2: imageUrl.optional().or(z.literal('')),
  banner3: imageUrl.optional().or(z.literal('')),
  banner4: imageUrl.optional().or(z.literal('')),
  footerAdLogo: imageUrl.optional().or(z.literal('')),
  footerAdName: shortText.optional(),
  footerAdDesc: z.string().trim().max(1000).optional(),
  headerLogo: imageUrl.optional().or(z.literal('')),
  headerTitle: shortText.optional(),
  headerSubtitle: shortText.optional(),
  telegramLink: url.optional().or(z.literal('')),
  userRating: z.coerce.number().min(0).max(5).optional(),
  ratingCount: z.coerce.number().int().min(0).max(100000000).optional(),
  telegramSubscribers: shortText.optional(),
  verifiedApps: shortText.optional(),
  dailyPayouts: shortText.optional(),
}).strict();

export function escapeXml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function cdata(value: unknown) {
  return String(value ?? '').replace(/]]>/g, ']]]]><![CDATA[>');
}
export function isSafePublicHttpsUrl(value: string) {
  try {
    const target = new URL(value);
    if (target.protocol !== 'https:' || target.username || target.password) return false;
    const host = target.hostname.toLowerCase();
    if (host === 'localhost' || host === '0.0.0.0' || host === '::1' || host.endsWith('.local')) return false;
    if (/^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host)) return false;
    const private172 = host.match(/^172\.(\d+)\./);
    if (private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31) return false;
    return true;
  } catch {
    return false;
  }
}
export function safeError(message = 'Request failed.') {
  return { message };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
