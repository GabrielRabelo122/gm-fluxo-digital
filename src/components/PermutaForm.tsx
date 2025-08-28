import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, ArrowLeft, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PermutaFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function PermutaForm({ onBack, onSubmit }: PermutaFormProps) {
  const [targetGuard, setTargetGuard] = useState("");
  const [giveShift, setGiveShift] = useState("");
  const [receiveShift, setReceiveShift] = useState("");
  const [reason, setReason] = useState("");
  const [observations, setObservations] = useState("");
  const { toast } = useToast();

  // Mock data - in real app this would come from Supabase
  const guardsList = [
    { id: "1", name: "João Silva", badge: "001" },
    { id: "2", name: "Maria Santos", badge: "002" },
    { id: "3", name: "Carlos Oliveira", badge: "003" },
    { id: "4", name: "Ana Costa", badge: "004" },
  ];

  const shiftOptions = [
    { value: "2024-01-20-diurno", label: "20/01/2024 - Diurno (06:00-18:00)" },
    { value: "2024-01-20-noturno", label: "20/01/2024 - Noturno (18:00-06:00)" },
    { value: "2024-01-21-diurno", label: "21/01/2024 - Diurno (06:00-18:00)" },
    { value: "2024-01-21-noturno", label: "21/01/2024 - Noturno (18:00-06:00)" },
    { value: "2024-01-22-diurno", label: "22/01/2024 - Diurno (06:00-18:00)" },
    { value: "2024-01-22-noturno", label: "22/01/2024 - Noturno (18:00-06:00)" },
  ];

  const handleSubmit = () => {
    if (!targetGuard || !giveShift || !receiveShift || !reason.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (giveShift === receiveShift) {
      toast({
        title: "Plantões inválidos",
        description: "Os plantões cedido e recebido devem ser diferentes",
        variant: "destructive"
      });
      return;
    }

    const selectedGuard = guardsList.find(g => g.id === targetGuard);
    const giveShiftLabel = shiftOptions.find(s => s.value === giveShift)?.label;
    const receiveShiftLabel = shiftOptions.find(s => s.value === receiveShift)?.label;

    const formData = {
      type: "permuta",
      targetGuard: selectedGuard,
      giveShift: { value: giveShift, label: giveShiftLabel },
      receiveShift: { value: receiveShift, label: receiveShiftLabel },
      reason: reason.trim(),
      observations: observations.trim(),
      description: `Permuta com ${selectedGuard?.name} - ${reason.trim()}`
    };

    onSubmit(formData);
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de permuta foi enviada. Aguarde a confirmação do colega."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onBack} className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <RefreshCw className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-semibold">Nova Solicitação de Permuta</h1>
              <p className="text-sm opacity-90">Organize a troca de plantões com outro guarda</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Solicitação de Permuta de Plantão
            </CardTitle>
            <CardDescription>
              Selecione o colega e os plantões para realizar a troca. Ambos precisam concordar antes da aprovação final.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Target Guard */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Guarda para Permuta *</Label>
              <Select value={targetGuard} onValueChange={setTargetGuard}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o guarda para a permuta" />
                </SelectTrigger>
                <SelectContent>
                  {guardsList.map((guard) => (
                    <SelectItem key={guard.id} value={guard.id}>
                      {guard.name} - Matrícula {guard.badge}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Give Shift */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Plantão que você vai ceder *</Label>
                <Select value={giveShift} onValueChange={setGiveShift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seu plantão a ceder" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftOptions.map((shift) => (
                      <SelectItem key={shift.value} value={shift.value}>
                        {shift.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Receive Shift */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Plantão que você vai receber *</Label>
                <Select value={receiveShift} onValueChange={setReceiveShift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Plantão a receber" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftOptions.map((shift) => (
                      <SelectItem key={shift.value} value={shift.value}>
                        {shift.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-base font-medium">Motivo da Permuta *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Informe o motivo da solicitação de permuta"
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Observations */}
            <div className="space-y-2">
              <Label htmlFor="observations" className="text-base font-medium">Observações</Label>
              <Textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Informações adicionais (opcional)"
                className="min-h-[80px]"
              />
            </div>

            {/* Info Box */}
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Importante:</strong> A permuta só será válida após a confirmação do outro guarda e aprovação do comandante. 
                Você receberá uma notificação quando houver atualização no status.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Enviar Solicitação
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}