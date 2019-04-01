declare module 'mrz-gen' {

    export interface UserInfo {
        firstName: string;
        lastName: string;
        passportNumber: string;
        countryCode: string;
        nationality: string;
        birthday: string;
        gender: string;
        validUntilDay: string;
        personalNumber: string;
    }

    export interface GeneratorArgs {
        user: UserInfo;
    }

    export interface Country {
        code: string;
        name: string;
    }

    type Generator = (args: GeneratorArgs) => string;

    export const generate: Generator;

}
