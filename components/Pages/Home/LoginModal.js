import { useState } from "react";
import { useForm } from "react-hook-form"
import Link from "next/dist/client/link";
import FormError from "../../Forms/Error"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { SignIn, GetSignInErrorMessage } from '../../../services/firebase'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "common.white",
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ open, CloseModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (values) => {
    const { email, password } = values
    try {
      await SignIn(email, password)
    } catch (error) {
      const message = GetSignInErrorMessage(error.code)
      console.log(message)
    }
  }

  return (
    <Modal open={open} onClose={CloseModal}>
      <Box sx={style}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Sign in
        </Typography>
        <Grid sx={{ mb: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ mb: 2 }} fullWidth>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                variant="filled"
                {...register("email", { required: true})}
              />
              <FormError error={errors.email} />
              <FormHelperText>Please enter a valid email.</FormHelperText>
            </FormControl>
            <FormControl sx={{ mb: 4 }} fullWidth>
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                {...register("password", { required: true, minLength: 8 })}
              />
              <FormError error={errors.password} />
              <FormHelperText>
                Your password must contain between 6 and 60 characters.
              </FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign in
            </Button>
          </form>
        </Grid>

        <Grid>
          <Link href="/signup" passHref>
          <Typography variant="body1" color="primary" component="a" href="#">
            Sign up
          </Typography>
          </Link>
        </Grid>
      </Box>
    </Modal>
  );
};

export default LoginModal;
