import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  customerName: string;
  customerEmail: string;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        customerName,
        customerEmail,
        login: (email) => {
          setCustomerEmail(email);
          setCustomerName(email.split("@")[0]);
          setIsAuthenticated(true);
        },
        register: (name, email) => {
          setCustomerName(name);
          setCustomerEmail(email);
          setIsAuthenticated(true);
        },
        logout: () => setIsAuthenticated(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
