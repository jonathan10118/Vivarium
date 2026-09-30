/**
 * Componente PlaceCard
 * Exibe informações de um local no mapa
 */

import Card from '../ui/Card';

const categoryIcons = {
  veterinary: '🏥',
  petshop: '🛒',
  grooming: '✂️',
  hotel: '🏨',
  pharmacy: '💊',
};

const categoryNames = {
  veterinary: 'Veterinária',
  petshop: 'Pet Shop',
  grooming: 'Banho & Tosa',
  hotel: 'Hotel Pet',
  pharmacy: 'Farmácia',
};

export default function PlaceCard({ place, onClick }) {
  const icon = categoryIcons[place.category] || '📍';
  const categoryName = categoryNames[place.category] || place.category;

  return (
    <Card interactive={!!onClick} onClick={onClick}>
      <div className="flex items-start gap-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="h3 mb-1">{place.name}</h3>
          <p className="small text-secondary mb-2">
            {categoryName}
          </p>
          <p className="caption text-muted mb-1">
            📍 {place.address}
          </p>
          <p className="caption text-muted mb-1">
            📞 {place.phone}
          </p>
          <p className="caption text-muted mb-2">
            🕐 {place.hours}
          </p>
          <div className="flex items-center gap-1">
            <span style={{ color: '#F59E0B' }}>★</span>
            <span className="small font-medium">{place.rating}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
