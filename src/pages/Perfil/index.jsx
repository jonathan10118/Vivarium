/**
 * Perfil Page - Vivarium
 * Página de perfil do usuário com lista de pets e dados completos
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, usePets } from '../../contexts';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import PetCard from '../../components/pets/PetCard';
import EmptyState from '../../components/ui/EmptyState';
import Input from '../../components/ui/Input';
import {
  validateAndFormatName,
  validateAndFormatEmail,
  validateAndFormatCPF,
  validateAndFormatPhone,
  validateAndFormatCEP,
} from '../../utils/validation';

export default function Perfil() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateUser, getExtendedUserData } = useAuth();
  const { getUserPets } = usePets();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  });
  const [isSaving, setIsSaving] = useState(false);

  // Redireciona se não estiver autenticado
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const extendedData = getExtendedUserData();
  const userPets = getUserPets(user.id);

  const handleEdit = () => {
    setEditData({
      name: user.name || '',
      email: user.email || '',
      cpf: user.cpf || extendedData.cpf || '',
      phone: user.phone || extendedData.phone || '',
      address: {
        cep: user.address?.cep || extendedData.address?.cep || '',
        street: user.address?.street || extendedData.address?.street || '',
        number: user.address?.number || extendedData.address?.number || '',
        complement:
          user.address?.complement || extendedData.address?.complement || '',
        neighborhood:
          user.address?.neighborhood ||
          extendedData.address?.neighborhood ||
          '',
        city: user.address?.city || extendedData.address?.city || '',
        state: user.address?.state || extendedData.address?.state || '',
      },
    });

    setIsEditing(true);
  };

    const handleSaveProfile = async () => {
    setIsSaving(true);

    const formattedName = validateAndFormatName(editData.name).value;
    const formattedEmail = validateAndFormatEmail(editData.email).value;
    const formattedCPF = validateAndFormatCPF(editData.cpf).value;
    const formattedPhone = validateAndFormatPhone(editData.phone).value;
    const formattedCEP = validateAndFormatCEP(editData.address.cep).value;

    const result = await updateUser({
      name: formattedName,
      email: formattedEmail,
      cpf: formattedCPF,
      phone: formattedPhone,
      address: {
        ...editData.address,
        cep: formattedCEP,
      },
    });

    setIsSaving(false);

    if (result.success) {
      setIsEditing(false);
    }
  };


  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCPFChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (value.length > 0) {
      formatted = value.substring(0, 3);
      if (value.length > 3) formatted += '.' + value.substring(3, 6);
      if (value.length > 6) formatted += '.' + value.substring(6, 9);
      if (value.length > 9) formatted += '-' + value.substring(9, 11);
    }

    setEditData(prev => ({ ...prev, cpf: formatted }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (value.length > 0) {
      formatted = '(' + value.substring(0, 2);
      if (value.length > 2) formatted += ') ' + value.substring(2, 7);
      if (value.length > 7) formatted += '-' + value.substring(7, 11);
    }

    setEditData(prev => ({ ...prev, phone: formatted }));
  };

  const handleCEPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (value.length > 0) {
      formatted = value.substring(0, 5);
      if (value.length > 5) formatted += '-' + value.substring(5, 8);
    }

    setEditData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        cep: formatted,
      },
    }));
  };

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: 'var(--space-2xl) var(--space-lg)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header do Perfil */}
        <div className="mb-8">
          <h1 className="h2 mb-2">Meu perfil</h1>
          <p className="body text-secondary">
            Gerencie suas informações e seus pets
          </p>
        </div>

        {/* Card de Informações do Usuário */}
        <Card className="mb-8">
          <div className="flex items-start gap-6">
            <Avatar
              src={user.avatar}
              name={user.name}
              size="xl"
            />

            <div className="flex-1">
              {isEditing ? (
                <div className="flex flex-col gap-4">

                  <h3
                    className="h3 mb-4"
                    style={{ fontSize: 'var(--font-size-body)' }}
                  >
                    Dados Pessoais
                  </h3>

                  <Input
                    label="Nome"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    label="E-mail"
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        email: e.target.value,
                      })
                    }
                  />

                  <Input
                    label="CPF"
                    value={editData.cpf}
                    onChange={handleCPFChange}
                    maxLength={14}
                  />

                  <Input
                    label="Telefone"
                    value={editData.phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                  />

                  <h3
                    className="h3 mb-4 mt-4"
                    style={{ fontSize: 'var(--font-size-body)' }}
                  >
                    Endereço
                  </h3>

                  <Input
                    label="CEP"
                    value={editData.address.cep}
                    onChange={handleCEPChange}
                    maxLength={9}
                  />

                  <Input
                    label="Rua"
                    value={editData.address.street}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        address: {
                          ...editData.address,
                          street: e.target.value,
                        },
                      })
                    }
                  />

                  <div className="flex gap-3">
                    <Input
                      label="Número"
                      value={editData.address.number}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: {
                            ...editData.address,
                            number: e.target.value,
                          },
                        })
                      }
                      style={{ flex: 1 }}
                    />

                    <Input
                      label="Complemento"
                      value={editData.address.complement}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: {
                            ...editData.address,
                            complement: e.target.value,
                          },
                        })
                      }
                      style={{ flex: 2 }}
                    />
                  </div>

                  <Input
                    label="Bairro"
                    value={editData.address.neighborhood}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        address: {
                          ...editData.address,
                          neighborhood: e.target.value,
                        },
                      })
                    }
                  />

                  <div className="flex gap-3">
                    <Input
                      label="Cidade"
                      value={editData.address.city}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: {
                            ...editData.address,
                            city: e.target.value,
                          },
                        })
                      }
                      style={{ flex: 2 }}
                    />

                    <Input
                      label="Estado"
                      value={editData.address.state}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: {
                            ...editData.address,
                            state: e.target.value,
                          },
                        })
                      }
                      maxLength={2}
                      style={{ flex: 1 }}
                    />
                  </div>

                  <div
                    className="flex gap-2 pt-4"
                    style={{
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      isLoading={isSaving}
                    >
                      Cancelar
                    </Button>

                    <Button
                      variant="primary"
                      onClick={handleSaveProfile}
                      isLoading={isSaving}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="h3 mb-1">{user.name}</h2>

                  <p className="small text-secondary mb-2">
                    {user.email}
                  </p>

                  {extendedData.cpf && (
                    <p className="small text-secondary mb-1">
                      <strong>CPF:</strong> {extendedData.cpf}
                    </p>
                  )}

                  {extendedData.phone && (
                    <p className="small text-secondary mb-1">
                      <strong>Telefone:</strong> {extendedData.phone}
                    </p>
                  )}

                  {extendedData.address && (
                    <p className="small text-secondary mb-2">
                      <strong>Endereço:</strong>{' '}
                      {extendedData.address.street},{' '}
                      {extendedData.address.number}

                      {extendedData.address.complement &&
                        ` - ${extendedData.address.complement}`}

                      <br />

                      {extendedData.address.neighborhood} -{' '}
                      {extendedData.address.city}/
                      {extendedData.address.state}

                      {extendedData.address.cep &&
                        ` - CEP: ${extendedData.address.cep}`}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="caption text-muted">
                      Membro desde:{' '}
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('pt-BR')
                        : 'Data não informada'}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                    >
                      Editar perfil
                    </Button>

                    <Button
                      variant="text"
                      size="sm"
                      onClick={handleLogout}
                    >
                      Sair
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Seção de Pets */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="h3">
            Meus pets ({userPets.length})
          </h2>

          <Link to="/pets/novo">
            <Button variant="primary" size="sm">
              + Cadastrar novo pet
            </Button>
          </Link>
        </div>

        {userPets.length === 0 ? (
          <EmptyState
            icon="🐕"
            title="Nenhum pet cadastrado"
            description="Comece adicionando seu primeiro pet para acompanhar todas as informações."
            action={
              <Link to="/pets/novo">
                <Button variant="primary">
                  Cadastrar primeiro pet
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userPets.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}