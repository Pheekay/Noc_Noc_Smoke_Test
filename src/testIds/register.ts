export interface RegisterTestIdsType {
    container: string;
    title: string;
    subtitle: string;
    phoneField: string;
    emailInput: string;
    passwordBlock: {
        container: string;
        header: string;
        validatorPills: string;
        rulesList: string;
        password1Input: string;
        password2Input: string;
        password1Eye: string;
        password2Eye: string;
    };
    createAccountButton: string;
}

export const RegisterTestIds: RegisterTestIdsType = {
    container: 'sign-up-page',
    title: 'register-title',
    subtitle: 'register-subtitle',
    phoneField: 'phone-field',
    emailInput: 'email',
    passwordBlock: {
        container: 'password-block',
        header: 'password-header',
        validatorPills: 'password_validator_pills',
        rulesList: 'rules_list',
        password1Input: 'password1',
        password2Input: 'password2',
        password1Eye: 'icon-eyelash1',
        password2Eye: 'icon-eyelash1'
    },
    createAccountButton: 'create-account-button'
};