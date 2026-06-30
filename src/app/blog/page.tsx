import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { BookOpen, Calendar, Clock, Eye, Search } from 'lucide-react';
import PublicShell from '../../components/PublicShell';
import BlogSearch from '../../components/BlogSearch';
import { BlogPost } from '../../types';

const siteUrl = 'https://yononewgamess.com';

export const metadata: Metadata = {
  title: 'Yono Games Blog - APK Guides, Rummy Tips, Bonus Updates & Safety',
  description: 'Read Yono Games blog guides about APK downloads, rummy app comparison, signup bonuses, withdrawal checks, safety tips, and India eligibility notes.',
  openGraph: {
    title: 'Yono Games Blog - APK Guides & Rummy App Tips',
    description: 'Practical guides, safety notes and comparison tips for Yono game APK users.',
    url: `${siteUrl}/blog`,
    siteName: 'Yono Games',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yono Games Blog - APK Guides & Bonus Tips',
    description: 'Read Yono app guides, rummy tips, bonus explanations and download safety notes.',
  },
  alternates: { canonical: `${siteUrl}/blog` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  keywords: [
    'Yono Games blog',
    'Yono app guide',
    'Yono APK download guide',
    'rummy app tips',
    'Yono bonus updates',
    'rummy APK safety',
    'skill games India',
    'teen patti guide',
  ],
};

const blogFaqs = [
  {
    question: 'What topics does the Yono Games blog cover?',
    answer: 'The blog covers Yono APK download guidance, rummy app comparison, signup bonus checks, withdrawal information, safety tips and responsible play notes.',
  },
  {
    question: 'Can blog posts help me choose a Yono app?',
    answer: 'Yes. Blog posts explain what users should compare before downloading, including app category, bonus terms, rating, minimum withdrawal, permissions and support options.',
  },
  {
    question: 'Does Yono Games operate the apps mentioned in blog posts?',
    answer: 'No. Yono Games is an independent information website. Third-party apps have their own owners, terms, payment systems and support teams.',
  },
];

const formatDate = (post: BlogPost) => post.date || post.createdAt || 'Updated';
const brandText = (value?: string) => (value || 'Yono Games').replace(/Yono Hub/g, 'Yono Games').replace(/YONO HUB/g, 'YONO GAMES');

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: { searchParams?: { q?: string } }) {
  const [posts, settings] = await Promise.all([
    db.blog.find({ status: 'published' }),
    db.settings.get(),
  ]);
  const domain = settings?.siteDomain || siteUrl;
  const publishedPosts = [...posts]
    .filter((post) => post.status === 'published')
    .sort((a, b) => {
      const aTime = new Date(a.updatedAt || a.date || a.createdAt || 0).getTime();
      const bTime = new Date(b.updatedAt || b.date || b.createdAt || 0).getTime();
      return bTime - aTime;
    });
  const searchQuery = searchParams?.q?.toLowerCase().trim();
  const filteredPosts = searchQuery
    ? publishedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.category?.toLowerCase().includes(searchQuery) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(searchQuery)) ||
        (post.content || []).join(' ').toLowerCase().includes(searchQuery)
      )
    : publishedPosts;
  const remainingPosts = filteredPosts;
  const categories = Array.from(new Set(publishedPosts.map((post) => post.category).filter(Boolean))).slice(0, 8);
  const popularTags = Array.from(new Set(publishedPosts.flatMap((post) => post.tags || []).filter(Boolean))).slice(0, 12);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${domain}/blog#blog`,
        name: 'Yono Games Blog',
        description: 'Yono Games blog guides for APK downloads, rummy app comparison, bonus checks and safe app research.',
        url: `${domain}/blog`,
        inLanguage: 'en-IN',
        blogPost: publishedPosts.slice(0, 20).map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${domain}/blog/${post.slug}`,
          datePublished: post.date || post.createdAt,
          dateModified: post.updatedAt || post.date || post.createdAt,
          author: { '@type': 'Person', name: brandText(post.authorName) },
          publisher: { '@type': 'Organization', name: 'Yono Games', url: domain },
          image: post.image,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${domain}/blog#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: domain },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${domain}/blog` },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${domain}/blog#itemlist`,
        name: 'Yono Games blog posts',
        numberOfItems: publishedPosts.length,
        itemListElement: publishedPosts.slice(0, 20).map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${domain}/blog/${post.slug}`,
          name: post.title,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${domain}/blog#faq`,
        mainEntity: blogFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, '\\u003c') }}
      />

      <div className="space-y-8 pb-12">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <Link href="/" className="text-slate-400 no-underline transition-colors hover:text-[#2C3EFE]">Home</Link>
          <span>/</span>
          <span className="text-slate-700">Blog</span>
        </nav>

        <section className="border-b border-slate-200 pb-7">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Yono Games learning center</span>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">Yono Games Blog</h1>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
                Read practical Yono APK guides, rummy app comparison tips, bonus explanations, withdrawal checks and safety notes before choosing any gaming app.
              </p>
            </div>
            <div className="flex divide-x divide-slate-200 border border-slate-200 bg-white rounded-lg overflow-hidden shadow-sm">
              {[
                { value: `${publishedPosts.length}+`, label: 'Guides', color: '#2C3EFE' },
                { value: categories.length || 'All', label: 'Topics', color: '#3FD08F' },
                { value: '18+', label: 'Users only', color: '#dc2626' },
              ].map(({ value, label, color }) => (
                <div key={label} className="flex flex-1 items-center gap-2 px-3 py-3">
                  <strong className="text-base font-black leading-none" style={{ color }}>{value}</strong>
                  <span className="text-[9px] font-black uppercase leading-tight" style={{ color: `${color}cc` }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <BlogSearch placeholder="Search blog posts by title, topic or keyword..." />
          </div>
        </section>

        {filteredPosts.length === 0 ? (
          <div className="border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
            <BookOpen size={28} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-black text-slate-700">{searchQuery ? 'No results found' : 'No posts yet'}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {searchQuery ? `No posts matching "${searchQuery}". Try a different keyword.` : 'New Yono Games guides will appear here soon.'}
            </p>
          </div>
        ) : (
          <>
            <section aria-labelledby="latest-blog-posts">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Latest updates{searchQuery ? ` (${filteredPosts.length} results for "${searchQuery}")` : ''}</span>
                  <h2 id="latest-blog-posts" className="mt-1 text-xl font-extrabold text-slate-950 sm:text-2xl">Yono APK Guides and Tips</h2>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {categories.length ? categories.map((category) => (
                    <span key={category} className="shrink-0 rounded-full border border-[#3FD08F]/30 bg-[#3FD08F]/10 px-3 py-2 text-[10px] font-black uppercase text-[#3FD08F]">{category}</span>
                  )) : (
                    <span className="rounded-full border border-[#3FD08F]/30 bg-[#3FD08F]/10 px-3 py-2 text-[10px] font-black uppercase text-[#3FD08F]">Guides</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <Link prefetch={true} key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white no-underline shadow-sm transition hover:shadow-md">
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      {post.image ? (
                        <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-300"><BookOpen size={30} /></div>
                      )}
                    </div>
                    <div className="flex flex-col p-3.5">
                      {post.category && <span className="mb-1.5 rounded bg-[#3FD08F]/10 px-2 py-0.5 text-[#3FD08F] text-[10px] font-extrabold self-start">{post.category}</span>}
                      <h3 className="line-clamp-2 text-sm font-extrabold leading-snug text-slate-900 group-hover:text-[#2C3EFE]">{post.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[10px] text-slate-400 font-bold">
                        <span className="inline-flex items-center gap-1"><Calendar size={11} />{formatDate(post)}</span>
                        <span className="text-slate-300">|</span>
                        <span className="inline-flex items-center gap-1"><Clock size={11} />{post.readTime || '5 min read'}</span>
                        <span className="text-slate-300">|</span>
                        <span className="inline-flex items-center gap-1"><Eye size={11} />{post.views || 0}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}



        {popularTags.length > 0 && (
          <section className="border-y border-slate-200 py-6" aria-labelledby="blog-topics">
            <h2 id="blog-topics" className="text-lg font-extrabold text-slate-950">Popular Blog Topics</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#2C3EFE] px-3 py-2 text-[10px] font-black text-white">{tag}</span>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-slate-200 pt-7" aria-labelledby="blog-faq">
          <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Quick answers</span>
          <h2 id="blog-faq" className="mt-1 text-xl font-extrabold text-slate-950">Yono Games Blog FAQ</h2>
          <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
            {blogFaqs.map((faq) => (
              <div key={faq.question} className="py-4">
                <h3 className="text-sm font-extrabold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
