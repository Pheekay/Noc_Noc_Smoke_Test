export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthData {
    valid: LoginCredentials;
    invalid: LoginCredentials;
    nonExisting: {
        email: string;
    };
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
    registerMessages: {
        title: string;
        passwordRules: {
            length: string;
            case: string;
            number: string;
        };
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
    nonExisting: {
        email: "nonexisting@nocnoc.com"
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
    },
    registerMessages: {
        title: "สร้างบัญชี NocNoc",
        passwordRules: {
            length: "ความยาว 8-16 ตัว",
            case: "มีตัวพิมพ์ใหญ่-เล็ก",
            number: "มีตัวเลข"
        }
    }
};

