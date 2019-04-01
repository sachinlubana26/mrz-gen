#!/usr/bin/env node

import { GeneratorArgs } from 'mrz-gen';

import { EOL } from 'os';
import * as util from './util';
import * as validation from './validation';

export const generate = (args: GeneratorArgs): string => {

    const { user } = args;

    /* validate user information received */
    const error = validation.validateUserInfo(user);
    if(error.length > 0) {
        return error.join(' || ');
    }

    /* build first line of MRZ code */
    const firstLine = util.buildFirstLine(user);

    /* build second line of MRZ code */
    const secondLine = util.buildSecondLine(user);

    /* build final MRZ code */
    return util.buildLineFromParts([firstLine,EOL,secondLine]);
};


