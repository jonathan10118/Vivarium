/**
 * Componente Avatar reutilizável
 * Suporta imagem, iniciais e diferentes tamanhos
 */

export default function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarClasses = [
    'flex items-center justify-center rounded-full bg-secondary text-primary font-semibold overflow-hidden',
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={avatarClasses}
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <div className={avatarClasses}>
      {getInitials(name)}
    </div>
  );
}
