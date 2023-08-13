/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, TextField } from '@mui/material';
import {  ReactNode } from 'react';
import { Controller } from 'react-hook-form';

interface InputFieldProp {
  icon?: ReactNode;
  id: string;
  control: any;
  placeholder: string;
  error: string | undefined;
  type:string;
  onChange?:(valeu:string)=>void;
}
const InputField = ({
  id,
  control,
  placeholder,
  error,
  icon,
  type,
  onChange

}: InputFieldProp) => {
 
  return (
    
    <Box className="flex w-full p-3 space-x-2 ">
      <span className="flex justify-center items-center">
        {icon}
      </span>
      <span className="flex w-full ">
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <TextField className="flex w-full"
            {...field}
            id={id}
            onChange={(e) => {
              field.onChange(e.target.value);
              onChange?.(e.target.value);
            }}
            variant="outlined"
            error={!!error}
            helperText={error}
            placeholder={placeholder}
            type={type}
            sx={{
              boxShadow: '',
              borderRadius: '16px',
             
            }}
          />
        )}
      />
      </span>

      
      
    </Box>
  );
};

export default InputField;
