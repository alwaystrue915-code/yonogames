'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, ShieldAlert, X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import ScreenshotsUpload from './ScreenshotsUpload';
import { AppDetail } from '../../types';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AppFormProps {
  initialData?: AppDetail;
}

const defaultForm: AppDetail = {
  name: '', slug: '', logo: '', description: '',
  category: 'Rummy', categories: ['Rummy'], tags: ['Real Cash'], features: [],
  rating: 4.5, installs: '100K+', bonus: 'Rs.51', minWithdrawal: '₹100',
  downloadUrl: 'https://www.rummyskill.com', status: 'active', featured: false,
  priority: 0, seoTitle: '', seoDescription: '', faqs: [],
  isRecommended: false, isNewPick: false, isAllApps: true,
  screenshots: []
};

export const AppForm: React.FC<AppFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { token } = useAdminAuth();
  const isNew = !initialData;
  const [form, setForm] = useState<AppDetail>(initialData || { ...defaultForm });
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {});
  }, []);

  const genSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleCategoryToggle = (cat: string) => {
    const current = form.categories && form.categories.length > 0 ? form.categories : [form.category || 'Rummy'];
    const updated = current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat];
    setForm({ ...form, categories: updated, category: updated[0] || 'Rummy' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) { setError('Name and slug are required.'); return; }
    setSaving(true);
    try {
      const url = isNew ? '/api/apps' : `/api/apps/${initialData!.slug}`;
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        router.push('/admin/apps');
      } else {
        const err = await res.json();
        setError(err.message || 'Failed to save.');
      }
    } catch { setError('Network error.'); }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/admin/apps')}
          className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/[0.06] hover:bg-gray-100 transition-all cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{isNew ? 'New App' : 'Edit App'}</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">{isNew ? 'Add a new app listing' : `Editing: ${initialData?.name}`}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-6 space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <ShieldAlert size={14} /> <span className="font-semibold">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Name</label>
            <input type="text" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value, slug: isNew ? genSlug(e.target.value) : form.slug })}
              className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Slug</label>
            <div className="flex gap-2">
              <input type="text" value={form.slug} disabled={!isNew}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                className="flex-1 px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20 disabled:opacity-50" />
              <button type="button" onClick={() => setForm({ ...form, slug: genSlug(form.name) })}
                className="px-4 py-2 bg-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-200 cursor-pointer">Auto</button>
            </div>
          </div>
          <ImageUpload label="Logo" currentUrl={form.logo} onSelect={url => setForm({ ...form, logo: url })} />
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Download URL</label>
            <input type="text" value={form.downloadUrl} onChange={e => setForm({ ...form, downloadUrl: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Bonus</label>
            <input type="text" value={form.bonus} onChange={e => setForm({ ...form, bonus: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Min Withdrawal</label>
            <input type="text" value={form.minWithdrawal} onChange={e => setForm({ ...form, minWithdrawal: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Priority</label>
            <input type="number" value={form.priority} onChange={e => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Categories</label>
          <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-gray-50/80 border border-black/[0.06]">
            {(categories.length > 0 ? categories : [{ name: 'Rummy', slug: 'rummy' }, { name: 'Teen Patti', slug: 'teen-patti' }, { name: 'Slots', slug: 'slots' }, { name: 'Casinos', slug: 'casinos' }]).map(c => {
              const checked = (form.categories || [form.category]).includes(c.name);
              return (
                <label key={c.slug} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 cursor-pointer select-none">
                  <input type="checkbox" checked={checked} onChange={() => handleCategoryToggle(c.name)} className="w-4 h-4 accent-[#34C759] rounded" />
                  {c.name}
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Description</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
            className="w-full px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
        </div>

        {/* Screenshots Section */}
        <ScreenshotsUpload
          screenshots={form.screenshots || []}
          onChange={screenshots => setForm({ ...form, screenshots })}
        />

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {form.tags.map(t => (
              <span key={t} className="inline-flex items-center gap-1 px-3 py-1 bg-[#2C3EFE]/10 text-[#2C3EFE] rounded-full text-[11px] font-bold">
                {t}
                <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter(x => x !== t) })} className="hover:text-red-500 cursor-pointer">&times;</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Add tag..." value={tagsInput} onChange={e => setTagsInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (tagsInput.trim() && !form.tags.includes(tagsInput.trim())) { setForm({ ...form, tags: [...form.tags, tagsInput.trim()] }); setTagsInput(''); } } }}
              className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
            <button type="button" onClick={() => { if (tagsInput.trim() && !form.tags.includes(tagsInput.trim())) { setForm({ ...form, tags: [...form.tags, tagsInput.trim()] }); setTagsInput(''); } }}
              className="px-4 py-2.5 bg-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-200 cursor-pointer">Add</button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 tracking-wider block">Features</label>
          <div className="flex gap-2">
            <input type="text" placeholder="Add feature..." value={newFeature} onChange={e => setNewFeature(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (newFeature.trim()) { setForm({ ...form, features: [...form.features, newFeature.trim()] }); setNewFeature(''); } } }}
              className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
            <button type="button" onClick={() => { if (newFeature.trim()) { setForm({ ...form, features: [...form.features, newFeature.trim()] }); setNewFeature(''); } }}
              className="px-4 py-2.5 bg-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-200 cursor-pointer">Add</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {form.features.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-gray-100 text-gray-600 font-bold">
                {f}
                <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })} className="text-gray-400 hover:text-red-500 cursor-pointer">&times;</button>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 tracking-wider block">FAQs</label>
          <div className="flex gap-2">
            <input type="text" placeholder="Question" value={faqQ} onChange={e => setFaqQ(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
            <input type="text" placeholder="Answer" value={faqA} onChange={e => setFaqA(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
            <button type="button" onClick={() => { if (faqQ.trim() && faqA.trim()) { setForm({ ...form, faqs: [...form.faqs, { question: faqQ.trim(), answer: faqA.trim() }] }); setFaqQ(''); setFaqA(''); } }}
              className="px-4 py-2.5 bg-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-200 cursor-pointer">Add</button>
          </div>
          <div className="space-y-1">
            {form.faqs.map((f, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50/80 border border-black/[0.04]">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-900 truncate">{f.question}</div>
                  <div className="text-[10px] text-gray-400 truncate">{f.answer}</div>
                </div>
                <button type="button" onClick={() => setForm({ ...form, faqs: form.faqs.filter((_, j) => j !== i) })}
                  className="text-red-400 hover:text-red-600 cursor-pointer shrink-0"><X size={12} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className={`w-12 h-7 rounded-full relative transition-colors ${form.status === 'active' ? 'bg-[#2C3EFE]' : 'bg-gray-300'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${form.status === 'active' ? 'left-[26px]' : 'left-1'}`} />
            </div>
            <span className="text-sm font-bold text-gray-700">Active</span>
            <input type="checkbox" className="sr-only" checked={form.status === 'active'}
              onChange={e => setForm({ ...form, status: e.target.checked ? 'active' : 'inactive' })} />
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className={`w-12 h-7 rounded-full relative transition-colors ${form.featured ? 'bg-[#FF9F0A]' : 'bg-gray-300'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${form.featured ? 'left-[26px]' : 'left-1'}`} />
            </div>
            <span className="text-sm font-bold text-gray-700">Featured</span>
            <input type="checkbox" className="sr-only" checked={form.featured}
              onChange={e => setForm({ ...form, featured: e.target.checked })} />
          </label>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 cursor-pointer select-none">
            <input type="checkbox" checked={!!form.isRecommended} onChange={e => setForm({ ...form, isRecommended: e.target.checked })}
              className="w-4 h-4 accent-[#FF9F0A] rounded" /> Recommended
          </label>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 cursor-pointer select-none">
            <input type="checkbox" checked={!!form.isNewPick} onChange={e => setForm({ ...form, isNewPick: e.target.checked })}
              className="w-4 h-4 accent-[#34C759] rounded" /> New Pick
          </label>
        </div>

        <div className="p-4 rounded-xl border border-black/[0.04] bg-gray-50/50 space-y-3">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider block">SEO</span>
          <div className="space-y-2">
            <input type="text" value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} placeholder="SEO Title (defaults to app name)"
              className="w-full px-4 py-2.5 bg-white border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
            <input type="text" value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} placeholder="SEO Description (defaults to app description)"
              className="w-full px-4 py-2.5 bg-white border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
            <input type="text" value={form.keywords || ''} onChange={e => setForm({ ...form, keywords: e.target.value })} placeholder="Keywords (comma separated)"
              className="w-full px-4 py-2.5 bg-white border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34C759]/20" />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2 border-t border-black/[0.04]">
          <button type="button" onClick={() => router.push('/admin/apps')}
            className="px-6 py-3 bg-white border border-black/[0.06] rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer">Cancel</button>
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#2C3EFE] text-white rounded-2xl text-sm font-bold hover:bg-[#2230d6] transition-all disabled:opacity-50 cursor-pointer shadow-sm">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : isNew ? 'Create App' : 'Update App'}
          </button>
        </div>
      </form>
    </div>
  );
};
