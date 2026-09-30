/**
 * PerfilPet Page - Vivarium
 * Página de perfil do pet (dinâmica por ID)
 */

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth, usePets } from '../../contexts';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function PerfilPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getPetById, updatePet, deletePet } = usePets();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    age: '',
    breed: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redireciona se não estiver autenticado
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const pet = getPetById(id);

  // Redireciona se pet não existir
  if (!pet) {
    navigate('/perfil');
    return null;
  }

  // Verifica se o pet pertence ao usuário
  if (pet.userId !== user.id) {
    navigate('/perfil');
    return null;
  }

  const speciesIcon = pet.species === 'dog' ? '🐕' : '🐱';
  const speciesName = pet.species === 'dog' ? 'Cachorro' : 'Gato';
  const sexIcon = pet.sex === 'male' ? '♂' : '♀';
  const sexName = pet.sex === 'male' ? 'Macho' : 'Fêmea';

  const handleEdit = () => {
    setEditData({
      name: pet.name,
      age: pet.age,
      breed: pet.breed || '',
    });
    setIsEditing(true);
    setError('');
  };

  const handleSaveEdit = async () => {
    if (!editData.name.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    setIsLoading(true);
    const result = await updatePet(pet.id, {
      name: editData.name.trim(),
      age: parseInt(editData.age),
      breed: editData.breed.trim(),
    });
    setIsLoading(false);

    if (result.success) {
      setIsEditing(false);
      setError('');
    } else {
      setError('Erro ao atualizar pet');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deletePet(pet.id);
    setIsLoading(false);

    if (result.success) {
      setShowDeleteModal(false);
      navigate('/perfil');
    } else {
      setError('Erro ao excluir pet');
    }
  };

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: 'var(--space-2xl) var(--space-lg)',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="text" onClick={() => navigate('/perfil')}>
            ← Voltar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              Editar
            </Button>
            <Button
              variant="text"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              style={{ color: 'var(--color-error)' }}
            >
              Excluir
            </Button>
          </div>
        </div>

        {/* Card Principal */}
        <Card>
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-4">
                <Avatar
                  src={pet.photo}
                  name={pet.name}
                  size="xl"
                />
              </div>
              
              <div>
                <label className="label mb-2 block">Nome</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="label mb-2 block">Idade (anos)</label>
                <input
                  type="number"
                  value={editData.age}
                  onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                  className="input"
                  min="0"
                  max="30"
                />
              </div>

              <div>
                <label className="label mb-2 block">Raça</label>
                <input
                  type="text"
                  value={editData.breed}
                  onChange={(e) => setEditData({ ...editData, breed: e.target.value })}
                  className="input"
                  placeholder="Raça do pet"
                />
              </div>

              <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveEdit}
                  isLoading={isLoading}
                >
                  Salvar alterações
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Foto */}
              <div className="flex-shrink-0">
                <Avatar
                  src={pet.photo}
                  name={pet.name}
                  size="xl"
                />
              </div>

              {/* Informações */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{speciesIcon}</span>
                  <h1 className="h2">{pet.name}</h1>
                </div>

                <div className="space-y-2">
                  <p className="small text-secondary">
                    <strong>Espécie:</strong> {speciesName}
                  </p>
                  <p className="small text-secondary">
                    <strong>Sexo:</strong> {sexName} {sexIcon}
                  </p>
                  <p className="small text-secondary">
                    <strong>Idade:</strong> {pet.age} ano{pet.age !== 1 ? 's' : ''}
                  </p>
                  {pet.breed && (
                    <p className="small text-secondary">
                      <strong>Raça:</strong> {pet.breed}
                    </p>
                  )}
                  <p className="caption text-muted">
                    <strong>Cadastrado em:</strong>{' '}
                    {new Date(pet.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Modal de Confirmação de Exclusão */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirmar exclusão"
          size="sm"
          actions={
            <>
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleDelete}
                isLoading={isLoading}
                style={{ backgroundColor: 'var(--color-error)' }}
              >
                Confirmar exclusão
              </Button>
            </>
          }
        >
          <p className="body text-secondary">
            Tem certeza que deseja excluir <strong>{pet.name}</strong>? Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  );
}
