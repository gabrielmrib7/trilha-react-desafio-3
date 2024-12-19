import React from 'react'
import { Controller } from "react-hook-form";

import {InputContainer, InputText, IconContainer, ErrorText } from './styles';

const Input = ({leftIcon, name, control, errorMessage, ...rest}) => {


  return (
    <>
    {errorMessage? <ErrorText>{errorMessage}</ErrorText> : null}
    <InputContainer>
        {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
        <Controller
        name={name}
        control={control}
        render={({ field }) =>  <InputText {...field} {...rest} />}
      />
       
    </InputContainer>
    </>
  )
}

export { Input }; 
