'use client';

import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { SiteSettings } from '../../types';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminSettingsProps {
  settings: SiteSettings | null;
  onRefreshSettings?: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onRefreshSettings }) => {
  const { token } = useAdminAuth();

  const [settingsTab, setSettingsTab] = useState<'banners' | 'footer' | 'stats'>('banners');
  const [adImage, setAdImage] = useState('');
  const [adLink, setAdLink] = useState('');
  const [adActive, setAdActive] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [banner1, setBanner1] = useState('');
  const [banner2, setBanner2] = useState('');
  const [banner3, setBanner3] = useState('');
  const [banner4, setBanner4] = useState('');
  const [footerAdLogo, setFooterAdLogo] = useState('');
  const [footerAdName, setFooterAdName] = useState('');
  const [footerAdDesc, setFooterAdDesc] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [userRating, setUserRating] = useState(4.8);
  const [ratingCount, setRatingCount] = useState(12842);
  const [telegramSubscribers, setTelegramSubscribers] = useState('32K+');
  const [verifiedApps, setVerifiedApps] = useState('89+');
  const [dailyPayouts, setDailyPayouts] = useState('₹50K+');

  useEffect(() => {
    if (settings) {
      setAdImage(settings.footerAdImage || '');
      setAdLink(settings.footerAdLink || '');
      setAdActive(settings.footerAdActive || false);
      setBanner1(settings.banner1 || '');
      setBanner2(settings.banner2 || '');
      setBanner3(settings.banner3 || '');
      setBanner4(settings.banner4 || '');
      setFooterAdLogo(settings.footerAdLogo || '');
      setFooterAdName(settings.footerAdName || '');
      setFooterAdDesc(settings.footerAdDesc || '');
      setTelegramLink(settings.telegramLink || '');
      setUserRating(settings.userRating || 4.8);
      setRatingCount(settings.ratingCount || 12842);
      setTelegramSubscribers(settings.telegramSubscribers || '32K+');
      setVerifiedApps(settings.verifiedApps || '89+');
      setDailyPayouts(settings.dailyPayouts || '₹50K+');
    }
  }, [settings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    setSaveError('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...settings,
          footerAdImage: adImage.trim(),
          footerAdLink: adLink.trim(),
          footerAdActive: adActive,
          banner1: banner1.trim(),
          banner2: banner2.trim(),
          banner3: banner3.trim(),
          banner4: banner4.trim(),
          footerAdLogo: footerAdLogo.trim(),
          footerAdName: footerAdName.trim(),
          footerAdDesc: footerAdDesc.trim(),
          telegramLink: telegramLink.trim(),
          userRating,
          ratingCount,
          telegramSubscribers: telegramSubscribers.trim(),
          verifiedApps: verifiedApps.trim(),
          dailyPayouts: dailyPayouts.trim()
        })
      });

      if (res.ok) {
        setSaveSuccess(true);
        if (onRefreshSettings) onRefreshSettings();
      } else {
        const err = await res.json();
        setSaveError(err.message || 'Failed to save settings.');
      }
    } catch (err) {
      console.error(err);
      setSaveError('Network error. Failed to save settings.');
    }
  };

  const tabLabel = (tab: string) =>
    tab === 'banners' ? 'Carousel Banners' :
    tab === 'footer' ? 'Footer Promo Ad' :
    'Stats & Telegram';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">Manage site configuration</p>
      </div>

      <div className="flex border border-black/[0.04] bg-white/80 p-1 rounded-xl gap-1 backdrop-blur-sm">
          {(['banners', 'footer', 'stats'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setSettingsTab(tab)}
            className={`flex-1 py-2 text-center text-[10.5px] font-extrabold uppercase rounded-lg transition-all cursor-pointer border-0 outline-none ${
              settingsTab === tab
                ? 'bg-[#2C3EFE] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tabLabel(tab)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            Settings saved successfully.
          </div>
        )}
        {saveError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
            {saveError}
          </div>
        )}

        {settingsTab === 'banners' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-6 space-y-5">
            <h2 className="text-sm font-bold text-gray-900">Carousel Banners</h2>
            <div className="space-y-4">
              {[
                { id: 1, label: 'Slide Banner 1', val: banner1, set: setBanner1 },
                { id: 2, label: 'Slide Banner 2', val: banner2, set: setBanner2 },
                { id: 3, label: 'Slide Banner 3', val: banner3, set: setBanner3 },
                { id: 4, label: 'Slide Banner 4', val: banner4, set: setBanner4 },
              ].map(b => (
                <div key={b.id} className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase block">{b.label} Image URL</label>
                  <input type="text" value={b.val} onChange={e => b.set(e.target.value)}
                    placeholder="https://site.com/banners/banner1.png"
                    className="w-full h-10 px-3 rounded-xl text-xs outline-none bg-white border border-gray-200 text-gray-900 focus:border-[#34C759]/40 focus:ring-1 focus:ring-[#34C759]/10 transition-all font-medium" />
                </div>
              ))}
            </div>
          </div>
        )}

        {settingsTab === 'footer' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-6 space-y-5">
            <h2 className="text-sm font-bold text-gray-900">Footer Promo Ad</h2>
            <div className="space-y-4">
              {[
                { label: 'App Logo URL', val: footerAdLogo, set: setFooterAdLogo, ph: 'Logo URL' },
                { label: 'App Name', val: footerAdName, set: setFooterAdName, ph: 'App name' },
                { label: 'Description', val: footerAdDesc, set: setFooterAdDesc, ph: 'Description text', rows: 2 },
                { label: 'Redirect URL', val: adLink, set: setAdLink, ph: 'Download URL' },
              ].map(f => f.rows ? (
                <div key={f.label} className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase block">{f.label}</label>
                  <textarea rows={f.rows} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                    className="w-full p-3 rounded-xl text-xs outline-none bg-white border border-gray-200 text-gray-900 focus:border-[#34C759]/40 focus:ring-1 focus:ring-[#34C759]/10 transition-all font-medium" />
                </div>
              ) : (
                <div key={f.label} className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase block">{f.label}</label>
                  <input type="text" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                    className="w-full h-10 px-3 rounded-xl text-xs outline-none bg-white border border-gray-200 text-gray-900 focus:border-[#34C759]/40 focus:ring-1 focus:ring-[#34C759]/10 transition-all font-medium" />
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="footerAdActive" checked={adActive} onChange={e => setAdActive(e.target.checked)}
                  className="w-4 h-4 accent-[#34C759] rounded cursor-pointer" />
                <label htmlFor="footerAdActive" className="text-xs font-bold text-gray-600 cursor-pointer select-none">
                  Enable Footer Promo Ad Card
                </label>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'stats' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-6 space-y-5">
            <h2 className="text-sm font-bold text-gray-900">Stats & Telegram</h2>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 font-extrabold uppercase flex items-center gap-1.5"><Send size={12} /> Telegram Link</label>
              <input type="text" value={telegramLink} onChange={e => setTelegramLink(e.target.value)}
                placeholder="https://t.me/yourchannel"
                className="w-full h-10 px-3 rounded-xl text-xs outline-none bg-white border border-gray-200 text-gray-900 focus:border-[#34C759]/40 focus:ring-1 focus:ring-[#34C759]/10 transition-all font-medium" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase block">User Rating</label>
                <input type="number" step="0.1" min="0" max="5" value={userRating} onChange={e => setUserRating(parseFloat(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl text-xs outline-none bg-white border border-gray-200 text-gray-900 focus:border-[#34C759]/40 focus:ring-1 focus:ring-[#34C759]/10 transition-all font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase block">Rating Count</label>
                <input type="number" value={ratingCount} onChange={e => setRatingCount(parseInt(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl text-xs outline-none bg-white border border-gray-200 text-gray-900 focus:border-[#34C759]/40 focus:ring-1 focus:ring-[#34C759]/10 transition-all font-bold" />
              </div>
            </div>
            {[
              { label: 'Telegram Subscribers', val: telegramSubscribers, set: setTelegramSubscribers, ph: '32K+' },
              { label: 'Verified Apps', val: verifiedApps, set: setVerifiedApps, ph: '89+' },
              { label: 'Daily Payouts', val: dailyPayouts, set: setDailyPayouts, ph: '₹50K+' },
            ].map(f => (
              <div key={f.label} className="space-y-1">
                <label className="text-[10px] text-gray-400 font-extrabold uppercase block">{f.label}</label>
                <input type="text" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                  className="w-full h-10 px-3 rounded-xl text-xs outline-none bg-white border border-gray-200 text-gray-900 focus:border-[#34C759]/40 focus:ring-1 focus:ring-[#34C759]/10 transition-all font-bold" />
              </div>
            ))}
          </div>
        )}

        <button type="submit"
          className="w-full px-5 py-3 rounded-xl bg-[#2C3EFE] hover:bg-[#2230d6] text-white font-extrabold text-xs cursor-pointer shadow-md transition-all active:scale-[0.99] border-0">
          Save {tabLabel(settingsTab)} Settings
        </button>
      </form>
    </div>
  );
};
