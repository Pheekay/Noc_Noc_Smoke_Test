export interface LoginTestIdsType {
    // Initial Login
    loginButton: string;
    loginModal: string;
    emailPhoneInput: string;
    nextButton: string;
    
    // Password Screen
    backButton: string;
    emailInput: string;
    passwordInput: string;
    showPasswordButton: string;
    loginSubmitButton: string;
    forgotPasswordButton: string;
    loginWithPhoneButton: string;
    
    // Error Messages
    loginError: string;
    errorMessage: string;
    
    // Password Validation
    passwordValidation: string;
    passwordRules: string;
    passwordValidTitle: string;
    passwordMinLength: string;
    passwordHasLetter: string;
    passwordHasNumber: string;
    passwordIsValid: string;
}

export const LoginTestIds: LoginTestIdsType = {
    // Initial Login
    loginButton: 'login-btn',
    loginModal: 'login-modal',
    emailPhoneInput: 'email-phone',
    nextButton: 'btn btn-primary big-btn',
    
    // Password Screen
    backButton: 'back-button',
    emailInput: 'email',
    passwordInput: 'password',
    showPasswordButton: 'show-password',
    loginSubmitButton: 'btn btn-primary big-btn',
    forgotPasswordButton: 'forgot-password',
    loginWithPhoneButton: 'login-with-phone',
    
    // Error Messages
    loginError: 'login-error',
    errorMessage: 'error-message',
    
    // Password Validation
    passwordValidation: 'password-validation',
    passwordRules: 'password-rules',
    passwordValidTitle: 'password-valid-title',
    passwordMinLength: 'password-min-length',
    passwordHasLetter: 'password-has-letter',
    passwordHasNumber: 'password-has-number',
    passwordIsValid: 'password-is-valid'
};