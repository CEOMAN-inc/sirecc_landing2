import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    phone: '',
    company: '',
    
    // Project Details
    projectType: '',
    projectLocation: '',
    projectSize: '',
    timeline: '',
    budget: '',
    
    // Additional Requirements
    services: [],
    description: '',
    hasPlans: false,
    urgency: '',
    
    // Contact Preferences
    preferredContact: '',
    bestTime: '',
    newsletter: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    { value: 'residential', label: 'Construcción Residencial' },
    { value: 'commercial', label: 'Construcción Comercial' },
    { value: 'industrial', label: 'Construcción Industrial' },
    { value: 'infrastructure', label: 'Infraestructura' },
    { value: 'renovation', label: 'Renovación y Remodelación' },
    { value: 'other', label: 'Otro' }
  ];

  const budgetRanges = [
    { value: '50-100', label: '$50M - $100M COP' },
    { value: '100-250', label: '$100M - $250M COP' },
    { value: '250-500', label: '$250M - $500M COP' },
    { value: '500-1000', label: '$500M - $1.000M COP' },
    { value: '1000+', label: 'Más de $1.000M COP' },
    { value: 'discuss', label: 'Prefiero discutir' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Inmediato (1-2 meses)' },
    { value: 'short', label: 'Corto plazo (3-6 meses)' },
    { value: 'medium', label: 'Mediano plazo (6-12 meses)' },
    { value: 'long', label: 'Largo plazo (12+ meses)' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const serviceOptions = [
    { value: 'design', label: 'Diseño y Planificación' },
    { value: 'permits', label: 'Gestión de Permisos' },
    { value: 'construction', label: 'Construcción General' },
    { value: 'project-management', label: 'Gestión de Proyecto' },
    { value: 'consulting', label: 'Consultoría Técnica' },
    { value: 'maintenance', label: 'Mantenimiento Post-Construcción' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Correo Electrónico' },
    { value: 'phone', label: 'Llamada Telefónica' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'meeting', label: 'Reunión Presencial' }
  ];

  const bestTimeOptions = [
    { value: 'morning', label: 'Mañana (8:00 - 12:00)' },
    { value: 'afternoon', label: 'Tarde (12:00 - 17:00)' },
    { value: 'evening', label: 'Noche (17:00 - 20:00)' },
    { value: 'anytime', label: 'Cualquier momento' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleServiceChange = (service, checked) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev?.services, service]
        : prev?.services?.filter(s => s !== service)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData?.fullName?.trim()) newErrors.fullName = 'El nombre es requerido';
      if (!formData?.email?.trim()) newErrors.email = 'El email es requerido';
      else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Email inválido';
      if (!formData?.phone?.trim()) newErrors.phone = 'El teléfono es requerido';
    }
    
    if (step === 2) {
      if (!formData?.projectType) newErrors.projectType = 'Seleccione el tipo de proyecto';
      if (!formData?.projectLocation?.trim()) newErrors.projectLocation = 'La ubicación es requerida';
      if (!formData?.timeline) newErrors.timeline = 'Seleccione el cronograma';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success
      alert('¡Cotización enviada exitosamente! Nos pondremos en contacto contigo pronto.');
      
      // Reset form
      setFormData({
        fullName: '', email: '', phone: '', company: '',
        projectType: '', projectLocation: '', projectSize: '', timeline: '', budget: '',
        services: [], description: '', hasPlans: false, urgency: '',
        preferredContact: '', bestTime: '', newsletter: false
      });
      setCurrentStep(1);
      
    } catch (error) {
      alert('Error al enviar la cotización. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / 4) * 100;
  };

  const stepTitles = {
    1: 'Información de Contacto',
    2: 'Detalles del Proyecto',
    3: 'Servicios y Requisitos',
    4: 'Preferencias de Contacto'
  };

  return (
    <div className="bg-card rounded-2xl construction-shadow-lg overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-orbitron font-bold text-xl text-white">
            Solicitar Cotización
          </h2>
          <div className="text-white/80 text-sm font-inter">
            Paso {currentStep} de 4
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-accent h-2 rounded-full glow-effect"
            initial={{ width: '25%' }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
        
        <div className="mt-3 text-white/90 font-inter text-sm">
          {stepTitles?.[currentStep]}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre Completo"
                type="text"
                placeholder="Ingresa tu nombre completo"
                value={formData?.fullName}
                onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                error={errors?.fullName}
                required
                className="glow-effect focus:glow-effect"
              />
              
              <Input
                label="Empresa/Organización"
                type="text"
                placeholder="Nombre de tu empresa (opcional)"
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="tu@email.com"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />
              
              <Input
                label="Número de Teléfono"
                type="tel"
                placeholder="+57 300 123 4567"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                required
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Tipo de Proyecto"
                placeholder="Selecciona el tipo de proyecto"
                options={projectTypes}
                value={formData?.projectType}
                onChange={(value) => handleInputChange('projectType', value)}
                error={errors?.projectType}
                required
              />
              
              <Input
                label="Ubicación del Proyecto"
                type="text"
                placeholder="Ciudad, Departamento"
                value={formData?.projectLocation}
                onChange={(e) => handleInputChange('projectLocation', e?.target?.value)}
                error={errors?.projectLocation}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Tamaño del Proyecto"
                type="text"
                placeholder="ej: 150 m², 2 pisos, etc."
                value={formData?.projectSize}
                onChange={(e) => handleInputChange('projectSize', e?.target?.value)}
                description="Área aproximada o descripción del tamaño"
              />
              
              <Select
                label="Cronograma Deseado"
                placeholder="¿Cuándo necesitas iniciar?"
                options={timelineOptions}
                value={formData?.timeline}
                onChange={(value) => handleInputChange('timeline', value)}
                error={errors?.timeline}
                required
              />
            </div>
            
            <Select
              label="Presupuesto Estimado"
              placeholder="Selecciona el rango de presupuesto"
              options={budgetRanges}
              value={formData?.budget}
              onChange={(value) => handleInputChange('budget', value)}
              description="Esta información nos ayuda a preparar una propuesta adecuada"
            />
          </motion.div>
        )}

        {/* Step 3: Services & Requirements */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Servicios Requeridos
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceOptions?.map((service) => (
                  <Checkbox
                    key={service?.value}
                    label={service?.label}
                    checked={formData?.services?.includes(service?.value)}
                    onChange={(e) => handleServiceChange(service?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
            
            <Input
              label="Descripción del Proyecto"
              type="text"
              placeholder="Describe brevemente tu proyecto, objetivos y requisitos especiales..."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              description="Comparte todos los detalles que consideres importantes"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Checkbox
                  label="Tengo planos o diseños existentes"
                  checked={formData?.hasPlans}
                  onChange={(e) => handleInputChange('hasPlans', e?.target?.checked)}
                  description="Esto nos ayuda a evaluar mejor tu proyecto"
                />
              </div>
              
              <Select
                label="Nivel de Urgencia"
                placeholder="¿Qué tan urgente es tu proyecto?"
                options={[
                  { value: 'low', label: 'Baja - Solo explorando opciones' },
                  { value: 'medium', label: 'Media - Planeo iniciar pronto' },
                  { value: 'high', label: 'Alta - Necesito iniciar inmediatamente' },
                  { value: 'emergency', label: 'Emergencia - Es crítico' }
                ]}
                value={formData?.urgency}
                onChange={(value) => handleInputChange('urgency', value)}
              />
            </div>
          </motion.div>
        )}

        {/* Step 4: Contact Preferences */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Método de Contacto Preferido"
                placeholder="¿Cómo prefieres que te contactemos?"
                options={contactMethods}
                value={formData?.preferredContact}
                onChange={(value) => handleInputChange('preferredContact', value)}
              />
              
              <Select
                label="Mejor Horario para Contactarte"
                placeholder="¿Cuándo es mejor contactarte?"
                options={bestTimeOptions}
                value={formData?.bestTime}
                onChange={(value) => handleInputChange('bestTime', value)}
              />
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <Checkbox
                label="Quiero recibir actualizaciones y consejos de construcción"
                checked={formData?.newsletter}
                onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
                description="Te enviaremos contenido valioso sobre construcción y nuestros servicios (puedes cancelar en cualquier momento)"
              />
            </div>
            
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-foreground">
                  <p className="font-medium mb-1">¿Qué sigue después de enviar esta cotización?</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Revisaremos tu solicitud en 24 horas</li>
                    <li>• Te contactaremos para aclarar detalles</li>
                    <li>• Programaremos una visita al sitio si es necesario</li>
                    <li>• Te enviaremos una propuesta detallada</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Anterior
          </Button>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {[1, 2, 3, 4]?.map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  step <= currentStep ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          {currentStep < 4 ? (
            <Button
              type="button"
              variant="default"
              onClick={nextStep}
              iconName="ChevronRight"
              iconPosition="right"
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
            >
              Siguiente
            </Button>
          ) : (
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 glow-effect"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Cotización'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;