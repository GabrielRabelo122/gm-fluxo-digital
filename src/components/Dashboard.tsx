import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  FileText, 
  RefreshCw, 
  Plus, 
  Shield, 
  LogOut,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import DispensaForm from "./DispensaForm";
import AtestadoForm from "./AtestadoForm";
import PermutaForm from "./PermutaForm";

interface User {
  username: string;
  profile: string;
}

interface Request {
  id: string;
  type: "dispensa" | "atestado" | "permuta";
  status: "pendente" | "aprovado" | "negado";
  createdAt: string;
  description: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "dispensa" | "atestado" | "permuta">("dashboard");
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      type: "dispensa",
      status: "pendente",
      createdAt: "2024-01-15",
      description: "Dispensa para consulta médica"
    },
    {
      id: "2",
      type: "atestado",
      status: "aprovado",
      createdAt: "2024-01-10",
      description: "Atestado médico - 3 dias"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-4 h-4" />;
      case "aprovado":
        return <CheckCircle className="w-4 h-4" />;
      case "negado":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pendente":
        return "secondary";
      case "aprovado":
        return "default";
      case "negado":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getProfileTitle = (profile: string) => {
    switch (profile) {
      case "guarda_municipal":
        return "Guarda Municipal";
      case "administrador":
        return "Administrador";
      case "comandante":
        return "Comandante";
      default:
        return "Usuário";
    }
  };

  const handleNewRequest = (type: "dispensa" | "atestado" | "permuta", data: any) => {
    const newRequest: Request = {
      id: Date.now().toString(),
      type,
      status: "pendente",
      createdAt: new Date().toISOString().split('T')[0],
      description: data.description || `Nova solicitação de ${type}`
    };
    setRequests([newRequest, ...requests]);
    setCurrentView("dashboard");
  };

  if (currentView === "dispensa") {
    return <DispensaForm onBack={() => setCurrentView("dashboard")} onSubmit={(data) => handleNewRequest("dispensa", data)} />;
  }

  if (currentView === "atestado") {
    return <AtestadoForm onBack={() => setCurrentView("dashboard")} onSubmit={(data) => handleNewRequest("atestado", data)} />;
  }

  if (currentView === "permuta") {
    return <PermutaForm onBack={() => setCurrentView("dashboard")} onSubmit={(data) => handleNewRequest("permuta", data)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-semibold">Sistema de Solicitações</h1>
                <p className="text-sm opacity-90">Guarda Municipal de Montes Claros</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user.username}</p>
                <p className="text-sm opacity-90">{getProfileTitle(user.profile)}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout} className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Nova Solicitação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView("dispensa")}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  Dispensa
                </CardTitle>
                <CardDescription>
                  Solicitar dispensa para dias específicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Dispensa
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView("atestado")}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  Atestado
                </CardTitle>
                <CardDescription>
                  Enviar atestado médico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Atestado
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView("permuta")}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  Permuta
                </CardTitle>
                <CardDescription>
                  Solicitar troca de plantão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Permuta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Minhas Solicitações</h2>
          <div className="space-y-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma solicitação encontrada</p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {request.type === "dispensa" && <Calendar className="w-5 h-5 text-primary" />}
                          {request.type === "atestado" && <FileText className="w-5 h-5 text-primary" />}
                          {request.type === "permuta" && <RefreshCw className="w-5 h-5 text-primary" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground capitalize">{request.type}</h3>
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                          <p className="text-xs text-muted-foreground">Criado em {request.createdAt}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(request.status)} className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}