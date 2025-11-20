// server.ts
import express from "express";
import session from "express-session";
import cors from "cors";
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
import { decodeJwt } from "jose";
import { createClientAssertion } from "./clientAssertion";

dotenv.config();

const app = express();

const {
    CLIENT_ID,
    REDIRECT_URI,
    AUTHORIZATION_ENDPOINT,
    TOKEN_ENDPOINT,
    USERINFO_ENDPOINT,
    PRIVATE_KEY,
    ALGORITHM,
    CLIENT_ASSERTION_TYPE,
    SESSION_SECRET,
} = process.env;

// --- Middleware ---
app.use(cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,               // allow cookies
}));

app.use(session({
    name: "sessionId",
    secret: SESSION_SECRET || "SUPER_SECRET_SESSION_KEY",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,  // true if using HTTPS in production
        sameSite: "lax",
        maxAge: 3600 * 1000, // 1 hour
    },
}));

// --- Login route ---
app.get("/auth/login", (req, res) => {
    const url = `${AUTHORIZATION_ENDPOINT}?` + qs.stringify({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: "openid profile email",
    });

    res.redirect(url);
});

// --- OAuth callback ---
app.get("/callback", async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) return res.status(400).send("Missing code");

        // Create client assertion
        const assertion = await createClientAssertion({
            clientId: CLIENT_ID ?? "",
            tokenEndpoint: TOKEN_ENDPOINT ?? "",
            privateKey: PRIVATE_KEY ?? "",
            alg: ALGORITHM ?? "RS256",
        });

        // Exchange code for tokens
        const data = qs.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_assertion: assertion,
            client_assertion_type: CLIENT_ASSERTION_TYPE,
        });

        const tokenRes = await axios.post(TOKEN_ENDPOINT ?? "", data, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const tokens = tokenRes.data;

        // Fetch user info
        const userInfoRes = await axios.get(USERINFO_ENDPOINT ?? "", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        const user = decodeJwt(userInfoRes.data as string);

        // Store user in session
        req.session.user = user;

        // Redirect frontend without token in URL
        res.redirect("http://localhost:5173/profile");

    } catch (err: any) {
        console.error(err.response?.data || err.message);
        res.status(500).send("OAuth callback error");
    }
});

// --- Current user info ---
app.get("/me", (req, res) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ error: "Not logged in" });

    res.json(user);
});

// --- Logout ---
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        res.clearCookie("sessionId");
        res.redirect("http://localhost:5173/login");
    });
});

// --- Start server ---
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
