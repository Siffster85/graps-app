export const BACKEND_BASE_URL = "http://localhost:8000";

export type ErrorResponse = {
    message: string;
    };

export enum Roles {
    Admin = "ADMIN",
    Member = "MEMBER",
    }

export enum ButtonColor {
        Primary = "primary",
        Secondary = "secondary",
        Inherit = "inherit",
    }