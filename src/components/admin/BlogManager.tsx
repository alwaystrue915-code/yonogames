'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Search, FileText, Trash2, Save, Eye, Edit3, ArrowLeft } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { BlogPost } from '../../types';
import { useAdminAuth } from '../../context/AdminAuthContext';

const emptyPost: BlogPost = {
  id: '', title: '', slug: '', content: [], htmlContent: '',
  category: 'Guide', tags: [],
  authorName: '', authorImage: '', authorRole: '', authorBio: '',
  image: '', date: new Date().toISOString().split('T')[0], readTime: '',
  status: 'draft', featured: false,
  createdAt: '', updatedAt: '', views: 0, likes: 0, faqs: [], guide: ''
};

export const BlogManager: React.FC = () => {
  const { token } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'author' | 'seo' | 'faq'>('basic');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState('');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const summernoteLoaded = useRef(false);
  const [editorLoading, setEditorLoading] = useState(false);

  const destroyEditor = () => {
    try { if ((window as any).$?.summernote) (window as any).$(editorRef.current!).summernote('destroy'); } catch (e) { /* ignore */ }
    summernoteLoaded.current = false;
  };

  useEffect(() => {
    if (activeTab === 'content' && editorRef.current && editing) {
      if (summernoteLoaded.current) {
        (window as any).$(editorRef.current!).summernote('code', editing.htmlContent || '');
        return;
      }
      setEditorLoading(true);
      const loadSummernote = () => {
        setTimeout(() => {
          if (!editorRef.current || !(window as any).$?.summernote) return;
          (window as any).$(editorRef.current!).summernote({
            height: 400,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
              ['fontname', ['fontname']],
              ['fontsize', ['fontsize']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video', 'hr']],
              ['view', ['fullscreen', 'codeview', 'help']],
              ['height', ['height']]
            ],
            callbacks: {
              onChange: (html: string) => { setEditing(prev => prev ? { ...prev, htmlContent: html } : prev); },
              onImageUpload: (files: FileList | File[]) => {
                const file = files[0];
                if (!file) return;
                const fd = new FormData();
                fd.append('key', 'yonogames-v2');
                fd.append('image', file);
                fetch('https://app.nexapk.in/upload.php', { method: 'POST', body: fd })
                  .then(r => r.json())
                  .then(data => {
                    if (data.success) (window as any).$(editorRef.current!).summernote('insertImage', data.url);
                    else alert(data.error || 'Upload failed');
                  })
                  .catch(() => alert('Upload failed'));
              }
            }
          });
          (window as any).$(editorRef.current!).summernote('code', editing.htmlContent || '');
          summernoteLoaded.current = true;
          setEditorLoading(false);
        }, 100);
      };
      const loadJS = (src: string, cb: () => void) => {
        const s = document.createElement('script'); s.src = src; s.onload = () => cb(); document.head.appendChild(s);
      };
      if (!(window as any).$?.summernote) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.css';
        document.head.appendChild(link);
        if (!(window as any).$) {
          loadJS('https://code.jquery.com/jquery-3.7.1.min.js', () => {
            loadJS('https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.js', loadSummernote);
          });
        } else {
          loadJS('https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.js', loadSummernote);
        }
      } else {
        loadSummernote();
      }
    }
    if (activeTab !== 'content') destroyEditor();
    return () => { if (activeTab !== 'content') destroyEditor(); };
  }, [activeTab, editing?.id]);

  const fetchPosts = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch('/api/admin/blog', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setPosts(await res.json());
    } catch (e) { console.error(e); }
    setLoadingList(false);
  }, [token]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const genSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const startNew = () => {
    setEditing({ ...emptyPost, date: new Date().toISOString().split('T')[0] });
    setActiveTab('basic');
  };

  const startEdit = (post: BlogPost) => {
    setEditing({ ...post, htmlContent: post.htmlContent || post.content?.join('') || '' });
    setActiveTab('basic');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title?.trim()) { setActiveTab('basic'); setToast({ msg: 'Title is required', type: 'error' }); return; }
    setSaving(true);
    try {
      // Capture summernote content if on content tab
      let htmlContent = editing.htmlContent;
      if (activeTab === 'content') {
        try { if ((window as any).$?.summernote) { const code = (window as any).$(editorRef.current!).summernote('code'); if (typeof code === 'string') htmlContent = code; } } catch {}
      }
      if (!htmlContent || typeof htmlContent !== 'string') htmlContent = '';
      const isNew = !editing.id;
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${editing.id}`;
      const method = isNew ? 'POST' : 'PUT';
      const { _id, ...rest } = editing;
      const payload = { ...rest, htmlContent, slug: editing.slug || genSlug(editing.title) };
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) { const errData = await res.json().catch(() => ({})); setSaving(false); setToast({ msg: `Save failed: ${errData?.message || 'Check your data'}`, type: 'error' }); return; }
      setEditing(null);
      fetchPosts();
      setToast({ msg: isNew ? 'Post created successfully!' : 'Post updated successfully!', type: 'success' });
    } catch (err) { console.error(err); setToast({ msg: 'Something went wrong.', type: 'error' }); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      await fetch(`/api/admin/blog/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchPosts();
    } catch (e) { console.error(e); }
  };

  const filtered = posts.filter(p =>
    (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { key: 'basic' as const, label: 'Basic Info' },
    { key: 'content' as const, label: 'Content' },
    { key: 'faq' as const, label: 'FAQ' },
    { key: 'author' as const, label: 'Author' },
    { key: 'seo' as const, label: 'SEO & Meta' },
  ];

  // Toast auto-dismiss
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);

  // Full-page editor view
  if (editing) {
    return (
      <div className="space-y-6">
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-bold transition-all ${
            toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {toast.msg}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setEditing(null)}
              className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/[0.06] hover:bg-gray-100 transition-all cursor-pointer">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                {editing.id ? 'Edit Post' : 'New Post'}
              </h1>
              <p className="text-sm text-gray-400 font-medium mt-0.5">
                {editing.id ? 'Modify your blog post' : 'Create a new blog post'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold ${editing.status === 'published' ? 'bg-[#2C3EFE]/10 text-[#2C3EFE]' : 'bg-[#FF9F0A]/10 text-[#FF9F0A]'}`}>
              {editing.status}
            </span>
            {editing.featured && (
              <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#FF9F0A]/10 text-[#FF9F0A]">Featured</span>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] overflow-hidden">
          <div className="flex border-b border-black/[0.04]">
            {tabs.map(t => (
              <button key={t.key} type="button" onClick={() => setActiveTab(t.key)}
                className={`flex-1 px-5 py-3.5 text-sm font-bold transition-all cursor-pointer ${
                  activeTab === t.key
                    ? 'text-[#2C3EFE] border-b-2 border-[#2C3EFE] bg-[#2C3EFE]/5'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSave}>
            <div className="p-6 space-y-5">
              {activeTab === 'basic' && (
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Title</label>
                    <input className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                      placeholder="Enter post title" value={editing.title}
                      onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : genSlug(e.target.value) })} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Slug</label>
                      <div className="flex gap-2">
                        <input className="flex-1 px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                          placeholder="url-slug" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} />
                        <button type="button" onClick={() => setEditing({ ...editing, slug: genSlug(editing.title) })}
                          className="px-4 py-2 bg-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-200 cursor-pointer transition-all">Auto</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Category</label>
                      <select className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                        value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                        {['Guide', 'Strategy', 'Tips', 'News', 'Review'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Publish Date</label>
                      <input className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                        type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Read Time</label>
                      <input className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                        placeholder="e.g. 5 min read" value={editing.readTime} onChange={e => setEditing({ ...editing, readTime: e.target.value })} />
                    </div>
                  </div>
                  <ImageUpload label="Featured Image" currentUrl={editing.image} onSelect={url => setEditing({ ...editing, image: url })} />
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Tags</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {editing.tags.map((t, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-[#2C3EFE]/10 text-[#2C3EFE] rounded-full text-[11px] font-bold">
                          {t}
                          <button type="button" onClick={() => setEditing({ ...editing, tags: editing.tags.filter((_, j) => j !== i) })}
                            className="hover:text-red-500 cursor-pointer ml-0.5">&times;</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                        placeholder="Add tag and press Enter" id="tag-input"
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const inp = document.getElementById('tag-input') as HTMLInputElement; if (inp?.value.trim()) { setEditing({ ...editing, tags: [...editing.tags, inp.value.trim()] }); inp.value = ''; } } }} />
                      <button type="button" onClick={() => { const inp = document.getElementById('tag-input') as HTMLInputElement; if (inp?.value.trim()) { setEditing({ ...editing, tags: [...editing.tags, inp.value.trim()] }); inp.value = ''; } }}
                        className="px-4 py-2.5 bg-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-200 cursor-pointer transition-all">Add</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-12 h-7 rounded-full relative transition-colors ${editing.status === 'published' ? 'bg-[#2C3EFE]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${editing.status === 'published' ? 'left-[26px]' : 'left-1'}`} />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Published</span>
                      <input type="checkbox" className="sr-only" checked={editing.status === 'published'}
                        onChange={e => setEditing({ ...editing, status: e.target.checked ? 'published' : 'draft' })} />
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-12 h-7 rounded-full relative transition-colors ${editing.featured ? 'bg-[#FF9F0A]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${editing.featured ? 'left-[26px]' : 'left-1'}`} />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Featured</span>
                      <input type="checkbox" className="sr-only" checked={editing.featured}
                        onChange={e => setEditing({ ...editing, featured: e.target.checked })} />
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-3">Content</label>
                  {editorLoading && (
                    <div className="flex items-center gap-3 mb-3 px-4 py-3 bg-orange-50 border border-orange-200 rounded-2xl text-sm font-semibold text-orange-600">
                      <div className="w-4 h-4 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin" />
                      Loading editor...
                    </div>
                  )}
                  <textarea ref={editorRef} className="w-full" rows={16} placeholder="Write your post content here..."
                    defaultValue={editing.htmlContent || editing.content?.join('\n\n') || ''} />
                </div>
              )}

              {activeTab === 'faq' && (
                <div>
                  <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">FAQs (JSON format)</label>
                  <textarea className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C3EFE]/20 focus:border-[#2C3EFE]/40 transition-all resize-y font-mono"
                    rows={10} placeholder='[&#10;  { "question": "Is this safe?", "answer": "Yes, it is verified." },&#10;  { "question": "How to install?", "answer": "Download and open the APK." }&#10;]'
                    value={editing.faqs && editing.faqs.length > 0 ? JSON.stringify(editing.faqs, null, 2) : '[\n  { "question": "Example question?", "answer": "Example answer here." },\n  { "question": "Another question?", "answer": "Another answer here." }\n]'}
                    onChange={e => {
                      try { const parsed = JSON.parse(e.target.value); setEditing({ ...editing, faqs: parsed }); }
                      catch { setEditing({ ...editing, faqs: editing.faqs }); }
                    }} />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-gray-400 font-medium">JSON array of "question"/"answer" objects. Invalid JSON won't save.</p>
                    <button type="button" onClick={() => { navigator.clipboard.writeText(JSON.stringify(editing.faqs || [], null, 2)); alert('Copied!'); }}
                      className="px-3 py-1.5 bg-[#2C3EFE]/10 text-[#2C3EFE] rounded-xl text-[10px] font-bold hover:bg-[#2C3EFE]/20 transition-all cursor-pointer">Copy JSON</button>
                  </div>
                  {(editing.faqs || []).length > 0 && (
                    <div className="mt-4 p-4 bg-white border border-black/[0.06] rounded-2xl space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preview</p>
                      {editing.faqs!.map((faq, i) => (
                        <details key={i} className="group rounded-xl border border-slate-200 overflow-hidden bg-white">
                          <summary className="text-xs font-bold text-slate-700 px-3.5 py-2.5 cursor-pointer list-none flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                            <span>{faq.question}</span>
                            <span className="text-slate-400 text-xs font-extrabold shrink-0 group-open:rotate-45 transition-transform">+</span>
                          </summary>
                          <div className="px-3.5 pb-3 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2.5">{faq.answer}</div>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'author' && (
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Author Display Name</label>
                    <input className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                      placeholder="e.g. John Smith" value={editing.authorName || ''} onChange={e => setEditing({ ...editing, authorName: e.target.value })} />
                  </div>
                  <ImageUpload label="Author Image" currentUrl={editing.authorImage || ''} onSelect={url => setEditing({ ...editing, authorImage: url })} />
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Author Role</label>
                    <input className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                      placeholder="e.g. Signal Expert" value={editing.authorRole || ''} onChange={e => setEditing({ ...editing, authorRole: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Author Bio</label>
                    <textarea className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all resize-y"
                      rows={3} placeholder="Short bio about the author" value={editing.authorBio || ''} onChange={e => setEditing({ ...editing, authorBio: e.target.value })} />
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Meta Title</label>
                    <input className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                      placeholder="SEO title (defaults to post title)" value={editing.metaTitle || ''} onChange={e => setEditing({ ...editing, metaTitle: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Meta Keywords</label>
                    <input className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all"
                      placeholder="wingo, prediction, signals, strategy" value={editing.keywords || ''} onChange={e => setEditing({ ...editing, keywords: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wider block mb-1.5">Meta Description</label>
                    <textarea className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 focus:border-[#34C759]/40 transition-all resize-y"
                      rows={3} placeholder="SEO meta description" value={editing.metaDescription || ''} onChange={e => setEditing({ ...editing, metaDescription: e.target.value })} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-black/[0.04] flex items-center justify-between bg-gray-50/50">
              <button type="button" onClick={() => setEditing(null)}
                className="px-6 py-3 bg-white border border-black/[0.06] rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer">
                Cancel
              </button>
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#2C3EFE] text-white rounded-2xl text-sm font-bold hover:bg-[#2230d6] transition-all disabled:opacity-50 cursor-pointer shadow-sm">
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : editing.id ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-bold transition-all ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.msg}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Blog Posts</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">{posts.length} total posts</p>
        </div>
        <button onClick={startNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C3EFE] text-white rounded-2xl font-bold text-sm hover:bg-[#2230d6] transition-all shadow-sm cursor-pointer">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-[300px] pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C3EFE]/20 focus:border-[#2C3EFE]/40 transition-all" />
      </div>

      {loadingList ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-8 text-center">
          <div className="w-8 h-8 border-2 border-[#2C3EFE]/30 border-t-[#2C3EFE] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 font-medium mt-3">Loading posts...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-sm font-semibold text-gray-900">{search ? 'No posts match your search' : 'No posts yet'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <div key={post.id || post.slug} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-4 sm:p-5 hover:shadow-lg hover:shadow-black/5 transition-all">
              <div className="flex items-start gap-4">
                {post.image ? (
                  <img src={post.image} alt="" className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl object-cover border flex-shrink-0" onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
                ) : (
                  <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl bg-[#2C3EFE]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#2C3EFE]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">{post.title}</div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5">/{post.slug}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${post.status === 'published' ? 'bg-[#2C3EFE]/10 text-[#2C3EFE]' : 'bg-[#FF9F0A]/10 text-[#FF9F0A]'}`}>
                        {post.status}
                      </span>
                      {post.featured && (
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#FF9F0A]/10 text-[#FF9F0A]">Featured</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2.5">
                    <span className="text-[11px] font-semibold text-gray-500">{post.category}</span>
                    <span className="text-[11px] text-gray-400">{post.views?.toLocaleString()} views</span>
                    <span className="text-[11px] text-gray-400">
                      {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : post.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => startEdit(post)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#007AFF]/10 text-[#007AFF] rounded-xl text-[11px] font-bold hover:bg-[#007AFF]/20 transition-all cursor-pointer">
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => handleDelete(post.id || post.slug)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF3B30]/10 text-[#FF3B30] rounded-xl text-[11px] font-bold hover:bg-[#FF3B30]/20 transition-all cursor-pointer ml-auto">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
