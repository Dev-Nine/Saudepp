import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

const Select = ({ name, onChange, icon: Icon, ...rest }) => {
   const selectRef = useRef(null);
   const [isFocused, setIsFocused] = useState(false);
   const { fieldName, defaultValue, registerField, error } = useField(name);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);
   }, []);

   const handleInputFocus = useCallback(() => setIsFocused(true), []);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: selectRef.current,
         getValue: (ref) => {
            return ref.value;
         },
      });
   }, [fieldName, registerField, rest.isMulti]);

   return (
      <Container isErrored={!!error} isFocused={isFocused}>
         {Icon && <Icon size={20} />}
         <select
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            name={name}
            value={defaultValue}
            ref={selectRef}
            onChange={onChange}
         >
            {rest.children}
         </select>
         {error && (
            <Error title={error}>
               <FiAlertCircle color="#ff0000" size={20} />
            </Error>
         )}
      </Container>
   );
};

export default Select;
