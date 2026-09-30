/**
 * Componente Card reutilizável
 * Suporta header, body e footer customizáveis
 */

export default function Card({
  children,
  className = '',
  interactive = false,
  ...props
}) {
  return (
    <div
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`card-header ${className}`.trim()}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`card-body ${className}`.trim()}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`card-footer ${className}`.trim()}>{children}</div>;
};
