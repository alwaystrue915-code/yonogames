'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Images } from 'lucide-react';

interface Props {
  screenshots: string[];
  onChange: (screenshots: string[]) => void;
}

export default function ScreenshotsUpload({ screenshots, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append('key', 'yonogames-v2');
    fd.append('image', file);
    try {
      const res = await fetch('https://app.nexapk.in/upload.php', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) return data.url;
      return null;
    } catch {
      return null;
    }
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of files) {
      const url = await uploadFile(file);
      if (url) uploaded.push(url);
    }
    if (uploaded.length) onChange([...screenshots, ...uploaded]);
    else alert('Upload failed for some images');
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  function removeScreenshot(index: number) {
    onChange(screenshots.filter((_, i) => i !== index));
  }

  function moveLeft(index: number) {
    if (index === 0) return;
    const arr = [...screenshots];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    onChange(arr);
  }

  function moveRight(index: number) {
    if (index === screenshots.length - 1) return;
    const arr = [...screenshots];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    onChange(arr);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
          <Images className="w-3.5 h-3.5" /> Screenshots
          <span className="text-gray-300 font-normal ml-1">({screenshots.length} added)</span>
        </label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2C3EFE] text-white rounded-xl text-[10px] font-bold hover:bg-[#2230d6] transition-all disabled:opacity-50 cursor-pointer"
        >
          {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
          {uploading ? 'Uploading...' : 'Add Screenshots'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {screenshots.length === 0 ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-[#2C3EFE]/30 hover:text-[#2C3EFE] transition-all cursor-pointer disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Images className="w-6 h-6" />
          )}
          <span className="text-xs font-medium">
            {uploading ? 'Uploading...' : 'Click to add multiple screenshots'}
          </span>
          <span className="text-[10px] text-gray-300">PNG, JPG, WebP • Select multiple files at once</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {screenshots.map((url, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-gray-50" style={{ aspectRatio: '9/16' }}>
              <Image src={url} alt={`Screenshot ${index + 1}`} fill className="object-cover" unoptimized />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-1.5">
                <button
                  type="button"
                  onClick={() => removeScreenshot(index)}
                  className="self-end p-1 rounded-lg bg-red-500/90 text-white hover:bg-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="flex gap-1 items-center">
                  <button
                    type="button"
                    onClick={() => moveLeft(index)}
                    disabled={index === 0}
                    className="w-6 h-6 rounded-lg bg-white/20 text-white text-[10px] font-bold hover:bg-white/40 disabled:opacity-30 cursor-pointer flex items-center justify-center"
                  >
                    ‹
                  </button>
                  <span className="w-5 h-5 rounded-lg bg-white/20 text-white text-[10px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => moveRight(index)}
                    disabled={index === screenshots.length - 1}
                    className="w-6 h-6 rounded-lg bg-white/20 text-white text-[10px] font-bold hover:bg-white/40 disabled:opacity-30 cursor-pointer flex items-center justify-center"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Add more tile */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-[#2C3EFE]/40 hover:text-[#2C3EFE] transition-all cursor-pointer disabled:opacity-50"
            style={{ aspectRatio: '9/16' }}
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            <span className="text-[10px] font-medium text-center px-1">
              {uploading ? 'Uploading...' : 'Add More'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
