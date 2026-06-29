"use client";

import React, { useState } from 'react';
import { Send, Mail, Copy, Check, ShieldQuestion } from 'lucide-react';

const contactSeoSections = [
  {
    title: 'Contact For Yono Game Listing Updates',
    body: 'If you found Yono Games while searching for Yono games, rummy APK download links, bonus details, or app comparison pages, this contact page explains the right way to reach us. We accept messages related to listing corrections, missing app details, outdated bonus information, broken redirect links, logo updates, category changes, and general website feedback. Clear messages help us review listings faster. Please include the app name, page URL, issue type, and any official reference link that supports the update request.'
  },
  {
    title: 'Advertising And Partnership Queries',
    body: 'Yono Games may receive business inquiries from app promoters, advertising partners, content teams, and digital marketers who want visibility on rummy APK or gaming app directory pages. Partnership messages should be transparent and should not include false earning promises, misleading withdrawal claims, or unsafe download sources. A useful business email explains the app category, target market, official website, brand assets, compliance notes, and the exact pages where promotion is requested. We prefer natural, user-focused information that improves the directory instead of thin promotional content.'
  },
  {
    title: 'What We Can And Cannot Help With',
    body: 'Yono Games can help with website-level issues such as incorrect app names, wrong bonus text, outdated descriptions, missing FAQs, category problems, and link review requests. We cannot solve login issues, deposits, withdrawals, wallet disputes, KYC checks, gameplay errors, account bans, or payment problems inside third-party apps. Those issues belong to the official app support team. This distinction is important for users and search engines because it keeps the role of Yono Games clear: we are a discovery and comparison directory, not a game operator.'
  },
  {
    title: 'Natural Search And GEO Contact Intent',
    body: 'People search contact pages using many different phrases: contact Yono Games, Yono game support, rummy APK listing correction, gaming app advertising, APK download issue, and business inquiry for Yono games. This page uses those terms naturally so Google and AI search systems can understand who should contact us and why. Instead of repeating keywords awkwardly, the page answers practical questions: how to report wrong information, where to ask about advertising, what details to include, and when to contact the third-party game instead.'
  },
  {
    title: 'How To Send A Better Request',
    body: 'A strong request is short, specific, and verifiable. If you are reporting a broken APK redirect, mention the page URL and what happened after clicking. If you are asking for a listing update, include the official app source and the exact field that should change. If you are asking for advertising, share the campaign goal and brand details. Avoid sending passwords, OTPs, payment screenshots with private data, or sensitive account information. Yono Games does not need personal gaming credentials to review directory content.'
  }
];

const contactFaqs = [
  {
    question: 'Can Yono Games fix my withdrawal or deposit issue?',
    answer: 'No. Withdrawal, deposit, KYC, login, gameplay, and account issues must be handled by the official support team of the third-party app where the issue happened.'
  },
  {
    question: 'How can I report wrong app information?',
    answer: 'Send the app name, page URL, incorrect detail, and an official source that proves the correct information. This helps us review and update the listing more accurately.'
  },
  {
    question: 'Can app owners request listing changes?',
    answer: 'Yes. App owners or representatives can contact us for corrections, brand asset updates, category changes, and business inquiries, but the request should be transparent and verifiable.'
  },
  {
    question: 'Why does Yono Games use Telegram and email?',
    answer: 'Telegram is useful for quick messages, while email is better for business cooperation, listing evidence, advertising proposals, and detailed correction requests.'
  }
];

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'support@yonohub.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* 1. Page Title */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#b91c1c] to-[#991b1b] text-white p-6 shadow-md border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] bg-white/20 text-white font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/20">
            Get In Touch
          </span>
          <h1 className="text-xl font-extrabold uppercase tracking-wide">Contact Yono Games Support</h1>
          <p className="text-xs text-red-100 leading-relaxed font-semibold">
            Reach Yono Games for rummy APK listing updates, advertising, corrections, and partnership inquiries.
          </p>
        </div>
      </div>

      {/* 2. Primary Contact Cards */}
      <div className="space-y-3">
        {/* Telegram Card */}
        <a 
          href="https://telegram.me/aaron7512" 
          target="_blank" 
          rel="noreferrer noopener nofollow"
          className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-blue-400 hover:shadow-md transition-all group no-underline text-inherit"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <Send size={18} />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-xs font-extrabold text-slate-800">Official Telegram Channel</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">@aaron7512</p>
          </div>
          <span className="text-[10px] font-black text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Chat
          </span>
        </a>

        {/* Email Card */}
        <div 
          onClick={copyToClipboard}
          className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <Mail size={18} />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-xs font-extrabold text-slate-800">Business Cooperation</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">{emailAddress}</p>
          </div>
          <button 
            className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-1 transition-all border ${
              copied 
                ? 'bg-emerald-100 text-emerald-700 border-emerald-300' 
                : 'bg-slate-50 text-slate-600 border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-700'
            }`}
          >
            {copied ? (
              <>
                <Check size={10} /> Copied
              </>
            ) : (
              <>
                <Copy size={10} /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Important Notice */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
            <ShieldQuestion size={15} className="text-amber-500" />
            Support Clarification
          </h2>
        </div>

        <div className="space-y-3.5 text-xs text-slate-500 leading-relaxed font-semibold text-left">
          <p>
            Contact <strong className="text-slate-800">Yono Games</strong> for rummy APK listing updates, advertising requests, partnership queries, content corrections, and verified app information. We are a discovery directory, not a game operator. For deposits, withdrawals, login issues, or gameplay account problems, contact the official support team inside the listed third-party app.
          </p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h2 className="text-sm font-extrabold text-slate-800">
            Contact, Listing Correction & Business Inquiry Details
          </h2>
        </div>
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-medium text-left">
          {contactSeoSections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-800">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h2 className="text-sm font-extrabold text-slate-800 text-left">Contact FAQ</h2>
        <div className="space-y-3 text-left">
          {contactFaqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <h3 className="text-[11px] font-extrabold text-slate-800">{faq.question}</h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
export default ContactPage;
