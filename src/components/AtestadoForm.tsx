import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AtestadoFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function AtestadoForm({ onBack, onSubmit }: AtestadoFormProps) {
  const [attestDate, setAttestDate] = useState("");
  const [reason, setReason] = useState("");
  const [observations, setObservations] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 5MB",
          variant: "destructive"
        });
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Tipo de arquivo não permitido",
          description: "Envie apenas arquivos JPG, PNG ou PDF",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!attestDate || !reason.trim() || !selectedFile) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios e anexe o atestado",
        variant: "destructive"
      });
      return;
    }

    const formData = {
      type: "atestado",
      date: attestDate,
      reason: reason.trim(),
      observations: observations.trim(),
      file: selectedFile,
      description: `Atestado médico - ${reason.trim()}`
    };

    onSubmit(formData);
    toast({
      title: "Solicitação enviada",
      description: "Seu atestado foi enviado para análise"
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
            <FileText className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-semibold">Novo Atestado Médico</h1>
              <p className="text-sm opacity-90">Anexe seu atestado e preencha as informações</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Envio de Atestado Médico</CardTitle>
            <CardDescription>
              Anexe o arquivo do atestado e preencha as informações complementares.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Arquivo do Atestado *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-foreground">
                        Clique para selecionar o arquivo
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        JPG, PNG ou PDF até 5MB
                      </span>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              
              {selectedFile && (
                <div className="bg-muted rounded-md p-3">
                  <p className="text-sm font-medium">Arquivo selecionado:</p>
                  <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {/* Attest Date */}
            <div className="space-y-2">
              <Label htmlFor="attest-date" className="text-base font-medium">Data do Atestado *</Label>
              <Input
                id="attest-date"
                type="date"
                value={attestDate}
                onChange={(e) => setAttestDate(e.target.value)}
                required
              />
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-base font-medium">Motivo/CID *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Informe o motivo ou CID do atestado"
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
                Enviar Atestado
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}