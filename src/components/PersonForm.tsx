import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PersonFormProps {
  onSubmit: (data: { nome: string; idade: number; cidade: string }) => Promise<boolean>;
}

export function PersonForm({ onSubmit }: PersonFormProps) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !idade || !cidade.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);
    const success = await onSubmit({
      nome: nome.trim(),
      idade: parseInt(idade),
      cidade: cidade.trim(),
    });
    setLoading(false);

    if (success) {
      toast.success('Pessoa cadastrada com sucesso!');
      setNome('');
      setIdade('');
      setCidade('');
    } else {
      toast.error('Erro ao cadastrar pessoa');
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Cadastrar Pessoa
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Preencha os dados abaixo para cadastrar uma nova pessoa
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idade">Idade</Label>
            <Input
              id="idade"
              type="number"
              min="0"
              max="150"
              placeholder="Digite a idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              placeholder="Digite a cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastrar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
