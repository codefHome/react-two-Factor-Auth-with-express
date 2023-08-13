import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormHelperText, Typography } from '@mui/material';

import { SubmitHandler, useForm } from 'react-hook-form';

import UserValidationSchema, { userSchema } from '../schema/UserSchema';
import TextField from '../commanElement/TextFieldWithLabel';
import PasswordField from '../commanElement/PasswordField';
import { registerUser } from '../api/restApis';
import { useNavigate } from 'react-router-dom';




export interface IUser{
  firstName:string
  lastName:string
  email:string
  password:string
  confirmPassword?:string
}

const RegisterUser = () => {
const navigate=useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm<UserValidationSchema>({
    mode: 'onChange',

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password:''
    },
    resolver: zodResolver(userSchema),
  });


  const onSubmit: SubmitHandler<UserValidationSchema> = async (
    data: IUser ,
  ) => {
delete data.confirmPassword;
   registerUser(data)
   navigate('/')
  };

 

  return (
    
      <div className="flex justify-center items-center    bg-gray-100 w-4/5 h-auto m-5 shadow-lg border-1 border-t-2 ">
         <div className="flex flex-col lg:w-1/2 w-full h-auto mt-10 pt-5 h-full bg-white rounded-lg shadow-lg border-t-2">
        <Typography className="flex justify-center text-black font-bold font-sans p-3 lg:w-11/12  w-full">
          <span className="lg:text-2xl text-base">
            Welcome to Regisration Page
          </span>
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4 m-5">
            <TextField
              id={'firstName'}
              label="First Name"
              control={control}
              placeholder="please enter first name"
              error={errors?.firstName?.message}
            />

            <TextField
              id={'lastName'}
              label="Last Name"
              control={control}
              placeholder="please enter last last"
              error={errors?.lastName?.message}
            />


            <TextField
              id={'email'}
              label="Email"
              control={control}
              placeholder="please enter email last"
              error={errors?.email?.message}
            />
          
 <span className="flex flex-col space-y-3">
  <Typography>Password</Typography>
  <span className='ml-[-10px] mr-[-10px]'>
  <PasswordField 
              id={'password'}
              control={control}
              placeholder="please enter password last"
              error={errors?.password?.message}
              type="password"
              child={ !!errors.password || isValid &&<FormHelperText sx={{color:'red'}} >{errors.password}</FormHelperText>}
            />
  </span>
 
 </span>
 <span className="flex flex-col space-y-3">
  <Typography>Comfirm Password</Typography>
  <span className='ml-[-10px] mr-[-10px]'>
 <PasswordField
              id={'confirmPassword'}
              control={control}
              placeholder="please enter password last"
              type="password"
              child={ <FormHelperText sx={{color:'red'}} >{errors?.confirmPassword?.message}</FormHelperText>}
            />
            </span>
 </span>
           
            <span className="flex justify-center items-center">
              <Button
                sx={{ textTransform: 'none' }}
                type="submit"
                variant="outlined"
                className="lg:w-44 w-30 h-10"
              >
                Submit
              </Button>
            </span>
          </div>
        </form>
      </div>
      </div>
     
    
  );
};

export default RegisterUser;

