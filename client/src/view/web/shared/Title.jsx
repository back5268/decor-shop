import React from 'react';
import { motion } from 'framer-motion';

const Title = ({ label }) => {
  return (
    <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border mb-4">
      <motion.h2
        initial={{ y: 12, opacity: 0.5 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-center font-bold uppercase text-2xl mx-6"
      >
        {label}
      </motion.h2>
    </div>
  );
};

export default Title;
