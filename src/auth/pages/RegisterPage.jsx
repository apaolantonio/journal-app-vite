import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { startRegisteringEmailPassword } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";
const formData = {
  email: "agustin@gmail.com",
  password: "123456",
  displayName: "Agustin Paolantonio",
};
export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  // Si el status cambia se va a obtener el nuevo valor booleano
  const isCheckingAuth = useMemo(() => status === "checking", [status]);

  const { displayName, email, password, onInputChange, formState } =
    useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!displayName || !password || !email) return;

    dispatch(startRegisteringEmailPassword(formState));
  };
  return (
    <>
      <AuthLayout title="Register">
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre Completo"
                type="text"
                placeholder="Jhon Doe"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                helperText={!displayName ? "El nombre es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                helperText={!password ? "El correo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                helperText={!password ? "La password es obligatorio" : ""}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} md={12} display={!!errorMessage ? "" : "none"}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} md={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={
                    !displayName || !password || !email || isCheckingAuth
                  }
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
