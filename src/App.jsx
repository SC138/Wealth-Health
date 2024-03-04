import Modal from "react-new-modal-plugin";
import React, { useState } from "react";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Ouvrir la modal</button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        children={"Hello, je suis une modal !"}
      />
    </div>
  );
};

export default App;
