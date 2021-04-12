/// <reference types="cypress" />
import "cypress-localstorage-commands"
import { login, password, foreignIncomes, token, declarationUrl } from "../support/config";

const classOpened = '[class*="spoilerOpened"]';
const getLoginInput = () => cy.get('input[inputmode="numeric"]:visible')
const getPasswordInput = () => cy.get('input.form_field[type="password"]')
const getLoginButton = () => cy.contains('button', 'войти', { matchCase: false })

const getSourceAddButton = () => cy.contains('button:visible', 'Добавить источник дохода', { matchCase: false })
const getForeignTab = () => cy.contains('li', 'За пределами РФ', {timeout: 10000})
const getLastSource = () => cy.get('div[class*="tabsContentActive" i] div[class*="incomeSourceSpoiler" i]').last()
const getIncomeSourceInput = () => cy.get(`${classOpened} input[id*="incomeSourceName" i]`)
const getIncomeCountrySelect = () => cy.get(`${classOpened} div[id*="oksm" i]`)
const getSelectPopup = () => cy.get('[class*="select-menu-outer" i]')
const getIncomeTypeCode = () => cy.get(`${classOpened} div[id*="incomeTypeCode" i]`)
const getIncomeTaxDeductionCode = () => cy.get(`${classOpened} div[id*="taxDeductionCode" i]`)
const getIncomeAmountCurrencyInput = () => cy.get(`${classOpened} input[id*="incomeAmountCurrency" i]`)
const getIncomeDateInput = () => cy.get(`${classOpened} div[id*="incomeDate" i] input`)
const getTaxPaymentDateInput = () => cy.get(`${classOpened} div[id*="taxPaymentDate" i] input`)
const getIncomeCurrencyCodeSelect = () => cy.get(`${classOpened} div[id*="currencyCode" i]`)
const getCurrencyAutoDetectionLabel = () => cy.contains(`${classOpened} label`, 'Определить курс автоматически')
const getPaymentAmountCurrency = () => cy.get(`${classOpened} input[name*="paymentAmountCurrency" i]`)

const getExitButton = () => cy.contains('button', 'выйти', { matchCase: false })
const getConfirmExitButton = () => cy.contains('.popup button', 'да', { matchCase: false })

describe('fill 3ndfl foreign incomes', () => {
    before(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    })
    it('log in to nalog.ru', () => {
        if (token) {
            cy.visit('https://lkfl2.nalog.ru/lkfl/')
            cy.setLocalStorage('token', token);
            cy.getLocalStorage('token');
            cy.visit('https://lkfl2.nalog.ru/lkfl/')
            cy.saveLocalStorage();
        } else if (login && password) {
            cy.visit('https://lkfl2.nalog.ru/lkfl/')
            getLoginInput().type(String(login))
            getPasswordInput().type(password)
            getLoginButton().click();
            cy.wait(2000)

            // первый вариант декларации
            cy.visit(declarationUrl)
            // cy.wait(5000)
            getForeignTab().click()
            foreignIncomes.forEach((el) => {
                getSourceAddButton().click()
                cy.wait(500)
                getLastSource().click()
                getIncomeSourceInput().type(el.name)
                getIncomeCountrySelect().click()
                getIncomeCountrySelect().find('input').type(String(el.countryCode))
                getSelectPopup().find('[role="option"]').click()

                getIncomeTypeCode().click()
                getIncomeTypeCode().find('input').type('1010')
                getSelectPopup().find('[role="option"]').click()

                getIncomeTaxDeductionCode().click()
                getIncomeTaxDeductionCode().find('input').type('не ')
                getSelectPopup().find('[role="option"]').click()

                getIncomeAmountCurrencyInput().type(String(el.totalAmount))

                getIncomeDateInput().type(el.date)
                getTaxPaymentDateInput().type(el.date)

                getIncomeCurrencyCodeSelect().click()
                // доход подразумевается всегда в доларах, валюта всегда 840
                getIncomeCurrencyCodeSelect().find('input').type('840')
                getSelectPopup().find('[role="option"]').click()

                getCurrencyAutoDetectionLabel().click()
                getPaymentAmountCurrency().type(String(el.tax))
            })

            getExitButton().click()
            getConfirmExitButton().click()
        }
    })
})