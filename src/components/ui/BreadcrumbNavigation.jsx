import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const pathSegments = location?.pathname?.split('/')?.filter(Boolean);

  const getBreadcrumbItems = () => {
    const items = [
      {
        label: 'Inicio',
        path: '/',
        icon: 'Home'
      }
    ];

    if (pathSegments?.length === 0) {
      return items;
    }

    // Handle services routes
    if (pathSegments?.[0] === 'services-overview') {
      items?.push({
        label: 'Servicios',
        path: '/services-overview',
        icon: 'Settings'
      });
    } else if (pathSegments?.[0] === 'service-detail') {
      items?.push(
        {
          label: 'Servicios',
          path: '/services-overview',
          icon: 'Settings'
        },
        {
          label: 'Detalle del Servicio',
          path: '/service-detail',
          icon: 'Info'
        }
      );
    } else if (pathSegments?.[0] === 'service-comparison') {
      items?.push(
        {
          label: 'Servicios',
          path: '/services-overview',
          icon: 'Settings'
        },
        {
          label: 'Comparación',
          path: '/service-comparison',
          icon: 'GitCompare'
        }
      );
    } else if (pathSegments?.[0] === 'quote-request') {
      items?.push({
        label: 'Cotización',
        path: '/quote-request',
        icon: 'FileText'
      });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't render breadcrumbs on homepage
  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item?.path} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground mx-2" 
                />
              )}
              {isLast ? (
                <span className="flex items-center space-x-1.5 text-foreground font-medium">
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </span>
              ) : (
                <Link
                  to={item?.path}
                  className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 hover-halo rounded px-2 py-1 spring-bounce"
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;