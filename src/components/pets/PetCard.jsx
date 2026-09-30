/**
 * Componente PetCard
 * Exibe informações de um pet em formato de card
 */

import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';

export default function PetCard({ pet, onClick }) {
  const speciesIcon = pet.species === 'dog' ? '🐕' : '🐱';
  const speciesName = pet.species === 'dog' ? 'Cachorro' : 'Gato';
  const sexIcon = pet.sex === 'male' ? '♂' : '♀';
  const sexName = pet.sex === 'male' ? 'Macho' : 'Fêmea';

  const content = (
    <Card interactive={!!onClick} onClick={onClick}>
      <div className="flex items-start gap-4">
        <Avatar
          src={pet.photo}
          name={pet.name}
          size="lg"
          alt={pet.name}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{speciesIcon}</span>
            <h3 className="h3">{pet.name}</h3>
          </div>
          <p className="small text-secondary mb-1">
            {speciesName} • {sexName} {sexIcon} • {pet.age} ano{pet.age !== 1 ? 's' : ''}
          </p>
          {pet.breed && (
            <p className="caption text-muted">
              Raça: {pet.breed}
            </p>
          )}
        </div>
      </div>
    </Card>
  );

  if (onClick) {
    return content;
  }

  return <Link to={`/pets/${pet.id}`}>{content}</Link>;
}

// Import Card para uso interno
import Card from '../ui/Card';
