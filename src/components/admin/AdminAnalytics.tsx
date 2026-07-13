'use client';

import React from 'react';
import { Database, FileText, Eye, MousePointerClick, TrendingUp, AlertCircle } from 'lucide-react';
import { DashboardAnalytics } from '../../types';

interface AdminAnalyticsProps {
  analytics: DashboardAnalytics | null;
  loading: boolean;
  totalApps?: number;
  totalBlogPosts?: number;
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ analytics, totalApps, totalBlogPosts }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-4 sm:p-5">
          <div className="w-10 h-10 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center mb-3">
            <Database className="w-5 h-5 text-[#007AFF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{totalApps ?? '-'}</div>
          <div className="text-xs sm:text-sm text-gray-400 font-semibold mt-0.5">Total Apps</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-4 sm:p-5">
          <div className="w-10 h-10 rounded-2xl bg-[#FF9F0A]/10 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5 text-[#FF9F0A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{totalBlogPosts ?? '-'}</div>
          <div className="text-xs sm:text-sm text-gray-400 font-semibold mt-0.5">Blog Posts</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-4 sm:p-5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
            <Eye className="w-5 h-5 text-[#007AFF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{analytics ? analytics.totalViews.toLocaleString() : '-'}</div>
          <div className="text-xs sm:text-sm text-gray-400 font-semibold mt-0.5">Page Views</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-4 sm:p-5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
            <MousePointerClick className="w-5 h-5 text-[#5856D6]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{analytics ? analytics.totalClicks.toLocaleString() : '-'}</div>
          <div className="text-xs sm:text-sm text-gray-400 font-semibold mt-0.5">Clicks</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-4 sm:p-5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-[#2C3EFE]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{analytics ? `${analytics.averageCtr}%` : '-'}</div>
          <div className="text-xs sm:text-sm text-gray-400 font-semibold mt-0.5">Avg. CTR</div>
        </div>
      </div>
    </div>
  );
};
