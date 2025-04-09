import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={image?.urls?.regular} alt={image?.alt_description} />
      <p>Автор: {image?.user?.name}</p>
      <p>Лайків: {image?.likes}</p>
    </Modal>
  );
};

export default ImageModal;
