import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

const Input = ({ name, icon: Icon, ...rest }) => {
   const inputRef = useRef(null);
   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);
   const { fieldName, defaultValue, error, registerField } = useField(name);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      setIsFilled(!!inputRef.current.value);
   }, []);

   const handleInputFocus = useCallback(() => setIsFocused(true), []);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
      });
   }, [fieldName, registerField]);

   return (
      <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
         {Icon && <Icon size={20} />}
         <input
            onFocus={() => handleInputFocus()}
            onBlur={() => handleInputBlur()}
            ref={inputRef}
            {...rest}
         />

         {error && (
            <Error title={error}>
               <FiAlertCircle color="#ff0000" size={20} />
            </Error>
         )}
      </Container>
   );
};

export default Input;
