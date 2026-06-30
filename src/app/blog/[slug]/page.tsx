import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Calendar, Clock, Eye, Tag, User } from 'lucide-react';
import PublicShell from '../../../components/PublicShell';
import BlogContent from '../../../components/BlogContent';

const siteUrl = 'https://yononewgamess.com';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await db.blog.find({ status: 'published', featured: undefined });
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await db.blog.findBySlug(params.slug);
  if (!post) return {};
  const domain = siteUrl;
  return {
    title: post.metaTitle || `${post.title} - Yono Games Blog`,
    description: post.metaDescription || post.htmlContent?.substring(0, 160) || '',
    keywords: post.keywords || post.tags?.join(', ') || '',
    openGraph: {
      title: post.metaTitle || `${post.title} - Yono Games Blog`,
      description: post.metaDescription || post.htmlContent?.substring(0, 160) || '',
      url: `${domain}/blog/${post.slug}`,
      siteName: 'Yono Games',
      type: 'article',
      locale: 'en_IN',
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.authorName || 'Yono Games'],
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || `${post.title} - Yono Games Blog`,
      description: post.metaDescription || post.htmlContent?.substring(0, 160) || '',
      images: post.image ? [post.image] : [],
    },
    alternates: { canonical: `${domain}/blog/${post.slug}` },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const post = await db.blog.findBySlug(params.slug);
  if (!post || post.status !== 'published') notFound();

  await db.blog.incrementViews(params.slug);

  const settings = await db.settings.get();
  const allPosts = await db.blog.find({ status: 'published' });
  const similarPosts = allPosts
    .filter(p => p.slug !== post.slug && (p.category === post.category || (post.tags || []).some(t => (p.tags || []).includes(t))))
    .slice(0, 4);
  const domain = settings?.siteDomain || siteUrl;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.htmlContent?.substring(0, 160) || '',
    url: `${domain}/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${domain}/blog/${post.slug}` },
    datePublished: post.date || post.createdAt,
    dateModified: post.updatedAt || post.date,
    author: { '@type': 'Person', name: post.authorName || 'Yono Games' },
    publisher: { '@type': 'Organization', name: 'Yono Games', url: domain },
    image: post.image,
    articleSection: post.category || 'General',
    keywords: post.keywords || post.tags?.join(', ') || '',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: domain },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${domain}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${domain}/blog/${post.slug}` },
    ],
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <style>{`
        details[open] summary + div {
          max-height: 600px;
          opacity: 1;
          transition: max-height 0.35s ease, opacity 0.35s ease;
        }
        details summary + div {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.35s ease;
        }
      `}</style>
      <div>
        <article className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#2C3EFE] transition-colors no-underline text-slate-400">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#2C3EFE] transition-colors no-underline text-slate-400">Blog</Link>
            <span>/</span>
            <span className="text-slate-600 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {post.image && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-sm">
              <img src={post.image} alt={post.title} fetchPriority="high" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold mb-3 flex-wrap">
            {post.category && (
              <span className="px-2.5 py-1 rounded-lg bg-[#2C3EFE]/10 text-[#2C3EFE] text-[10px] font-black uppercase tracking-wider">{post.category}</span>
            )}
            {post.date && <span className="flex items-center gap-1 text-[#3FD08F]"><Calendar size={12} />{post.date}</span>}
            {post.readTime && <span className="flex items-center gap-1 text-[#3FD08F]"><Clock size={12} />{post.readTime}</span>}
            <span className="flex items-center gap-1 text-[#2C3EFE]"><Eye size={12} />{post.views} views</span>
          </div>

          <h1 className="text-xl md:text-3xl font-extrabold text-slate-800 tracking-tight mb-6 leading-tight">{post.title}</h1>

          {post.authorName && (
            <div className="flex items-center gap-3 mb-6">
              {post.authorImage ? (
                <img src={post.authorImage} alt={post.authorName} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#2C3EFE]/10 flex items-center justify-center"><User size={16} className="text-[#2C3EFE]" /></div>
              )}
              <div>
                <div className="text-sm font-extrabold text-slate-800">{post.authorName}</div>
                {post.authorRole && <div className="text-[10px] font-bold text-slate-400">{post.authorRole}</div>}
              </div>
            </div>
          )}

          {post.guide && (() => {
            try {
              const steps = JSON.parse(post.guide);
              if (!Array.isArray(steps) || steps.length === 0) return null;
              return (
                <div className="mb-8 space-y-0">
                  <h2 className="text-sm font-extrabold text-slate-800 mb-3">Quick Guide</h2>
                  <div className="flex flex-wrap gap-3">
                    {steps.map((step: any, i: number) => (
                      <details key={i} className="group flex-1 min-w-[200px] rounded-xl border border-slate-200 bg-white overflow-hidden">
                        <summary className="flex items-center gap-2.5 px-3.5 py-3 cursor-pointer list-none hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2C3EFE] text-white text-[10px] font-black shrink-0">{i + 1}</span>
                          <span className="line-clamp-1">{step.step || step.title || `Step ${i + 1}`}</span>
                          <span className="ml-auto text-slate-400 text-sm shrink-0 group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <div className="px-3.5 pb-3.5 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                          {step.detail || step.description || ''}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            } catch { return null; }
          })()}

          <BlogContent htmlContent={post.htmlContent} content={post.content} />

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-lg bg-[#3FD08F]/10 text-[#3FD08F] font-extrabold"><Tag size={12} />{tag}</span>
              ))}
            </div>
          )}

          {similarPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-extrabold text-slate-800 mb-4">Similar Blogs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {similarPosts.map((p) => (
                  <Link prefetch={true} key={p.slug} href={`/blog/${p.slug}`} className="group flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white no-underline transition hover:border-slate-300">
                    {p.image && (
                      <div className="w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                        <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-xs font-extrabold text-slate-900 line-clamp-2 group-hover:text-[#2C3EFE] transition-colors">{p.title}</h3>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 block">{p.date || ''}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {post.faqs && post.faqs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-extrabold text-slate-800 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {post.faqs.map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-slate-200 overflow-hidden bg-white">
                    <summary className="text-xs font-bold text-slate-700 px-4 py-3.5 cursor-pointer list-none flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                      <span>{faq.question}</span>
                      <span className="text-slate-400 text-sm font-extrabold shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed font-medium border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

        </article>
      </div>
    </PublicShell>
  );
}
