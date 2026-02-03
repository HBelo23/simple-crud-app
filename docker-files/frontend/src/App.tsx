import { useState, useEffect } from 'react'
import { Plus, Trash2, Users, UserPlus } from 'lucide-react'

interface Person {
  id: number
  nome: string
  idade: number
  cidade: string
  pais: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function App() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list')
  
  // Form state
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [cidade, setCidade] = useState('')
  const [pais, setPais] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchPeople = async () => {
    try {
      const response = await fetch(`${API_URL}/pessoas`)
      if (response.ok) {
        const data = await response.json()
        setPeople(data)
      }
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || !idade || !cidade || !pais) return

    setSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/pessoas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, idade: parseInt(idade), cidade, pais }),
      })

      if (response.ok) {
        setNome('')
        setIdade('')
        setCidade('')
        setPais('')
        fetchPeople()
        setActiveTab('list')
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir?')) return

    try {
      const response = await fetch(`${API_URL}/pessoas/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPeople()
      }
    } catch (error) {
      console.error('Erro ao excluir:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📋 CRUD de Pessoas
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users size={20} />
            Ver Cadastros
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserPlus size={20} />
            Novo Cadastro
          </button>
        </div>

        {/* Content */}
        {activeTab === 'form' ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Cadastrar Pessoa</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idade
                </label>
                <input
                  type="number"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  placeholder="Digite a idade"
                  min="0"
                  max="150"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Digite a cidade"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  País
                </label>
                <input
                  type="text"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  placeholder="Digite o país"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Plus size={20} />
                {submitting ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-xl font-semibold">
                Pessoas Cadastradas ({people.length})
              </h2>
            </div>
            {loading ? (
              <div className="p-8 text-center text-gray-500">Carregando...</div>
            ) : people.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nenhuma pessoa cadastrada ainda.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Idade
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Cidade
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      País
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{person.nome}</td>
                      <td className="px-4 py-3 text-gray-600">{person.idade}</td>
                      <td className="px-4 py-3 text-gray-600">{person.cidade}</td>
                      <td className="px-4 py-3 text-gray-600">{person.pais}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(person.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
