import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  // Перевірка на наявність 'urls' та 'small' в об'єкті
  const imageUrl = image?.urls?.small;

  if (!imageUrl) {
    return <div>Image not available</div>; // Можна показати повідомлення, якщо немає зображення
  }

  return (
    <div className={styles.imageCard} onClick={onClick}>
      <img src={imageUrl} alt={image.alt_description || 'Image'} />
    </div>
  );
};

export default ImageCard;
