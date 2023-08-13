import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { useQuery } from "react-query";
import { IUser, getUsers } from "../api/restApis";

import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { Typography } from "@material-ui/core";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { data } = useQuery<IUser[]>("users", () => getUsers());
  console.log({data})
  const handleSignOut = () => {
    navigate("/");
    localStorage.removeItem("token");
  };
  const userInfo = JSON.parse(localStorage.getItem("token")!);
  const [open, setOpen] = useState(false);
  const handleChangePassword = () => {
    setOpen(true);
  };
  console.log(data);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col w-full h-screen  ">
          <Header
            email={userInfo.email}
            fullName={`${userInfo.firstName} ${userInfo.lastName}`}
            twoFactorAuth={userInfo.twoFactorAuth}
            handleSignOut={handleSignOut}
            handleChangePassword={handleChangePassword}
          />
          <div className=" flex justify-center items-center h-auto mt-5 ">
            <div className="flex justify-center  w-10/12 h-full mt-5 bg-white rounded-lg border-1 border-t-2 shadow-lg p-5">
              <Table className="flex flex-col">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell >{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell >{user.password}</TableCell>
                    </TableRow>
                  ))}
                    {data?.length === 0 && <Typography className="flex justify-center items-center pt-20 w-full">Empty Table</Typography>}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        open={open}
        handleClose={handleClose}
        email={userInfo.email}
        innerWidth={windowWidth}
      />
    </>
  );
};

export default UserDashboard;
