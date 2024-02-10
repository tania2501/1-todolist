import { SubmitHandler, useForm } from "react-hook-form";
import s from "./Login.module.css";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../app/app/hooks/appHooks";
import { loginTC } from "./login-reducer";

type LoginFormType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type LoginFormPropsType = {
  auth: boolean
  error?: string 
};
export const Login = (props: LoginFormPropsType) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    mode: "onChange",
    defaultValues: { email: "" },
  });
  const submitHandler: SubmitHandler<LoginFormType> = (data) => {
    dispatch(loginTC(data));
  };
  if(props.auth) return <Navigate to='/'/>
  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={4}>
        <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
          <FormLabel>
            <p>
              To log in get registered
              <a
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
                rel="noreferrer"
              >
                {" "}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <div>
              {props.error ? (
                <span className={s.error}>{props.error}</span>
              ) : (
                ""
              )}
              {
                <p className={s.error}>
                  {" "}
                  {errors.email && errors.email.message}
                </p>
              }
              <TextField
                variant="standard"
                color="secondary"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
            </div>
            <div>
              {
                <p className={s.error}>
                  {" "}
                  {errors.password && errors.password.message}
                </p>
              }
              <TextField
                variant="standard"
                color="secondary"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Field is required",
                  minLength: {
                    value: 4,
                    message: "Password length should be at least 4 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password cannot exceed more than 12 characters",
                  },
                  pattern: { value: /^\S*$/, message: "No spaces allowed" },
                })}
              />
            </div>
            <div className={s.remember}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("rememberMe")}
                    color="secondary"
                    size="small"
                  />
                }
                label="remember me"
              />
            </div>
            <div>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                type="submit"
                disabled={!isValid}
                className={s.buttons}
              >
                Login
              </Button>
            </div>
          </FormGroup>
        </form>
      </Grid>
    </Grid>
  );
};
