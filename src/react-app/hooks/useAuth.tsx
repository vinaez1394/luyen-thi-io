/**
 * useAuth.ts — Auth Context + Hook
 *
 * KIẾN TRÚC:
 *   AuthProvider (bao App) → fetch /api/auth/me MỘT LẦN DUY NHẤT
 *   useAuth() ở bất kỳ component nào → đọc từ Context (không gọi API)
 *
 * TRƯỚC (lỗi cũ):
 *   Mỗi component gọi useAuth() = gọi /api/auth/me riêng
 *   → App + GlobalHeader + MobileBottomNav + ProtectedRoute = 4 lần gọi API
 *
 * SAU (đã sửa):
 *   AuthProvider gọi API 1 lần → share state qua Context
 *   → Chỉ 1 lần gọi /api/auth/me cho toàn bộ app
 */

import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import type { ReactNode } from "react";

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

interface AuthContextValue extends AuthState {
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

// =============================================
// Context
// =============================================
const AuthContext = createContext<AuthContextValue | null>(null);

// =============================================
// Provider — bao ngoài App, fetch API 1 lần
// =============================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isLoggedIn: false,
  });

  // Fetch user — chỉ gọi 1 lần khi Provider mount
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = (await res.json()) as { user: AuthUser | null };
        setState({
          user: data.user,
          isLoading: false,
          isLoggedIn: !!data.user,
        });
      } else {
        // 401 là bình thường với guest — không log error
        setState({ user: null, isLoading: false, isLoggedIn: false });
      }
    } catch {
      setState({ user: null, isLoading: false, isLoggedIn: false });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser ổn định (useCallback []) → chỉ chạy 1 lần

  const loginWithGoogle = useCallback(() => {
    window.location.assign(window.location.origin + "/api/auth/google");
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setState({ user: null, isLoading: false, isLoggedIn: false });
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, loginWithGoogle, logout, refetch: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =============================================
// Hook — dùng trong mọi component
// Không gọi API, chỉ đọc từ Context
// =============================================
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth() phải được dùng bên trong <AuthProvider>");
  }
  return ctx;
}
