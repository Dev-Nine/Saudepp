import React from 'react';

import { AuthProvider } from './AuthProvider';

const AppProvider = ({ children }) => {
   return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
