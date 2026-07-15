"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdminAuthContextType {
  token: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/verify', { cache: 'no-store' })
      .then((res) => setToken(res.ok ? 'authenticated' : null))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (!res.ok) return false;
      setToken('authenticated');
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    void fetch('/api/auth/logout', { method: 'POST' });
  };

  return (
    <AdminAuthContext.Provider value={{
      token,
      login,
      logout,
      isAuthenticated: Boolean(token),
      loading,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
};
