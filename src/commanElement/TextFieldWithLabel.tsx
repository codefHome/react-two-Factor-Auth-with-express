import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
interface InputFieldProp {
  label: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  placeholder: string;
  error: string | undefined;
  type?:string;
}
const InputFieldWithLabel = ({
  label,
  id,
  control,
  placeholder,
  error,
  type
}: InputFieldProp) => {
  const [isFocused, setIsFocused] = useState(false);
  let labelColor = '';
  labelColor =
    error && isFocused
      ? 'text-red-500'
      : isFocused && !error
      ? 'text-blue-500'
      : !isFocused && error
      ? 'text-red-500'
      : 'text-black';

  return (
    <Box className="flex flex-col space-y-3 w-full">
      <Typography className={`${labelColor}`} variant="inherit">
        {label}
      </Typography>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id={id}
            variant="outlined"
            error={!!error}
            helperText={error}
            type={type}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            sx={{
              boxShadow: '',
              borderRadius: '16px',
            }}
          />
        )}
      />
    </Box>
  );
};

export default InputFieldWithLabel;
