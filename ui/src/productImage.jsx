import React from 'react';

export default function ProductImage({ match }) {
  const { id } = match.params;
  return (
    <div>
      <br />
      <br />
      <img src= 'https://cdn.cnn.com/cnnnext/dam/assets/190321010304-0320-levis-jeans-01-exlarge-169.jpg' alt="product" />
    </div>
  );
} 