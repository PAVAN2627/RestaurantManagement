import React, { createContext, useContext, useState, useCallback } from "react";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  loginAsAdmin: () => void;
}

const mockUser: MockUser = {
  id: "u1",
  name: "Rahul Sharma",
  email: "rahul.sharma@gmail.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  role: "user",
};

const mockAdmin: MockUser = {
  id: "a1",
  name: "Admin Chef",
  email: "admin@saffron.in",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  role: "admin",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);

  const login = useCallback(() => setUser(mockUser), []);
  const loginAsAdmin = useCallback(() => setUser(mockAdmin), []);
  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, loginAsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
