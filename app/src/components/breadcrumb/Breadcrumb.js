'use client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Check if pathname is defined
  if (!pathname) {
    return null; // or a loading state
  }

  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb separator='>'>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

        return (
          <BreadcrumbItem key={href}>
            <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
