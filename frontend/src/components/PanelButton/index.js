import React from 'react';

import { Container } from './styles';

const PanelButton = ({ icon, text }) => {
   return (
      <Container>
         {icon}
         <p>{text}</p>
      </Container>
   );
};

export default PanelButton;
