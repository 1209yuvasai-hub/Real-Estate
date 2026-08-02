import React from 'react';
import { Bed, Bath, Square, MapPin, Heart, Mail, ArrowRight, Car } from 'lucide-react';

export default function PropertyCard({ property, isFavorite, onToggleFavorite, onSelect, onContactOwner }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Image Thumbnail Container */}
      <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
        <img 
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'} 
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Status Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <span className={property.status === 'For Rent' ? 'badge badge-rent' : 'badge badge-sale'}>
            {property.status}
          </span>
          <span className="badge badge-type">
            {property.type}
          </span>
        </div>

        {/* Favorite Heart Toggle */}
        <button 
          className={`btn-icon ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          style={{ position: 'absolute', top: '12px', right: '12px', backdropFilter: 'blur(8px)', cursor: 'pointer' }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart size={18} fill={isFavorite ? "#EF4444" : "none"} color={isFavorite ? "#EF4444" : "#fff"} />
        </button>

        {/* Price Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(11, 15, 25, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '6px 14px',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.15)',
          fontWeight: 800,
          fontSize: '1.2rem',
          color: '#60A5FA'
        }}>
          {formattedPrice} {property.status === 'For Rent' && <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>/mo</span>}
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 
            onClick={() => onSelect(property)}
            style={{ fontSize: '1.15rem', marginBottom: '0.5rem', cursor: 'pointer', lineHeight: '1.3' }}
          >
            {property.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
            <MapPin size={14} color="#3B82F6" />
            <span>{property.location}, {property.city}</span>
          </div>

          {/* Specs Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
              <Bed size={15} color="#60A5FA" />
              <span><strong>{property.bedrooms}</strong> Beds</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
              <Bath size={15} color="#60A5FA" />
              <span><strong>{property.bathrooms}</strong> Baths</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
              <Square size={15} color="#60A5FA" />
              <span><strong>{property.sqft}</strong> sqft</span>
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onSelect(property)}
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '0.6rem 0.8rem' }}
          >
            Details <ArrowRight size={14} />
          </button>
          
          <button 
            className="btn-primary" 
            onClick={() => onContactOwner(property)}
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '0.6rem 0.8rem' }}
          >
            <Mail size={14} /> Contact
          </button>
        </div>

      </div>

    </div>
  );
}
