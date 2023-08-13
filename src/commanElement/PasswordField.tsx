/* eslint-disable @typescript-eslint/no-explicit-any */
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import {  ReactNode, useState } from 'react';
import { Controller } from 'react-hook-form';
interface InputFieldProp {
  icon?: ReactNode;
  id: string;
  control: any;
  placeholder: string;
  error?: any;
  type:string;
  child?:ReactNode
  onChange?:(valeu:string)=>void;
}
const PasswordField = ({
  id,
  control,
  placeholder,
  error,
  icon,
  child,
  onChange

}: InputFieldProp) => {
 
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
  return (
    <Box className="flex w-full  p-3 space-x-2 ">
    <span className="flex justify-center items-center">
    {icon}
    </span>
      <span className="flex w-full ">
      <Controller
  name={id}
  control={control}
  defaultValue=""
  render={({ field }) => (
    <FormControl sx={{  width: '100%' }} variant="outlined" >
        
      <OutlinedInput 
        {...field}
        id={id}
        type={showPassword ? 'text' : 'password'}
        error={error}
        placeholder={placeholder}
        onChange={(e) => {
          field.onChange(e.target.value);
          onChange?.(e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
             
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
  {child}
    </FormControl>
  )}
/>
      </span>
      
    </Box>
  );
};

export default PasswordField;
