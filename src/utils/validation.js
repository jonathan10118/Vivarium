/**
 * Utilitários de validação e formatação de campos
 */

/**
 * Valida e formata nome
 */
export const validateAndFormatName = (name) => {
  if (!name || typeof name !== 'string') return { valid: false, value: '' };
  
  // Remove espaços extras
  const trimmed = name.trim();
  
  // Verifica se está vazio
  if (trimmed.length === 0) return { valid: false, value: '' };
  
  // Verifica se contém números
  if (/\d/.test(trimmed)) return { valid: false, value: trimmed };
  
  // Formata: primeira letra maiúscula, resto minúscula
  const formatted = trimmed
    .split(' ')
    .map(word => {
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
  
  return { valid: true, value: formatted };
};

/**
 * Valida e formata e-mail
 */
export const validateAndFormatEmail = (email) => {
  if (!email || typeof email !== 'string') return { valid: false, value: '' };
  
  // Remove espaços
  const trimmed = email.trim().toLowerCase();
  
  // Valida formato básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return { valid: false, value: trimmed };
  
  return { valid: true, value: trimmed };
};

/**
 * Valida senha
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return { valid: false, message: 'Senha é obrigatória' };
  
  if (password.length < 6) return { valid: false, message: 'A senha deve ter pelo menos 6 caracteres' };
  
  return { valid: true };
};

/**
 * Valida confirmação de senha
 */
export const validatePasswordConfirm = (password, confirmPassword) => {
  if (!confirmPassword) return { valid: false, message: 'Confirmação de senha é obrigatória' };
  
  if (password !== confirmPassword) return { valid: false, message: 'As senhas não coincidem' };
  
  return { valid: true };
};

/**
 * Valida e formata CPF
 */
export const validateAndFormatCPF = (cpf) => {
  if (!cpf || typeof cpf !== 'string') return { valid: false, value: '' };
  
  // Remove tudo que não é número
  const numbersOnly = cpf.replace(/\D/g, '');
  
  // Verifica quantidade de números
  if (numbersOnly.length !== 11) return { valid: false, value: numbersOnly };
  
  // Verifica se todos os números são iguais
  if (/^(\d)\1+$/.test(numbersOnly)) return { valid: false, value: numbersOnly };
  
  // Aplica máscara
  const formatted = numbersOnly.replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  
  return { valid: true, value: formatted };
};

/**
 * Valida e formata telefone
 */
export const validateAndFormatPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return { valid: false, value: '' };
  
  // Remove tudo que não é número
  const numbersOnly = phone.replace(/\D/g, '');
  
  // Verifica quantidade de números (10 ou 11)
  if (numbersOnly.length < 10 || numbersOnly.length > 11) {
    return { valid: false, value: numbersOnly };
  }
  
  // Aplica máscara
  const formatted = numbersOnly.replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
  
  return { valid: true, value: formatted };
};

/**
 * Valida e formata CEP
 */
export const validateAndFormatCEP = (cep) => {
  if (!cep || typeof cep !== 'string') return { valid: false, value: '' };
  
  // Remove tudo que não é número
  const numbersOnly = cep.replace(/\D/g, '');
  
  // Verifica quantidade de números
  if (numbersOnly.length !== 8) return { valid: false, value: numbersOnly };
  
  // Aplica máscara
  const formatted = numbersOnly.replace(/(\d{5})(\d)/, '$1-$2');
  
  return { valid: true, value: formatted };
};

/**
 * Valida número
 */
export const validateNumber = (value, min = 0, max = Infinity) => {
  if (value === '' || value === null || value === undefined) {
    return { valid: false, message: 'Campo obrigatório' };
  }
  
  const num = parseInt(value, 10);
  
  if (isNaN(num)) return { valid: false, message: 'Valor inválido' };
  
  if (num < min) return { valid: false, message: `Valor mínimo é ${min}` };
  
  if (num > max) return { valid: false, message: `Valor máximo é ${max}` };
  
  return { valid: true, value: num };
};

/**
 * Valida campo numérico
 */
export const validateNumericField = (value) => {
  if (value === '' || value === null || value === undefined) {
    return { valid: false, message: 'Campo obrigatório' };
  }
  
  // Verifica se contém apenas números
  if (!/^\d+$/.test(value.toString())) {
    return { valid: false, message: 'Este campo deve conter apenas números' };
  }
  
  return { valid: true };
};

/**
 * Remove espaços desnecessários
 */
export const trimField = (value) => {
  if (typeof value !== 'string') return value;
  return value.trim();
};
