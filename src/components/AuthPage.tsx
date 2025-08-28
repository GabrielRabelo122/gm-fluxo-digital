import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, Key } from "lucide-react";

interface AuthPageProps {
  onLogin: (username: string, profile: string) => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
    fullName: "",
    badge: "",
    profile: ""
  });

  const handleLogin = () => {
    if (loginForm.username && loginForm.password) {
      // Simulate login - in real app this would validate with Supabase
      onLogin(loginForm.username, "guarda_municipal");
    }
  };

  const handleSignup = () => {
    if (signupForm.username && signupForm.password && signupForm.profile) {
      onLogin(signupForm.username, signupForm.profile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Sistema de Solicitações</h1>
          <p className="text-muted-foreground">Guarda Municipal de Montes Claros</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Entrar no Sistema
                </CardTitle>
                <CardDescription>
                  Digite suas credenciais para acessar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Usuário</Label>
                  <Input
                    id="login-username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder="Digite seu usuário"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Digite sua senha"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Entrar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Novo Cadastro
                </CardTitle>
                <CardDescription>
                  Crie sua conta no sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nome Completo</Label>
                  <Input
                    id="signup-name"
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-badge">Matrícula</Label>
                  <Input
                    id="signup-badge"
                    value={signupForm.badge}
                    onChange={(e) => setSignupForm({ ...signupForm, badge: e.target.value })}
                    placeholder="Digite sua matrícula"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Usuário</Label>
                  <Input
                    id="signup-username"
                    value={signupForm.username}
                    onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                    placeholder="Escolha um usuário"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    placeholder="Escolha uma senha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile">Perfil</Label>
                  <Select value={signupForm.profile} onValueChange={(value) => setSignupForm({ ...signupForm, profile: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guarda_municipal">Guarda Municipal</SelectItem>
                      <SelectItem value="administrador">Administrador</SelectItem>
                      <SelectItem value="comandante">Comandante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSignup} className="w-full">
                  Cadastrar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}