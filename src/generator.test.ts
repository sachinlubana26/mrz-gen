import {InputDateFormat, SampleInputDate} from './index';

import { UserInfo } from 'mrz-gen';

import {generate} from './generator';

describe('src/generate-mrz', () => {

    it('Should return error for invalid first name', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '1234567890000000',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual('Passport number is invalid');
    });    

    it('Should return error for invalid first name', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUS',
            firstName: '',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual('User first name is required');
    });    

    it('Should return error for invalid last name', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: '',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual('User last name is required');
    });

    it('Should return error for invalid country code', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUZ',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual('country in invalid');
    });

    it('Should return error for country code length', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUSA',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual('country length must be 3');
    }); 

    it('Should return error for invalid birthday', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.19800',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual(`birthday is not valid. Valid format is ${InputDateFormat} (eg: ${SampleInputDate})`);
    });

    it('Should return error for invalid first name', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '1234567890000000',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual('Passport number is invalid');
    });    

    it('Should return error for invalid passport validity', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1980',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.20',
        };
        const result = generate({ user });
        expect(result).toEqual(`validUntilDay is not valid. Valid format is ${InputDateFormat} (eg: ${SampleInputDate})`);
    });

    it('Should return error for birthday in future', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.2020',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual('birthday cannot be in future');
    });

    it('Should return error for passport validate date in past', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1989',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2012',
        };
        const result = generate({ user });
        expect(result).toEqual('validUntilDay cannot be in past');
    });    
    
    it('Should work with correct data', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '12345678901234',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual(
`P<RUSPETROV<<IVAN<<<<<<<<<<<<<<<<<<<<<<<<<<<
1234567897RUS8302010M28030211234567890123454`,
        );
    });

    it('Should work with filler', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '<<<<<<<<<<<<<<',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual(
`P<RUSPETROV<<IVAN<<<<<<<<<<<<<<<<<<<<<<<<<<<
1234567897RUS8302010M2803021<<<<<<<<<<<<<<04`,
        );
    });

    it('Should work without personalNumber filler', () => {
        expect.assertions(1);
        const user: UserInfo = {
            birthday: '01.02.1983',
            countryCode: 'RUS',
            firstName: 'Ivan',
            gender: 'M',
            lastName: 'Petrov',
            nationality: 'RUS',
            passportNumber: '123456789',
            personalNumber: '<<<<<<<<<<<<<<',
            validUntilDay: '02.03.2028',
        };
        const result = generate({ user });
        expect(result).toEqual(
`P<RUSPETROV<<IVAN<<<<<<<<<<<<<<<<<<<<<<<<<<<
1234567897RUS8302010M2803021<<<<<<<<<<<<<<04`);
    });

});

