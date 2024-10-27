import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid2,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from "../slices/authSlice";
import { showNotification, NotificationType} from "../slices/notificationSlice";

const Login = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
    dispatch(
            login({
                email,
                password,
            })
        )
        } else {
            dispatch(
                showNotification({
                    message: "Please provide email and password",
                    type: NotificationType.Error,
                })
            )
        }
    };

    return (
    <>
        <Container maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            mt: 5,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
            </Avatar>
            <Typography variant="h5">Login</Typography>
            <Box sx={{ mt: 1 }}>
            <form onSubmit={handleLogin}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                setPassword(e.target.value);
                }}
            />

                <Button
                    fullWidth
                    variant="contained"
                    type="submit" // Add the type="submit" attribute
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                </form>
                <Grid2 container justifyContent={"center"}>
                <Link to="/register">Don't have an account? Register</Link>
                </Grid2>
            </Box>
        </Box>
        </Container>
    </>
    );
};

export default Login;