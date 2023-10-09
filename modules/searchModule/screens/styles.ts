import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const ParentContainer = styled(Box)(({}) => ({
  height: '100vh',
  width: '100%',
  padding: 15,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white'
}));