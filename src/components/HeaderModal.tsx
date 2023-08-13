import { Box, Divider, Modal, Slide } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
interface HeaderModalProps {
  open: boolean;
  handleClose: VoidFunction;
}
const HeaderModal = ({ open, handleClose }: HeaderModalProps) => {
  const topDrawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (open && topDrawerRef.current) {
      // Wait for the next render cycle to access the element's properties
      requestAnimationFrame(() => {
        topDrawerRef.current!.getBoundingClientRect();
      });
    }
  }, [open]);

  const handleMenu = (url: string) => {
    handleClose();
    navigate(url);
  };
  const slideContent = (
    <Box ref={topDrawerRef}>
      <nav className="flex flex-col  text-white ">
        <div
          onClick={() => handleMenu("/")}
          className=" w-full   cursor-pointer p-5 hover:bg-gray-500"
        >
          Home
        </div>
        <Divider className="mb-3" />

        <div
          onClick={() => handleMenu("/history")}
          className="  w-full   cursor-pointer p-5 hover:bg-gray-500"
        >
          01. HISTORY
        </div>
        <Divider className="mb-3" />
        <div
          onClick={() => handleMenu("/team")}
          className="  w-full  cursor-pointer p-5 hover:bg-gray-500"
        >
          02. TEAM
        </div>
        <Divider className="mb-3" />
      </nav>
    </Box>
  );
  return (
    <div className="flex w-1/2 m-3 round-md shadow-md bg-white  ">
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          width: "300px",
          height: "400px",
          position: "absolute",
          left: "3px",
          top: "75px",
          backgroundColor: "gray",
        }}
      >
        <div className="w-full h-screen p-5">
          <Slide direction="down" in={open} mountOnEnter unmountOnExit>
            {slideContent}
          </Slide>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderModal;
