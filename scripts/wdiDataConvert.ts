import path from 'path';
import { writeFile } from 'node:fs/promises';

import csvToJson from 'csvtojson';
import countryCodes from 'data/country_codes.json';

const WDI_FILENAME = 'WDIData.csv';

const countryCodesAlpha3: string[] = countryCodes.map(
    ({ alpha3 }) => alpha3,
    {},
);

type WdiDataRow = {
    'Indicator Code': string;
    'Country Code': string;
    field67: string;
};

void (async () => {
    const startTime = performance.now();
    // https://databank.worldbank.org/data/download/WDI_CSV.zip
    const wdiData: WdiDataRow[] = (await csvToJson().fromFile(
        path.join(process.cwd(), 'src/data/', WDI_FILENAME),
    )) as WdiDataRow[];

    const filename = `wdi_data.json`;

    const dataToSave = {
        gdp: wdiData
            .filter(
                (row) =>
                    row['Indicator Code'] === 'NY.GDP.MKTP.CD' &&
                    countryCodesAlpha3.includes(row['Country Code']),
            )
            .map(({ field67, ...row }) => ({ ...row })),
    };
    await writeFile(
        path.join(process.cwd(), 'src/data/', filename),
        JSON.stringify(dataToSave, null, 4),
        'utf8',
    );
    console.log(`\nWDI data in JSON saved to: output/${filename}`);
    console.log(
        `\nTook ${((performance.now() - startTime) / 1000).toFixed(
            2,
        )} seconds in total.`,
    );
})();
