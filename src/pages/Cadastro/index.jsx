/**
 * Cadastro Page - Vivarium
 * Página de cadastro de usuário com validação completa
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ErrorMessage from '../../components/ui/ErrorMessage';
import {
  validateAndFormatName,
  validateAndFormatEmail,
  validatePassword,
  validatePasswordConfirm,
  validateAndFormatCPF,
  validateAndFormatPhone,
  validateAndFormatCEP,
  trimField,
} from '../../utils/validation';

export default function Cadastro() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redireciona se já estiver autenticado
  if (isAuthenticated) {
    navigate('/perfil');
    return null;
  }

  const validateForm = () => {
    const newErrors = {};

    // Nome
    const nameResult = validateAndFormatName(formData.name);
    if (!nameResult.valid) {
      newErrors.name = 'Nome inválido. Não utilize números.';
    }

    // E-mail
    const emailResult = validateAndFormatEmail(formData.email);
    if (!emailResult.valid) {
      newErrors.email = 'E-mail inválido';
    }

    // CPF
    const cpfResult = validateAndFormatCPF(formData.cpf);
    if (!cpfResult.valid) {
      newErrors.cpf = 'CPF inválido';
    }

    // Telefone
    const phoneResult = validateAndFormatPhone(formData.phone);
    if (!phoneResult.valid) {
      newErrors.phone = 'Telefone inválido';
    }

    // Senha
    const passwordResult = validatePassword(formData.password);
    if (!passwordResult.valid) {
      newErrors.password = passwordResult.message;
    }

    // Confirmação de senha
    const confirmResult = validatePasswordConfirm(formData.password, formData.confirmPassword);
    if (!confirmResult.valid) {
      newErrors.confirmPassword = confirmResult.message;
    }

    // Endereço
    if (!formData.address.cep) {
      newErrors['address.cep'] = 'CEP é obrigatório';
    } else {
      const cepResult = validateAndFormatCEP(formData.address.cep);
      if (!cepResult.valid) newErrors['address.cep'] = 'CEP inválido';
    }

    if (!trimField(formData.address.street)) {
      newErrors['address.street'] = 'Rua é obrigatória';
    }

    if (!trimField(formData.address.number)) {
      newErrors['address.number'] = 'Número é obrigatório';
    }

    if (!trimField(formData.address.neighborhood)) {
      newErrors['address.neighborhood'] = 'Bairro é obrigatório';
    }

    if (!trimField(formData.address.city)) {
      newErrors['address.city'] = 'Cidade é obrigatória';
    }

    if (!trimField(formData.address.state)) {
      newErrors['address.state'] = 'Estado é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
    // Limpa erro do campo ao digitar
    if (errors[`address.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`address.${field}`]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);
    
    // Formata dados antes de enviar
    const formattedName = validateAndFormatName(formData.name).value;
    const formattedEmail = validateAndFormatEmail(formData.email).value;
    const formattedCPF = validateAndFormatCPF(formData.cpf).value;
    const formattedPhone = validateAndFormatPhone(formData.phone).value;
    const formattedCEP = validateAndFormatCEP(formData.address.cep).value;

    const result = await register(formattedName, formattedEmail, formData.password);
    setIsLoading(false);

    if (result.success) {
      // Salvar dados adicionais no localStorage
      const userData = {
        ...result.user,
        cpf: formattedCPF,
        phone: formattedPhone,
        address: {
          ...formData.address,
          cep: formattedCEP,
        },
      };
      localStorage.setItem('vivarium_user_extended', JSON.stringify(userData));
      navigate('/perfil');
    } else {
      setErrors({ form: result.error });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpa erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
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
    
    setFormData(prev => ({ ...prev, cpf: formatted }));
    if (errors.cpf) setErrors(prev => ({ ...prev, cpf: '' }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (value.length > 0) {
      formatted = '(' + value.substring(0, 2);
      if (value.length > 2) formatted += ') ' + value.substring(2, 7);
      if (value.length > 7) formatted += '-' + value.substring(7, 11);
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleCEPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (value.length > 0) {
      formatted = value.substring(0, 5);
      if (value.length > 5) formatted += '-' + value.substring(5, 8);
    }
    
    handleAddressChange('cep', formatted);
  };

  return (
    <div
      className="container"
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-2xl) var(--space-lg)',
      }}
    >
      <Card style={{ maxWidth: '600px', width: '100%' }}>
        <div className="text-center mb-6">
          <h1 className="h2 mb-2">Criar conta</h1>
          <p className="small text-secondary">
            Junte-se à Vivarium e cuide melhor dos seus pets
          </p>
        </div>

        {errors.form && <ErrorMessage message={errors.form} onDismiss={() => setErrors({})} />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Dados Pessoais */}
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <h3 className="h3 mb-4" style={{ fontSize: 'var(--font-size-body)' }}>Dados Pessoais</h3>
            
            <Input
              label="Nome completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              autoComplete="name"
              error={errors.name}
            />

            <Input
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              autoComplete="email"
              error={errors.email}
            />

            <Input
              label="CPF"
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
              maxLength={14}
              error={errors.cpf}
            />

            <Input
              label="Telefone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(41) 99664-7762"
              maxLength={15}
              error={errors.phone}
            />
          </div>

          {/* Endereço */}
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <h3 className="h3 mb-4" style={{ fontSize: 'var(--font-size-body)' }}>Endereço</h3>
            
            <Input
              label="CEP"
              type="text"
              value={formData.address.cep}
              onChange={handleCEPChange}
              placeholder="80000-000"
              maxLength={9}
              error={errors['address.cep']}
            />

            <Input
              label="Rua"
              type="text"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="Nome da rua"
              error={errors['address.street']}
            />

            <div className="flex gap-3">
              <Input
                label="Número"
                type="text"
                value={formData.address.number}
                onChange={(e) => handleAddressChange('number', e.target.value)}
                placeholder="123"
                error={errors['address.number']}
                style={{ flex: 1 }}
              />
              <Input
                label="Complemento"
                type="text"
                value={formData.address.complement}
                onChange={(e) => handleAddressChange('complement', e.target.value)}
                placeholder="Apto, bloco..."
                style={{ flex: 2 }}
              />
            </div>

            <Input
              label="Bairro"
              type="text"
              value={formData.address.neighborhood}
              onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
              placeholder="Nome do bairro"
              error={errors['address.neighborhood']}
            />

            <div className="flex gap-3">
              <Input
                label="Cidade"
                type="text"
                value={formData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                placeholder="Nome da cidade"
                error={errors['address.city']}
                style={{ flex: 2 }}
              />
              <Input
                label="Estado"
                type="text"
                value={formData.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                placeholder="PR"
                maxLength={2}
                error={errors['address.state']}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <h3 className="h3 mb-4" style={{ fontSize: 'var(--font-size-body)' }}>Senha</h3>
            
            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              error={errors.password}
              helperText="A senha deve ter pelo menos 6 caracteres"
            />

            <Input
              label="Confirmar senha"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              autoComplete="new-password"
              error={errors.confirmPassword}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            fullWidth
          >
            Criar conta
          </Button>
        </form>

        <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="small text-secondary mb-3">
            Já tem uma conta?
          </p>
          <Link to="/login">
            <Button variant="secondary" fullWidth>
              Entrar
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
