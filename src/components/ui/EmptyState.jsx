/**
 * Componente EmptyState reutilizável
 * Exibe estado vazio com ícone e mensagem
 */

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 ${className}`.trim()}
    >
      {icon && (
        <div
          className="mb-4 text-6xl"
          style={{ opacity: 0.5 }}
        >
          {icon}
        </div>
      )}
      {title && (
        <h3 className="h3 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          {title}
        </h3>
      )}
      {description && (
        <p className="body mb-4" style={{ color: 'var(--color-text-muted)' }}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
