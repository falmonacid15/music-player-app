import { bentoGridData } from "@/constants/bento-grid-data";
import React from "react";
import BentoGridItem from "./bentogrid-item";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BentogridPlaylists() {
  return (
    <div className="grid gap-6 p-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center sm:px-32 w-full">
      <div className="lg:col-span-1 col-span-2 w-full">
        <motion.div
          key={bentoGridData[0].name}
          className="lg:col-span-1 col-span-2 w-full"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={itemVariants}
        >
          <BentoGridItem
            name={bentoGridData[0].name}
            description={bentoGridData[0].description}
            image={bentoGridData[0].image}
            songs={bentoGridData[0].songs}
          />
        </motion.div>
      </div>
      <motion.div
        key={bentoGridData[0].name}
        className="lg:col-span-1 col-span-2 w-full"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={itemVariants}
      >
        <BentoGridItem
          name={bentoGridData[1].name}
          description={bentoGridData[1].description}
          image={bentoGridData[1].image}
          songs={bentoGridData[1].songs}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
        variants={itemVariants}
        className="lg:col-span-1 col-span-1 w-full"
      >
        <BentoGridItem
          name={bentoGridData[2].name}
          description={bentoGridData[2].description}
          image={bentoGridData[2].image}
          songs={bentoGridData[2].songs}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.8 }}
        variants={itemVariants}
        className="lg:col-span-2 col-span-2 w-full"
      >
        <BentoGridItem
          name={bentoGridData[3].name}
          description={bentoGridData[3].description}
          image={bentoGridData[3].image}
          songs={bentoGridData[3].songs}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        variants={itemVariants}
        className="lg:col-span-1 col-span-1 w-full"
      >
        <BentoGridItem
          name={bentoGridData[4].name}
          description={bentoGridData[4].description}
          image={bentoGridData[4].image}
          songs={bentoGridData[4].songs}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.12 }}
        variants={itemVariants}
        className="lg:col-span-1 col-span-1 w-full"
      >
        <BentoGridItem
          name={bentoGridData[5].name}
          description={bentoGridData[5].description}
          image={bentoGridData[5].image}
          songs={bentoGridData[5].songs}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.14 }}
        variants={itemVariants}
        className="lg:col-span-2 col-span-2  w-full"
      >
        <BentoGridItem
          name={bentoGridData[6].name}
          description={bentoGridData[6].description}
          image={bentoGridData[6].image}
          songs={bentoGridData[6].songs}
        />
      </motion.div>
    </div>
  );
}
