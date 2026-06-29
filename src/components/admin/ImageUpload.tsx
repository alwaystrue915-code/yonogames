'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Link, X, Loader2 } from 'lucide-react';

interface Props {
  onSelect: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

export default function ImageUpload({ onSelect, currentUrl, label }: Props) {
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('key', 'yonogames-v2');
    fd.append('image', file);
    try {
      const res = await fetch('https://app.nexapk.in/upload.php', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) { onSelect(data.url); setUrlInput(data.url); }
      else alert(data.error || 'Upload failed');
    } catch { alert('Upload failed'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  }

  async function handleUrl() {
    const url = urlInput.trim();
    if (!url) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('key', 'yonogames-v2');
    fd.append('url', url);
    try {
      const res = await fetch('https://app.nexapk.in/upload.php', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) { onSelect(data.url); setUrlInput(data.url); }
      else { onSelect(url); }
    } catch { onSelect(url); }
    finally { setUploading(false); }
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-[11px] font-bold text-gray-400 tracking-wider block">{label}</label>}
      <div className="flex gap-1.5 mb-1.5">
        <button type="button" onClick={() => setTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${tab === 'upload' ? 'bg-[#2C3EFE] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          <Upload className="w-3 h-3" /> Upload
        </button>
        <button type="button" onClick={() => setTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${tab === 'url' ? 'bg-[#2C3EFE] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          <Link className="w-3 h-3" /> URL
        </button>
      </div>
      {tab === 'upload' ? (
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-medium text-gray-400 hover:border-[#2C3EFE]/30 hover:text-[#2C3EFE] transition-all cursor-pointer disabled:opacity-50">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Uploading...' : currentUrl ? 'Change image' : 'Choose image'}
          </button>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleFile} className="hidden" />
          {currentUrl && (
            <button type="button" onClick={() => onSelect('')} className="p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-all cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input value={urlInput} onChange={e => setUrlInput(e.target.value)}
            placeholder="https://..." className="flex-1 px-4 py-3 bg-gray-50/80 border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C3EFE]/20 focus:border-[#2C3EFE]/40 transition-all" />
          <button type="button" onClick={handleUrl} disabled={uploading}
            className="px-4 py-3 bg-[#2C3EFE] text-white rounded-2xl text-sm font-bold hover:bg-[#2536d6] transition-all disabled:opacity-50 cursor-pointer">{uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upload'}</button>
        </div>
      )}
      {currentUrl && (
        <div className="relative w-full h-32 rounded-xl border border-slate-200 overflow-hidden">
          <Image src={currentUrl} alt="" fill className="object-cover" unoptimized />
        </div>
      )}
    </div>
  );
}
