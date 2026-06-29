'use client';



export default function BlogContent({ htmlContent, content }: { htmlContent?: string; content?: string[] }) {
  if (!htmlContent) {
    return (
      <div className="mb-8 space-y-4">
        {content?.map((block, i) => (
          <p key={i} className="text-sm text-slate-600 leading-relaxed font-medium">{block}</p>
        ))}
      </div>
    );
  }

  let headingIndex = 0;
  let tocEntries: { id: string; text: string }[] = [];
  const processed = htmlContent.replace(/<h([23])(\s[^>]*)?>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    const clean = text.replace(/<[^>]*>/g, '').trim();
    const id = 'heading-' + headingIndex++;
    if (level === '2') tocEntries.push({ id, text: clean });
    return `<h${level}${attrs || ''} id="${id}">${text}</h${level}>`;
  });

  return (
    <div className="mb-8">
      {tocEntries.length > 0 && (
        <details open className="group mb-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
          <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer list-none text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition-colors">
            <span className="text-base shrink-0 group-open:rotate-45 transition-transform">+</span>
            Table of Contents
          </summary>
          <div className="border-t border-slate-100 px-4 py-3 space-y-2">
            {tocEntries.map((entry) => (
              <a key={entry.id} href={`#${entry.id}`}
                className="flex items-center gap-2.5 text-xs font-bold no-underline text-slate-700 hover:text-[#2C3EFE] transition-colors"
                onClick={(e) => { e.preventDefault(); document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' }); }}
              ><span className="w-1.5 h-1.5 rounded-full bg-[#2C3EFE] shrink-0" />{entry.text}</a>
            ))}
          </div>
        </details>
      )}
      <div className="blog-content text-sm text-slate-600 leading-relaxed space-y-4 [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-slate-800 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-extrabold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-sm [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_li]:text-sm [&_li]:text-slate-600 [&_li]:font-medium [&_li]:list-disc [&_li]:ml-5 [&_ol]:space-y-1.5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:text-slate-800 [&_strong]:font-extrabold [&_a]:text-[#2C3EFE] [&_a]:font-bold [&_a]:underline [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200 [&_img]:my-4 [&_img]:max-w-full [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4 [&_table]:text-sm [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:px-3 [&_th]:py-2 [&_th]:font-extrabold [&_th]:text-slate-700 [&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-slate-600 [&_tr]:even:bg-slate-50 [&_blockquote]:border-l-4 [&_blockquote]:border-[#2C3EFE] [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:text-slate-500 [&_blockquote]:italic [&_blockquote]:my-4 [&_pre]:bg-slate-900 [&_pre]:text-slate-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:my-4 [&_code]:bg-slate-100 [&_code]:text-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0 [&_hr]:border-slate-200 [&_hr]:my-6" dangerouslySetInnerHTML={{ __html: processed }} />
    </div>
  );
}
