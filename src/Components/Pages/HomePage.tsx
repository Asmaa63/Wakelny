import React from 'react';
import { Link } from 'react-router-dom';
import legalImage from '../../assets/low.webp';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* صورة الخلفية */}
      <div className="absolute inset-0">
        <img
          src={legalImage}
          alt="Legal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* النصوص */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="bg-white bg-opacity-70 shadow-xl rounded-lg p-8 text-center space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-black">
            Streamline Your Legal Process
          </h1>
          <p className="text-lg text-black">
            Find the perfect lawyer who can handle your needs with expertise and trust.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/getstart"
              className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 transform hover:scale-105 transition-all inline-block"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
