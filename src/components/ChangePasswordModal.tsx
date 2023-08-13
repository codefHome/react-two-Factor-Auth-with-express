import {
  Button,
  FormHelperText,
  Modal,
  Slide,
  Typography,
  IconButton,
} from "@mui/material";
import PasswordField from "../commanElement/PasswordField";
import PasswordValidationSchema, {
  updatePasswordSchema,
} from "../schema/UpdatePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IUpdatePassword, updatePassword } from "../api/restApis";
import { useState } from "react";

interface ChangePasswordProps {
  handleClose: VoidFunction;
  open: boolean;
  email: string;
  innerWidth: number;
}
const ChangePasswordModal = ({
  open,
  handleClose,
  email,
  innerWidth,
}: ChangePasswordProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");

  const {
    control,
    formState: { errors, isValid },
  } = useForm<PasswordValidationSchema>({
    mode: "onChange",

    defaultValues: {
      password: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  const handleChange = (e: string) => {
    setNewPassword(e);
  };
  const handleOldPassword = (e: string) => {
    setOldPassword(e);
  };
  const onSubmit = async () => {
    const updateData: IUpdatePassword = {
      email,
      newPassword,
      oldPassword,
    };
    await updatePassword(updateData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ position: "fixed", left: innerWidth >= 900 ? "17%" : 0, top: 0 }}
    >
      <div className="flex  w-full m-3 pr-6 mr-10 ">
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <div className="flex justify-center   bg-gray-100 lg:w-4/5 w-full h-auto m-5 shadow-lg border-1 border-t-2">
            <div className="flex flex-col lg:w-[80%] w-full mt-10 pt-5 h-auto bg-white rounded-lg shadow-lg border-t-2">
              <span className="flex ">
                <Typography className="flex justify-center text-black font-bold font-sans p-3 lg:w-11/12  w-full">
                  <span className="lg:text-base text-base">
                    Update your password
                  </span>
                </Typography>
                <IconButton
                  onClick={handleClose}
                  className="flex justify-center items-center relative top-0 right-0 "
                >
                  X
                </IconButton>
              </span>
              <form>
                <div className="flex flex-col space-y-4 m-5">
                  <span className="flex flex-col space-y-3">
                    <Typography>Old Password</Typography>
                    <span className="ml-[-10px] mr-[-10px]">
                      <PasswordField
                        id={"oldPassword"}
                        control={control}
                        placeholder="please enter password"
                        onChange={handleOldPassword}
                        error={errors?.oldPassword?.message}
                        type="password"
                        child={
                          !!errors.oldPassword ||
                          (isValid && (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.oldPassword}
                            </FormHelperText>
                          ))
                        }
                      />
                    </span>
                  </span>

                  <span className="flex flex-col space-y-3">
                    <Typography>New Password</Typography>
                    <span className="ml-[-10px] mr-[-10px]">
                      <PasswordField
                        id={"password"}
                        control={control}
                        onChange={handleChange}
                        placeholder="please enter password "
                        error={errors?.password?.message}
                        type="password"
                        child={
                          !!errors.password ||
                          (isValid && (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.password}
                            </FormHelperText>
                          ))
                        }
                      />
                    </span>
                  </span>
                  <span className="flex flex-col space-y-3">
                    <Typography>Comfirm Password</Typography>
                    <span className="ml-[-10px] mr-[-10px]">
                      <PasswordField
                        id={"confirmPassword"}
                        control={control}
                        placeholder="please confirm your  password"
                        type="password"
                        child={
                          <FormHelperText sx={{ color: "red" }}>
                            {errors?.confirmPassword?.message}
                          </FormHelperText>
                        }
                      />
                    </span>
                  </span>

                  <span className="flex justify-center items-center">
                    <Button
                      sx={{ textTransform: "none" }}
                      type="button"
                      variant="outlined"
                      className="lg:w-44 w-30 h-10"
                      onClick={onSubmit}
                    >
                      Update
                    </Button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </Slide>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
