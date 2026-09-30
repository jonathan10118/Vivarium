/**
 * Componente Select reutilizável
 * Suporta label, error, helper text e opções
 */

export default function Select({
  label,
  error,
  helperText,
  id,
  className = '',
  children,
  ...props
}) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={selectId} className="label">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`input ${hasError ? 'has-error' : ''} ${className}`.trim()}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
        }
        {...props}
      >
        {children}
      </select>
      {hasError && (
        <span id={`${selectId}-error`} className="error-text">
          {error}
        </span>
      )}
      {helperText && !hasError && (
        <span id={`${selectId}-helper`} className="helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}
