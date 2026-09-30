/**
 * Componente Input reutilizável
 * Suporta label, error, helper text e diferentes tipos
 */

export default function Input({
  label,
  error,
  helperText,
  type = 'text',
  id,
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input ${hasError ? 'has-error' : ''} ${className}`.trim()}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {hasError && (
        <span id={`${inputId}-error`} className="error-text">
          {error}
        </span>
      )}
      {helperText && !hasError && (
        <span id={`${inputId}-helper`} className="helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}
