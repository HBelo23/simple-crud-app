import { PersonForm } from '@/components/PersonForm';
import { PersonList } from '@/components/PersonList';
import { usePeople } from '@/hooks/usePeople';
import { Database } from 'lucide-react';

const Index = () => {
  const { people, loading, error, addPerson, deletePerson, refetch } = usePeople();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">CRUD Pessoas</h1>
              <p className="text-sm text-muted-foreground">
                Sistema de cadastro em 3 camadas
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Formulário de Cadastro */}
          <PersonForm onSubmit={addPerson} />
          
          {/* Lista de Pessoas */}
          <PersonList 
            people={people} 
            loading={loading} 
            error={error}
            onDelete={deletePerson}
            onRefresh={refetch}
          />
        </div>

        {/* Info Box sobre Docker */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-xl">🐳</span> Como rodar com Docker
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Esta é a interface React. Para o backend funcionar, você precisa criar os arquivos Docker e rodar localmente.
              Veja abaixo a estrutura necessária:
            </p>
            <pre className="bg-card p-4 rounded-md text-xs overflow-x-auto border">
{`📁 projeto/
├── docker-compose.yml
├── 📁 frontend/
│   ├── Dockerfile
│   └── (código React)
├── 📁 backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js`}
            </pre>
            <p className="text-xs text-muted-foreground mt-4">
              Execute: <code className="bg-card px-2 py-1 rounded">docker-compose up --build</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
