/**
 * Mapa Page - Vivarium
 * Página de mapa com visual mockado, marcadores de estabelecimentos e pets do usuário
 * Não mostra pets fictícios como usuários reais
 */

import { useState } from 'react';
import { placeService, placeCategories } from '../../services';
import { useAuth, usePets } from '../../contexts';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import PlaceCard from '../../components/map/PlaceCard';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function Mapa() {
  const { isAuthenticated, user } = useAuth();
  const { getUserPets } = usePets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'places', 'animals'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showRouteDemo, setShowRouteDemo] = useState(false);

  const allPlaces = placeService.getAllPlaces();
  // Apenas pets do usuário autenticado - não usa pets fictícios
  const userPets = isAuthenticated && user ? getUserPets(user.id) : [];
  
  const filteredItems = (() => {
    let items = [];

    // Filtra por tipo (estabelecimentos ou animais)
    if (selectedType === 'all' || selectedType === 'places') {
      let places = allPlaces;
      if (selectedCategory !== 'all') {
        places = placeService.getPlacesByCategory(selectedCategory);
      }
      if (searchTerm) {
        places = placeService.searchPlaces(searchTerm);
      }
      items = [...items, ...places.map(p => ({ ...p, type: 'place' }))];
    }

    // Apenas mostra pets do usuário se estiver autenticado e tiver pets
    if ((selectedType === 'all' || selectedType === 'animals') && isAuthenticated && userPets.length > 0) {
      let animals = userPets.map(pet => ({
        ...pet,
        // Adiciona localização mockada se não existir
        coordinates: pet.coordinates || { x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 },
        location: pet.location || 'Localização aproximada',
      }));
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        animals = animals.filter(a =>
          a.name.toLowerCase().includes(term) ||
          (a.breed && a.breed.toLowerCase().includes(term))
        );
      }
      items = [...items, ...animals.map(a => ({ ...a, type: 'animal' }))];
    }

    return items;
  })();

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setSelectedAnimal(null);
  };

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setSelectedPlace(null);
  };

  const handleCloseCard = () => {
    setSelectedPlace(null);
    setSelectedAnimal(null);
  };

  const handleUseLocation = () => {
    // Demonstração visual - não implementa GPS real
    alert('Funcionalidade de localização em desenvolvimento. Esta é uma versão demonstrativa.');
  };

  const handleShowRoute = () => {
    setShowRouteDemo(true);
  };

  return (
    <div style={{ flex: 1 }}>
      {/* Header do Mapa */}
      <div
        className="container"
        style={{
          padding: 'var(--space-2xl) var(--space-lg)',
        }}
      >
        <h1 className="h2 mb-2">Mapa de locais</h1>
        <p className="body text-secondary mb-6">
          Encontre veterinárias, pet shops e outros serviços próximos a você
        </p>

        {/* Busca e Filtros */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar local ou pet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {placeCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="btn"
                  style={{
                    backgroundColor: selectedCategory === category.id
                      ? 'var(--color-primary)'
                      : 'var(--color-surface)',
                    color: selectedCategory === category.id
                      ? 'var(--color-text-inverse)'
                      : 'var(--color-primary)',
                    border: selectedCategory === category.id
                      ? '1px solid var(--color-primary)'
                      : '1px solid var(--color-border)',
                  }}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Filtro de tipo */}
          <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <Button
              variant={selectedType === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              Todos
            </Button>
            <Button
              variant={selectedType === 'places' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('places')}
            >
              Estabelecimentos
            </Button>
            {isAuthenticated && userPets.length > 0 && (
              <Button
                variant={selectedType === 'animals' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('animals')}
              >
                Meus Pets
              </Button>
            )}
          </div>
        </Card>

        {/* Visual Mockado do Mapa */}
        <Card className="mb-6" style={{ minHeight: '400px', position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              backgroundColor: '#0C182B',
              backgroundImage: `
                linear-gradient(rgba(173, 216, 230, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(173, 216, 230, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* Ruas simuladas */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: 0,
                right: 0,
                height: '20px',
                backgroundColor: '#162842',
                border: '1px solid #233E66',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '40%',
                width: '20px',
                backgroundColor: '#162842',
                border: '1px solid #233E66',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '60%',
                left: 0,
                right: 0,
                height: '15px',
                backgroundColor: '#162842',
                border: '1px solid #233E66',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '70%',
                width: '15px',
                backgroundColor: '#162842',
                border: '1px solid #233E66',
              }}
            />

            {/* Marcadores de Estabelecimentos */}
            {filteredItems.filter(item => item.type === 'place').map((place) => (
              <button
                key={place.id}
                onClick={() => handlePlaceClick(place)}
                className="btn-text"
                style={{
                  position: 'absolute',
                  left: `${place.coordinates.x}%`,
                  top: `${place.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  padding: 0,
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
                title={place.name}
              >
                {placeCategories.find(c => c.id === place.category)?.icon || '📍'}
              </button>
            ))}

            {/* Marcadores de Animais (apenas pets do usuário) */}
            {filteredItems.filter(item => item.type === 'animal').map((animal) => (
              <button
                key={animal.id}
                onClick={() => handleAnimalClick(animal)}
                className="btn-text"
                style={{
                  position: 'absolute',
                  left: `${animal.coordinates.x}%`,
                  top: `${animal.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  padding: 0,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
                title={animal.name}
              >
                {animal.photo ? (
                  <img
                    src={animal.photo}
                    alt={animal.name}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-primary)',
                    }}
                  />
                ) : (
                  <span>{animal.species === 'Cachorro' ? '🐕' : '🐱'}</span>
                )}
              </button>
            ))}

            {/* Botão de Localização */}
            <button
              onClick={handleUseLocation}
              className="btn"
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-md)',
              }}
              title="Usar minha localização"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </button>

            {/* Legenda */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                backgroundColor: 'rgba(15, 27, 46, 0.95)',
                color: 'var(--color-text)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: 'var(--font-size-caption)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div className="caption text-muted mb-2">Clique nos marcadores para ver detalhes</div>
              <div className="flex gap-2 flex-wrap">
                {placeCategories.slice(1).map((category) => (
                  <span key={category.id}>
                    {category.icon} {category.name}
                  </span>
                ))}
                {isAuthenticated && userPets.length > 0 && (
                  <span>🐕🐱 Meus Pets</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Lista de Itens */}
        <div className="mb-4">
          <h2 className="h3 mb-4">
            {filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {filteredItems.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Nenhum resultado encontrado"
            description="Tente ajustar os filtros ou a busca para encontrar o que procura."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              item.type === 'place' ? (
                <PlaceCard
                  key={item.id}
                  place={item}
                  onClick={() => handlePlaceClick(item)}
                />
              ) : (
                <Card
                  key={item.id}
                  interactive
                  onClick={() => handleAnimalClick(item)}
                >
                  <div className="flex items-start gap-3">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-md)',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <div className="text-3xl">
                        {item.species === 'Cachorro' ? '🐕' : '🐱'}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="h3 mb-1">{item.name}</h3>
                      <p className="small text-secondary mb-1">
                        {item.species} • {item.breed}
                      </p>
                      <p className="caption text-muted">
                        📍 {item.location}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            ))}
          </div>
        )}

        {/* Modal do Local Selecionado */}
        {selectedPlace && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(5, 12, 22, 0.8)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-md)',
              zIndex: 1000,
            }}
            onClick={handleCloseCard}
          >
            <div
              className="card"
              style={{
                maxWidth: '400px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: 'var(--color-surface-elevated)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="h3">{selectedPlace.name}</h3>
                <button
                  onClick={handleCloseCard}
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
              <PlaceCard place={selectedPlace} />
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleShowRoute}
                >
                  Como chegar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal do Animal Selecionado */}
        {selectedAnimal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(5, 12, 22, 0.8)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-md)',
              zIndex: 1000,
            }}
            onClick={handleCloseCard}
          >
            <div
              className="card"
              style={{
                maxWidth: '400px',
                width: '100%',
                backgroundColor: 'var(--color-surface-elevated)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="h3">{selectedAnimal.name}</h3>
                <button
                  onClick={handleCloseCard}
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
              <div className="text-center mb-4">
                {selectedAnimal.photo ? (
                  <img
                    src={selectedAnimal.photo}
                    alt={selectedAnimal.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: 'var(--radius-full)',
                      objectFit: 'cover',
                      margin: '0 auto var(--space-md)',
                      border: '3px solid var(--color-primary)',
                    }}
                  />
                ) : (
                  <div className="text-6xl mb-3">
                    {selectedAnimal.species === 'Cachorro' ? '🐕' : '🐱'}
                  </div>
                )}
                <p className="small text-secondary mb-1">
                  {selectedAnimal.species} • {selectedAnimal.breed}
                </p>
                <p className="caption text-muted">
                  📍 {selectedAnimal.location}
                </p>
              </div>
              <div className="caption text-muted text-center" style={{ fontStyle: 'italic' }}>
                * Localização aproximada
              </div>
            </div>
          </div>
        )}

        {/* Modal de Demonstração de Rota */}
        {showRouteDemo && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(5, 12, 22, 0.8)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-md)',
              zIndex: 1000,
            }}
            onClick={() => setShowRouteDemo(false)}
          >
            <div
              className="card"
              style={{
                maxWidth: '400px',
                width: '100%',
                backgroundColor: 'var(--color-surface-elevated)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="h3">Como chegar</h3>
                <button
                  onClick={() => setShowRouteDemo(false)}
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
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="body text-secondary mb-4">
                  Funcionalidade de rota em desenvolvimento.
                </p>
                <p className="small text-muted">
                  Em breve você poderá traçar rotas até os estabelecimentos
                  e visualizar a distância e tempo estimado de chegada.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
