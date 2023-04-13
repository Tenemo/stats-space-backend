export type WDIRow = {
    [year: string]: string;
    'Country Name': string;
    'Country Code': string;
    'Indicator Name': string;
    'Indicator Code': string;
};

export type WDIRowResponse = {
    [year: string]: string;
    countryName: string;
    countryCode: string;
    indicatorName: string;
    indicatorCode: string;
};
