import { Backdrop, CircularProgress } from "@mui/material"

type Props = {
  isLoading: boolean;
}

export const Loader: React.FC<Props> = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}