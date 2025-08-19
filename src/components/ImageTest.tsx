import React from 'react';
import heroImage from '@/assets/hero-bodybuilder.jpg';

const ImageTest = () => {
  console.log('🧪 ImageTest component - heroImage path:', heroImage);
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      width: '200px', 
      height: '200px', 
      border: '2px solid red',
      backgroundColor: 'white',
      zIndex: 9999
    }}>
      <h3>Image Test</h3>
      <p>Path: {heroImage}</p>
      <img 
        src={heroImage} 
        alt="Test" 
        style={{ width: '100%', height: '100px', objectFit: 'cover' }}
        onLoad={() => console.log('🧪 Test image loaded')}
        onError={() => console.log('🧪 Test image failed')}
      />
    </div>
  );
};

export default ImageTest;
