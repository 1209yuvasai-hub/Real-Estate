import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminPage from './pages/AdminPage';
import InquiryModal from './components/InquiryModal';
import AdminPropertyModal from './components/AdminPropertyModal';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'detail' | 'favorites' | 'admin'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [inquiryProperty, setInquiryProperty] = useState(null);
  const [adminModalProperty, setAdminModalProperty] = useState(null); // null = add, object = edit
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(0);

  // All properties cached for favorites
  const [allProperties, setAllProperties] = useState([]);

  // Favorites state persisted in LocalStorage
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('favorite_properties');
      return saved ? JSON.parse(saved) : ['prop_101', 'prop_102'];
    } catch {
      return ['prop_101', 'prop_102'];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorite_properties', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Load all properties for wishlist view
  useEffect(() => {
    api.getProperties()
      .then(res => setAllProperties(res.data || []))
      .catch(err => console.error(err));
  }, [refreshSignal]);

  // Toggle favorite ID
  const handleToggleFavorite = (id) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Open property detail view
  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save property (Admin create/edit)
  const handleSaveProperty = async (propertyData) => {
    if (adminModalProperty) {
      await api.updateProperty(adminModalProperty.id, propertyData);
    } else {
      await api.createProperty(propertyData);
    }
    setRefreshSignal(prev => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favoriteIds.length}
        onOpenAddProperty={() => {
          setAdminModalProperty(null);
          setShowAdminModal(true);
        }}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        
        {activeTab === 'home' && (
          <HomePage 
            onSelectProperty={handleSelectProperty}
            onContactOwner={(property) => setInquiryProperty(property)}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'detail' && selectedProperty && (
          <PropertyDetailPage 
            property={selectedProperty}
            onBack={() => setActiveTab('home')}
            onContactOwner={(property) => setInquiryProperty(property)}
            isFavorite={favoriteIds.includes(selectedProperty.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage 
            properties={allProperties}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onSelect={handleSelectProperty}
            onContactOwner={(property) => setInquiryProperty(property)}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPage 
            onOpenAddProperty={() => {
              setAdminModalProperty(null);
              setShowAdminModal(true);
            }}
            onEditProperty={(property) => {
              setAdminModalProperty(property);
              setShowAdminModal(true);
            }}
            refreshSignal={refreshSignal}
          />
        )}

      </main>

      {/* Buyer Contact Owner Modal */}
      {inquiryProperty && (
        <InquiryModal 
          property={inquiryProperty}
          onClose={() => setInquiryProperty(null)}
        />
      )}

      {/* Admin Add/Edit Property Modal */}
      {showAdminModal && (
        <AdminPropertyModal 
          property={adminModalProperty}
          onClose={() => setShowAdminModal(false)}
          onSave={handleSaveProperty}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
