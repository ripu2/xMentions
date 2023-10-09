import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";

export const ParentContainer = styled(Box)(({}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

export const ChildContainer = styled(Box)(({}) => ({
  flexDirection: 'column',
  // width: '100%',
  // margin: '0 auto',
}));

export const InputField = styled(OutlinedInput)(({}) => ({
    width: '500px',
}));