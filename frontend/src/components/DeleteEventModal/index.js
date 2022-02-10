import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteEventPage from '../DeleteEventPage';

const DeleteEventModal = () => {
  const [showModal, setShowModal] = useState(false);
  const reload = () => window.location.reload();

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteEventPage closeModal={() => setShowModal(false)} closeModal={() => reload()}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteEventModal;