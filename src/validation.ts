#!/usr/bin/env node

import {InputDateFormat, SampleInputDate} from './index';

import * as moment from 'moment';

import { Country, UserInfo } from 'mrz-gen';

/* tslint:disable-next-line:no-var-requires */
const countries:Country[] = require('../data/countries.json');

/*
 * validateUserInfo: function to validate required user information
 * @params: user of type UserInfo
 * @returns: string[]
*/
export const validateUserInfo = (user: UserInfo): string[] => {

    const error = [];

    if(isEmpty(user.firstName)) {
        error.push('User first name is required');
    }

    if(isEmpty(user.lastName)) {
        error.push('User last name is required');
    }

    if(user.passportNumber.length > 9) {
        error.push('Passport number is invalid');
    }

    // validate country code
    const cErr = isValidCountryCode(user.countryCode, 'country');
    if (cErr) {
        error.push(cErr);
    }

    // validate nationality code
    const nErr = isValidCountryCode(user.nationality, 'nationality');
    if (nErr) {
        error.push(nErr);
    }

    // validate birthdate
    const bErr = isValidDate(user.birthday, 'birthday');
    if (bErr) {
        error.push(bErr);
    }

    // validate passport validity date
    const vErr = isValidDate(user.validUntilDay, 'validUntilDay');
    if (vErr) {
        error.push(vErr);
    }

    return error;
    
}

/*
 * isEmpty: function to check if value is empty
 * @params: inp of type string
 * @returns: boolean
*/
const isEmpty = (inp: string): boolean => {

    if(!inp ||  inp === '') {
        return true;
    }

    return false;

}

/*
 * isValidCountryCode: function to validate country code against the list of countries
 * @params: code of type string and fieldName of type string
 * @returns: string or null
*/
const isValidCountryCode = (code: string, fieldName: string): (string | null) => {

    if (code === '') {
        return `${fieldName} is required`;
    }

    if(code.length > 3) {
        return `${fieldName} length must be 3`;
    }

    code = code.toUpperCase();

    const country = countries.find(c => c.code === code);
    if (!country) {
        return `${fieldName} in invalid`;
    }

    return null;

}

/*
 * isValidDate: function to check if date is valid
 * @params: inp of type string and fieldName of type string
 * @returns: string or null
*/
const isValidDate = (input: string, fieldName: string): (string | null) => {

    if(input === '') {
        return `${fieldName} is required`;
    }

    const date = moment(input, InputDateFormat, true);
    if(!date.isValid()) {
        return `${fieldName} is not valid. Valid format is ${InputDateFormat} (eg: ${SampleInputDate})`;
    }

    if(fieldName === 'birthday') {
        if(moment(date).isAfter(moment())) {
            return `${fieldName} cannot be in future`;
        }
    }

    if(fieldName === 'validUntilDay') {
        if(moment(date).isBefore(moment())) {
            return `${fieldName} cannot be in past`;
        }
    }

    return null;

}
