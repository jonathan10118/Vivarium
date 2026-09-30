/**
 * CadastroPet Page - Vivarium
 * Página de cadastro de pet com sexo e raças pré-cadastradas
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, usePets } from '../../contexts';
import { getBreedsBySpecies } from '../../data';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function CadastroPet() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createPet } = usePets();
  
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog',
    sex: 'male',
    breed: '',
    age: '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redireciona se não estiver autenticado
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const availableBreeds = getBreedsBySpecies(formData.species);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do pet é obrigatório';
    }

    if (!formData.species) {
      newErrors.species = 'Espécie é obrigatória';
    }

    if (!formData.sex) {
      newErrors.sex = 'Sexo é obrigatório';
    }

    if (!formData.breed) {
      newErrors.breed = 'Raça é obrigatória';
    }

    if (!formData.age) {
      newErrors.age = 'Idade é obrigatória';
    } else if (parseInt(formData.age) < 0 || parseInt(formData.age) > 30) {
      newErrors.age = 'Idade deve ser entre 0 e 30 anos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Valida tipo do arquivo
      if (!file.type.startsWith('image/')) {
        setErrors({ photo: 'Por favor, selecione uma imagem' });
        return;
      }

      // Valida tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ photo: 'A imagem deve ter no máximo 5MB' });
        return;
      }

      // Cria preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
      
      // Limpa erro de foto
      if (errors.photo) {
        setErrors(prev => ({ ...prev, photo: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);
    const petData = {
      name: formData.name.trim(),
      species: formData.species,
      sex: formData.sex,
      breed: formData.breed,
      age: parseInt(formData.age),
      photo: photoPreview,
      userId: user.id,
    };

    const result = await createPet(petData);
    setIsLoading(false);

    if (result.success) {
      navigate('/perfil');
    } else {
      setErrors({ form: 'Erro ao cadastrar pet. Tente novamente.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Se mudar a espécie, limpa a raça
    if (name === 'species') {
      setFormData(prev => ({ ...prev, breed: '' }));
    }
    
    // Limpa erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const speciesOptions = [
    { value: 'dog', label: '🐕 Cachorro' },
    { value: 'cat', label: '🐱 Gato' },
  ];

  const sexOptions = [
    { value: 'male', label: 'Macho' },
    { value: 'female', label: 'Fêmea' },
  ];

  return (
    <div
      className="container"
      style={{
        flex: 1,
        padding: 'var(--space-2xl) var(--space-lg)',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="mb-6">
          <h1 className="h2 mb-2">Cadastrar novo pet</h1>
          <p className="body text-secondary">
            Adicione informações sobre seu novo companheiro
          </p>
        </div>

        <Card>
          {errors.form && <ErrorMessage message={errors.form} onDismiss={() => setErrors({})} />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Foto do Pet */}
            <div>
              <label className="label mb-2 block">Foto do pet</label>
              <div className="flex items-start gap-4">
                <Avatar
                  src={photoPreview}
                  name={formData.name || 'Pet'}
                  size="xl"
                />
                <div className="flex-1">
                  <input
                    type="file"
                    id="pet-photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="pet-photo"
                    className="btn btn-secondary"
                    style={{ cursor: 'pointer' }}
                  >
                    Escolher foto
                  </label>
                  {errors.photo && (
                    <p className="error-text mt-2">{errors.photo}</p>
                  )}
                  <p className="helper-text mt-2">
                    Formatos aceitos: JPG, PNG. Máximo 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Espécie */}
            <Select
              label="Espécie"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              error={errors.species}
            >
              {speciesOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            {/* Sexo */}
            <Select
              label="Sexo"
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              error={errors.sex}
            >
              {sexOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            {/* Raça */}
            <Select
              label="Raça"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              error={errors.breed}
            >
              <option value="">Selecione a raça</option>
              {availableBreeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </Select>

            {/* Nome */}
            <Input
              label="Nome do pet"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Thor, Luna, Max..."
              error={errors.name}
            />

            {/* Idade */}
            <Input
              label="Idade (anos)"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ex: 3"
              min="0"
              max="30"
              error={errors.age}
            />

            {/* Botões */}
            <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/perfil')}
                fullWidth
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                fullWidth
              >
                Cadastrar pet
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
