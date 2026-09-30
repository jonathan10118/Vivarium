/**
 * Componente Textarea reutilizável
 * Suporta label, error, helper text e tamanho
 */

export default function Textarea({
  label,
  error,
  helperText,
  id,
  rows = 4,
  className = '',
  ...props
}) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={textareaId} className="label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`input ${hasError ? 'has-error' : ''} ${className}`.trim()}
        style={{ resize: 'vertical', minHeight: 'var(--control-height)' }}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
        {...props}
      />
      {hasError && (
        <span id={`${textareaId}-error`} className="error-text">
          {error}
        </span>
      )}
      {helperText && !hasError && (
        <span id={`${textareaId}-helper`} className="helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}
