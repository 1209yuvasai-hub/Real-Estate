import React from 'react';
import { Heart, Building2, ArrowLeft } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function FavoritesPage({ properties, favoriteIds, onToggleFavorite, onSelect, onContactOwner, onNavigateHome }) {
  const favoriteProperties = properties.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Heart size={28} color="#EF4444" fill="#EF4444" /> Saved Favorite Properties
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved to your personal wishlist.
          </p>
        </div>

        <button className="btn-secondary" onClick={onNavigateHome}>
          <ArrowLeft size={18} /> Browse All Listings
        </button>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="property-grid">
          {favoriteProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelect}
              onContactOwner={onContactOwner}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '3rem auto' }}>
          <Heart size={56} color="#9CA3AF" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Favorite Properties Saved Yet</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Click the heart icon on any property card while browsing to save it to your wishlist for fast access anytime.
          </p>
          <button className="btn-primary" onClick={onNavigateHome}>
            Explore Listings Now
          </button>
        </div>
      )}

    </div>
  );
}
