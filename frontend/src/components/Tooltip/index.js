import React from 'react';

import { Container } from './styles';


const Tooltip = ({
   title,
   children,
   className,
}) => {

   return (
      <Container className={className}>
         {children}
         <span>{title}</span>
      </Container>
   );
};

export default Tooltip;