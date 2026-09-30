/**
 * Componente Modal reutilizável
 * Suporta título, conteúdo e ações customizáveis
 */

import { useEffect } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(5, 12, 22, 0.8)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`card ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
        style={{
          backgroundColor: 'var(--color-surface-elevated)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="card-header flex items-center justify-between">
            <h2 id="modal-title" className="h2">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="btn-text"
              aria-label="Fechar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
        <div className="card-body">
          {children}
        </div>
        {actions && (
          <div className="card-footer flex justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
