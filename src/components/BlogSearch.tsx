"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  placeholder?: string;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ placeholder = 'Search blog posts...' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/blog?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <Search size={14} className="absolute left-3.5 text-slate-400 pointer-events-none shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-9 rounded-xl text-xs font-semibold outline-none text-slate-800 bg-white border border-slate-200 focus:border-[#2C3EFE]/40 focus:ring-1 focus:ring-[#2C3EFE]/10 transition-all placeholder-slate-400"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer border-0 bg-transparent"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
};

export default BlogSearch;
