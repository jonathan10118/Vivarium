/**
 * Componente Notifications
 * Sistema de notificações mockado do Vivarium
 */

import { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

const mockNotifications = [
  {
    id: 1,
    message: 'Uma clínica veterinária foi encontrada próxima de você.',
    type: 'info',
    time: '5 min atrás',
  },
  {
    id: 2,
    message: 'Seu pet foi cadastrado com sucesso.',
    type: 'success',
    time: '10 min atrás',
  },
  {
    id: 3,
    message: 'Existem estabelecimentos pet próximos.',
    type: 'info',
    time: '15 min atrás',
  },
];

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <Button
        variant="text"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notificações"
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
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span
            className="absolute"
            style={{
              top: '-2px',
              right: '-2px',
              width: '18px',
              height: '18px',
              backgroundColor: 'var(--color-error)',
              color: 'white',
              borderRadius: '50%',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 z-50"
          style={{
            width: '320px',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="h3">Notificações</h3>
              <Button
                variant="text"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Fechar
              </Button>
            </div>

            {notifications.length === 0 ? (
              <p className="small text-muted text-center py-4">
                Nenhuma notificação
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 rounded"
                    style={{
                      backgroundColor: notification.type === 'success'
                        ? 'var(--color-success-bg)'
                        : 'var(--color-secondary)',
                      borderLeft: `3px solid ${
                        notification.type === 'success'
                          ? 'var(--color-success)'
                          : 'var(--color-primary)'
                      }`,
                    }}
                  >
                    <p className="small text-secondary mb-1">
                      {notification.message}
                    </p>
                    <p className="caption text-muted">{notification.time}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
