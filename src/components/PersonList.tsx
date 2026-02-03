import { Person } from '@/types/Person';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Trash2, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface PersonListProps {
  people: Person[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => Promise<boolean>;
  onRefresh: () => void;
}

export function PersonList({ people, loading, error, onDelete, onRefresh }: PersonListProps) {
  const handleDelete = async (id: number, nome: string) => {
    const success = await onDelete(id);
    if (success) {
      toast.success(`${nome} foi removido(a)`);
    } else {
      toast.error('Erro ao remover pessoa');
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Pessoas Cadastradas
            </CardTitle>
            <CardDescription className="text-accent-foreground/80">
              {people.length} pessoa{people.length !== 1 ? 's' : ''} no sistema
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRefresh}
            className="text-accent-foreground hover:bg-accent-foreground/10"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-1">(Usando dados de demonstração)</p>
          </div>
        ) : people.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nenhuma pessoa cadastrada ainda</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-center">Idade</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>País</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.nome}</TableCell>
                  <TableCell className="text-center">{person.idade}</TableCell>
                  <TableCell>{person.cidade}</TableCell>
                  <TableCell>{person.pais}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(person.id, person.nome)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
