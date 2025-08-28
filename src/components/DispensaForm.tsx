import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowLeft, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DispensaFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function DispensaForm({ onBack, onSubmit }: DispensaFormProps) {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState("");
  const [reason, setReason] = useState("");
  const [observations, setObservations] = useState("");
  const { toast } = useToast();

  const addDate = () => {
    if (newDate && !selectedDates.includes(newDate)) {
      setSelectedDates([...selectedDates, newDate]);
      setNewDate("");
    }
  };

  const removeDate = (dateToRemove: string) => {
    setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
  };

  const handleSubmit = () => {
    if (selectedDates.length === 0 || !reason.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione pelo menos uma data e informe o motivo",
        variant: "destructive"
      });
      return;
    }

    const formData = {
      type: "dispensa",
      dates: selectedDates,
      reason: reason.trim(),
      observations: observations.trim(),
      description: `Dispensa para ${selectedDates.length} dia(s) - ${reason.trim()}`
    };

    onSubmit(formData);
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de dispensa foi enviada para análise"
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
            <Calendar className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-semibold">Nova Solicitação de Dispensa</h1>
              <p className="text-sm opacity-90">Selecione os dias e informe o motivo</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Solicitação de Dispensa</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para solicitar dispensa. Você pode selecionar múltiplos dias não sequenciais.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Datas Solicitadas</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addDate} disabled={!newDate}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {selectedDates.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Datas selecionadas:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDates.map((date) => (
                      <div key={date} className="flex items-center gap-2 bg-muted rounded-md px-3 py-1">
                        <span className="text-sm">
                          {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDate(date)}
                          className="h-auto p-0 w-4 h-4"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-base font-medium">Motivo *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Informe o motivo da solicitação de dispensa"
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