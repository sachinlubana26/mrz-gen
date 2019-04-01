import {InputDateFormat, OutputDateFormat} from './index';

import * as moment from 'moment';

import {UserInfo} from 'mrz-gen';

const NUMERIC_REGEXP = /[0-9]/g;
const NUMERIC_VALUE_BASE = 10;
const ALPHABET_REGEXP = /[a-z]/g;
const ALPHABET_START = 'a'.charCodeAt(0);
const ALPHABET_VALUE_START = 10;
const WEIGHTS = [7, 3, 1];
const FILLER: string = '<';
const DOCUMENT_TYPE = 'P';
const MAX_LINE_LENGTH = 44;

/*
 * modifyName: function to modify first name and last name
 * @params: inp of type string
 * @returns: string
*/
const modifyName = (inp: string): string => {
    return inp.toUpperCase().replace(/\`/ig, '').replace(/[^a-z]/ig, FILLER);
}

/*
 * modifyDocumentNumber: function to modify document number (personal number)
 * @params: inp of type string
 * @returns: string
*/
const modifyDocumentNumber = (inp: string): string => {
    return inp.replace(/(\s|\t)+/ig, '').toUpperCase();
}

/*
 * modifyDate: function to format date values (birthday, passport valid date)
 * @params: inp of type string
 * @returns: string
*/
const modifyDate = (inp: string): string => {
    return moment(inp, InputDateFormat, true).format(OutputDateFormat);
}

/*
 * modifyGender: function to identify gender
 * @params: inp of type string
 * @returns: string
*/
const modifyGender = (inp: string): string => {
    inp = inp.toUpperCase();
    if(['M','F'].indexOf(inp) !== -1) {
        return inp;
    }
    return FILLER;
}

/*
 * calculateCheckDigit: function to calculate check digit logic
 * @params: str of type string
 * @returns:
*/
const calculateCheckDigit = (str: string) => {

    const arr = str.split('');
    const valArr = arr.map((character: string, index: number) => {

        const char = character.toLowerCase();
        const weight = WEIGHTS[index % 3];

        let value = 0;

        if (char.match(ALPHABET_REGEXP) != null) {
            value = char.charCodeAt(0) - ALPHABET_START + ALPHABET_VALUE_START;
        }

        if (char.match(NUMERIC_REGEXP) != null) {
            value = parseInt(char, NUMERIC_VALUE_BASE);
        }

        if (char === FILLER) {
            value = 0;
        }

        return value * weight;

    })

    // 123456789 7 [ 7, 6, 3, 28, 15, 6, 49, 24, 9 ]
    // console.log(str, resp, valArr);
    
    return valArr.reduce((acc, value) => acc + value, 0) % NUMERIC_VALUE_BASE;

}

/*
 * buildLineFromParts: function to build line parts by joining them and adding FILLER as padding
 * @params: inp of type string
 * @returns: string
*/
export const buildLineFromParts = (value: (string | number)[]) : string  => {
    let resp = value.join('');
    if(resp.length < MAX_LINE_LENGTH) {
        resp = `${resp}${FILLER.repeat(MAX_LINE_LENGTH - resp.length)}`;
    }
    return resp;
}

/*
 * buildFirstLine: function to build first line of the MRZ code
 * @params: user of type UserInfo
 * @returns: string
*/
export const buildFirstLine = (user: UserInfo): string => {
    const country           = user.countryCode.toUpperCase();
    const firstName         = modifyName(user.firstName);
    const lastName          = modifyName(user.lastName);
    return buildLineFromParts([
        DOCUMENT_TYPE,
        FILLER,
        country,
        lastName,
        FILLER,
        FILLER,
        firstName
    ]);    
}

/*
 * buildSecondLine: function to build second line of the MRZ code
 * @params: user of type UserInfo
 * @returns: string
*/
export const buildSecondLine = (user: UserInfo): string => {
    const nationality       = user.nationality.toUpperCase();
    const passportNumber            = modifyDocumentNumber(user.passportNumber);
    const personalNumber            = modifyDocumentNumber(user.personalNumber);
    const birthday                  = modifyDate(user.birthday);
    const validUntilDay             = modifyDate(user.validUntilDay);
    const gender                    = modifyGender(user.gender);
    const passportCheckNumber       = calculateCheckDigit(passportNumber);
    const birthdayCheckNumber       = calculateCheckDigit(birthday);
    const validUntilDateCheckNumber = calculateCheckDigit(validUntilDay);
    const personalNumberCheckNumber = calculateCheckDigit(personalNumber);
    const controlCheckNumber        = calculateCheckDigit(buildLineFromParts([
        passportNumber,
        passportCheckNumber,
        birthday,
        birthdayCheckNumber,
        validUntilDay,
        validUntilDateCheckNumber,
        personalNumber,
        personalNumberCheckNumber,
    ]));

    return buildLineFromParts([
        passportNumber,
        passportCheckNumber,
        nationality,
        birthday,
        birthdayCheckNumber,
        gender,
        validUntilDay,
        validUntilDateCheckNumber,
        personalNumber,
        personalNumberCheckNumber,
        controlCheckNumber,
    ]);
}
