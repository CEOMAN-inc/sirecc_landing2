import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-elevation hover:shadow-elevation-hover animation-spring"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Pan Effect */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            x: isHovered ? -10 : 0,
            y: isHovered ? -5 : 0
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="w-full h-full"
        >
          <Image
            src={service?.image}
            alt={service?.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Glass Morphism Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 glass-morphism flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4"
          >
            <Icon 
              name="ArrowRight" 
              size={24} 
              color="white" 
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.div>

        {/* Service Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-white backdrop-blur-sm">
            {service?.category}
          </span>
        </div>

        {/* Regulatory Compliance Badge */}
        {service?.hasCompliance && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-success/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              <Icon name="Shield" size={12} />
              <span>Certificado</span>
            </div>
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent animation-spring">
            {service?.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {service?.description}
          </p>
        </div>

        {/* Features List */}
        <div className="mb-6">
          <ul className="space-y-2">
            {service?.features?.slice(0, 3)?.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-text-secondary">
                <Icon 
                  name="Check" 
                  size={16} 
                  className="text-success mr-2 flex-shrink-0" 
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Regulatory Standards */}
        {service?.standards && service?.standards?.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {service?.standards?.map((standard, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary border border-border"
                >
                  {standard}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Link to={`/service-detail-page?service=${service?.slug}`}>
          <Button
            variant="outline"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            className={`
              animation-spring
              ${isHovered ? 'shadow-glow-accent border-accent text-accent' : ''}
            `}
          >
            Conocer Más
          </Button>
        </Link>
      </div>
      {/* Hover Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl shadow-glow-accent pointer-events-none"
      />
    </motion.div>
  );
};

export default ServiceCard;