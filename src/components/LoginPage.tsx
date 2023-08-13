import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginValidationSchema, { loginSchema } from "../schema/LoginSchema";
import InputField from "../commanElement/InputFieldWithIcon";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import QRCode from "qrcode.react";

import { PasswordIcon, UserNameIcon } from "../icons/PasswordIcon";

import PasswordField from "../commanElement/PasswordField";
import { useNavigate } from "react-router-dom";
import {
  IAuth,
  IUser,
  getUserByEmail,
  login,
  twoFactorAuth,
} from "../api/restApis";
import { useEffect, useState } from "react";

interface ILoginInfo {
  email: string;
  password: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState<IUser>();
  const [url, setUrl] = useState<string>("");
  const [displayQrcode,setDisplayQrcode]=useState(false)
  const[loginResult,setLoginResult]=useState<{message:string,token:string}>();
  const {
    control,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm<LoginValidationSchema>({
    mode: "onChange",

    defaultValues: {
      email: "",
      password: "",
      oneTimeCode:""
    },
    resolver: zodResolver(loginSchema),
  });

  const handleTwoFactorAuthentication = async (e: string) => {
    const user = await getUserByEmail(e);
    if (user) {
      setUserInformation(user);
    }
    if(errors.email){
      setDisplayQrcode(false)
    }
  };

  useEffect(() => {
    (async () => {
      if (userInformation?.twoFactorAuth) {
        const datas: IAuth = {
          email: userInformation.email,
        };
        if (userInformation?.twoFactorAuth) {
           setDisplayQrcode(true)
          const result: {
            oneTimeCode: string;

            qrCodeURL: string;
          } = await twoFactorAuth(datas);
          console.log({ result });
          setUrl(result.oneTimeCode);
         
        }
      }
    })();
  }, [userInformation]);

  const onSubmit: SubmitHandler<LoginValidationSchema> = async (
    data: ILoginInfo
  ) => {
    const d={email:data.email,password:data.password}
   const result = await login(userInformation?.twoFactorAuth ? data : d);

   setLoginResult(result)
   console.log({result})
    if (result?.message === "Login successfull") {
      const userInfo = {
        firstName: userInformation?.firstName,
        lastName: userInformation?.lastName,
        email: userInformation?.email,
        twoFactorAuth:userInformation?.twoFactorAuth,
        toke: result?.token,
      };

      localStorage.setItem("token", JSON.stringify(userInfo));
      navigate("userDashboard");
    } 
  };
  console.log(loginResult)
  return (
    <Box className="flex justify-center items-center w-full h-screen ">
    <div className="flex w-full h-auto justify-center items-center">
    <div className="flex justify-center items-center  bg-gray-100 lg:w-3/5 w-full  h-auto lg:m-5 mt-10 shadow-lg border-4 border-t-4">
      <div className="flex flex-col lg:w-1/2 w-full h-auto p-5 m-10 bg-white rounded-lg shadow-lg border-t-2">
       <Box className="mr-10 w-full">
       <Typography className="flex justify-center items-center text-black font-bold p-5">
          Login Page or Register here
        </Typography>

        <div className="flex 0 w-auto ">
          <form
            className="flex flex-col w-full justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
           
            <InputField
              icon={<UserNameIcon />}
              id="email"
              type="text"
              control={control}
              placeholder="please enter your email"
              error={errors.email?.message}
              onChange={handleTwoFactorAuthentication}
            />

            <PasswordField
              id="password"
              icon={<PasswordIcon />}
              control={control}
              error={errors.password?.message}
              child={
                !!errors.password && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors?.password?.message}
                  </FormHelperText>
                )
              }
              placeholder="please enter your password"
              type="password"
            />
          
        
        {displayQrcode && 
        <span className="flex w-[95%] ml-5">
         <InputField
              id="oneTimeCode"
              type="text"
              control={control}
              placeholder="please enter one time code"
              error={errors.oneTimeCode?.message}
            
            />
         </span>
         } 
  {(loginResult?.message !=="Login successfull" && isValid) && <Typography className="text-red-500">{loginResult?.message}</Typography>}
            <div className="flex mt-5 space-x-10 ">
            
              <span className="flex  text-xl  w-20 h-10 justify-center items-center">
                <Button type="submit" variant="outlined">
                  Login
                </Button>
              </span>
              <span>
                <Button
                  onClick={() => navigate("registerUser")}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Register
                </Button>
              </span>
            </div>
          </form>
        </div>
       </Box>
      
       {displayQrcode && <Box className="flex flex-col justify-center items-center mt-16 mr-5 lw-full">
        <Typography className="mb-5 text-black font-bold text-center">Please scan this one time code to login successfully</Typography>
        <QRCode value={url} /></Box>}
       
        
      </div>
    </div>
    </div>
    </Box>
  );
};
export default Home;
