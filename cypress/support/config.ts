type TForeignIncome = {
    "date": string;
    "name": string;
    "countryCode": string | number;
    "tax": string | number;
    "amountAfterTax": string | number;
    "totalAmount": string | number;
}

export const login: string | number = '123321123123';
export const password: string = 'myStrongPa$$w0rd!';
export const token: string = null;
// пример ссылки, вместо 11111111 должен быть id нужной декларации
export const declarationUrl: string = 'https://lkfl2.nalog.ru/lkfl/situations/3NDFL?cardId=11111111&step=sheetA';

export const foreignIncomes: TForeignIncome[] = [
    // example
    {
        "date": "23.12.2020",
        "name": "Realty Income Corporation",
        "countryCode": "840",
        "tax": "0.56",
        "amountAfterTax": "1.31",
        "totalAmount": "1.87"
    },
    {
        "date": "23.12.2020",
        "name": "QUALCOMM Incorporated",
        "countryCode": "840",
        "tax": "0.13",
        "amountAfterTax": "1.17",
        "totalAmount": "1.3"
    },
    {
        "date": "29.12.2020",
        "name": "Bank of America Corporation",
        "countryCode": 840,
        "tax": 0.04,
        "amountAfterTax": 0.32,
        "totalAmount": 0.36
    }
]