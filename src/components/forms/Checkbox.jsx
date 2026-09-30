/**
 * Componente Checkbox reutilizável
 */

export default function Checkbox({
  label,
  checked,
  onChange,
  id,
  error,
  className = '',
}) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className={`flex items-start gap-2 ${className}`.trim()}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1"
        style={{
          width: '18px',
          height: '18px',
          accentColor: 'var(--color-primary)',
        }}
        aria-invalid={hasError}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="small text-secondary cursor-pointer"
          style={{ lineHeight: '1.4' }}
        >
          {label}
        </label>
      )}
      {hasError && (
        <span className="error-text">{error}</span>
      )}
    </div>
  );
}
