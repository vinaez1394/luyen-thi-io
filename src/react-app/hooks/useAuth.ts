/**
 * useAuth.ts — Auth state hook
 *
 * Gọi /api/auth/me để lấy user hiện tại.
 * Cung cấp: user, isLoading, isLoggedIn, logout(), loginWithGoogle()
 */

import { useState, useEffect, useCallback } from "react";

// =============================================
// Types
// =============================================
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  subscription_tier: "free" | "basic" | "premium";
  profile: {
    id: string;
    display_name: string;
    avatar_id: string;
    theme: string;
  } | null;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

// =============================================
// Hook
// =============================================
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isLoggedIn: false,
  });

  // Fetch current user từ /api/auth/me
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = (await res.json()) as { user: AuthUser | null };
        setState({
          user: data.user,
          isLoading: false,
          isLoggedIn: !!data.user,
        });
      } else {
        setState({ user: null, isLoading: false, isLoggedIn: false });
      }
    } catch {
      setState({ user: null, isLoading: false, isLoggedIn: false });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Redirect đến Google OAuth
  const loginWithGoogle = useCallback(() => {
    window.location.href = "/api/auth/google";
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, isLoading: false, isLoggedIn: false });
    window.location.href = "/";
  }, []);

  return {
    ...state,
    loginWithGoogle,
    logout,
    refetch: fetchUser,
  };
}
