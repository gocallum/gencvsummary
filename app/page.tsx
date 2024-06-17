// app/page.tsx
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Card from './components/Card';
import CVForm from './components/CVForm';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4 flex flex-col items-center">
        <div className="w-full max-w-2xl"> {/* Adjust the max width as needed */}
          <Card />
          <CVForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
