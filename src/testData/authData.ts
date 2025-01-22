export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthData {
    valid: LoginCredentials;
    invalid: LoginCredentials;
    errorMessages: {
        invalidCredentials: string;
        emptyEmail: string;
        emptyPassword: string;
    };
    passwordValidation: {
        minLength: number;
        hasLetter: boolean;
        hasNumber: boolean;
    };
}

export const authData: AuthData = {
    valid: {
        email: "krith.jkr@gmail.com",
        password: "petergep401"
    },
    invalid: {
        email: "invalid@nocnoc.com",
        password: "wrong123"
    },
    errorMessages: {
        invalidCredentials: "อีเมลหรือรหัสผ่านของคุณไม่ถูกต้อง กรุณาตรวจสอบข้อมูลของคุณใหม่อีกครั้ง",
        emptyEmail: "กรุณากรอกอีเมล",
        emptyPassword: "กรุณากรอกรหัสผ่าน"
    },
    passwordValidation: {
        minLength: 8,
        hasLetter: true,
        hasNumber: true
    }
};

