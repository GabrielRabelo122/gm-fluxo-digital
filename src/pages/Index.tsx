import { useState } from "react";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";

interface User {
  username: string;
  profile: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, profile: string) => {
    setUser({ username, profile });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Index;
