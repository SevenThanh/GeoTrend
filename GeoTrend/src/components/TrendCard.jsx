import React from 'react';
import { motion } from 'framer-motion';

const TrendCard = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-2 shadow"
    >
      <h4 className="font-bold">{data.title || data.hashtag}</h4>
      <p>{data.description || data.content}</p>
    </motion.div>
  );
};

export default TrendCard;
