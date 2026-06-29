'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, FileImage, Loader2, Check } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onUploaded: (url: string) => void;
}

export default function UploadModal({ open, onClose, onUploaded }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setPreview(URL.createObjectURL(file));
    const fd = new FormData();
    fd.append('key', 'yonogames-v2');
    fd.append('image', file);
    try {
      const res = await fetch('https://app.nexapk.in/upload.php', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) setResult(data.url);
      else alert(data.error || 'Upload failed');
    } catch { alert('Upload failed'); }
    finally { setUploading(false); }
  }, []);

  useEffect(() => {
    if (!open) { setPreview(null); setResult(null); setUploading(false); }
  }, [open]);

  useEffect(() => {
    if (result && !uploading) {
      onUploaded(result);
      onClose();
    }
  }, [result, uploading, onUploaded, onClose]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && /image\/(png|jpeg|webp|gif)/.test(file.type)) upload(file);
  }, [upload]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = '';
  }, [upload]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-extrabold text-slate-900">Upload Image</h2>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {result ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="text-sm font-bold text-emerald-600">Uploaded successfully!</p>
            </div>
          ) : (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-3 py-12 px-4 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                dragOver ? 'border-[#2C3EFE] bg-[#2C3EFE]/5' : 'border-slate-200 bg-slate-50/50 hover:border-[#2C3EFE]/30 hover:bg-[#2C3EFE]/5'
              }`}
            >
              {preview ? (
                <img src={preview} alt="" className="max-h-40 rounded-lg object-contain" />
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    {uploading ? <Loader2 className="w-7 h-7 text-[#2C3EFE] animate-spin" /> : <FileImage className="w-7 h-7 text-slate-400" />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700">Drop image here or click to browse</p>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">PNG, JPG, WEBP or GIF max 10MB</p>
                  </div>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleFile} className="hidden" />
            </div>
          )}

          {uploading && (
            <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#2C3EFE]/5 border border-[#2C3EFE]/10">
              <Loader2 className="w-4 h-4 text-[#2C3EFE] animate-spin shrink-0" />
              <span className="text-xs font-bold text-[#2C3EFE]">Uploading image...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
