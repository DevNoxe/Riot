import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CodeRedemption from './components/CodeRedemption';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedCode, setSubmittedCode] = useState('');

  const handleCodeSubmit = (code: string) => {
    setSubmittedCode(code);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-16">
        <CodeRedemption onSubmit={handleCodeSubmit} />
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} code={submittedCode} />
    </div>
  );
}

export default App;