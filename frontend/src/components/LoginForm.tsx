import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import loginFormProps from "../types/components/LoginForm";
import { LoadingButton } from "@mui/lab";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">BooksWorld</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginForm: React.FC<loginFormProps> = ({
  setTextField,
  loginFunction,
  value,
  error,
  loginLoad,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://static.vecteezy.com/system/resources/previews/011/773/200/original/book-review-template-hand-drawn-cartoon-flat-illustration-with-reader-feedback-for-analysis-rating-satisfaction-and-comments-about-publications-vector.jpg)",

            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: "5rem" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                loginFunction(event)
              }
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                value={value.username}
                error={!error.username.valid}
                helperText={error.username.errMsg}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTextField(event)
                }
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={value.password}
                error={!error.password.valid}
                helperText={error.password.errMsg}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTextField(event)
                }
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {!loginLoad ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              ) : (
                <LoadingButton
                  fullWidth
                  size="small"
                  loading={true}
                  variant="contained"
                  disabled
                >
                  <span>disabled</span>
                </LoadingButton>
              )}

              <Grid container>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
