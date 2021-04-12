# заполнение иностранных источников дохода в 3ндфл
используется cypress который проходится по массиву источников дохода и заполняет их на сайте nalog.ru

1. установить nodejs
2. из корня проекта выполнить `npm i`
3. заполнить конфигурацию в файле `/cypress/support/config.ts`
   - логин и пароль для входа на nalog.ru
   - ссылка на декларацию которую надо заполнить (страница доходы)
   - список зарубежных компаний, в соответствии с типом `TForeignIncome` валидировать может typescript в IDE
4. выполнить `npm start` и запустить в появившемся окне скрипт `3ndfl.spec.ts`

## ВАЖНО
из-за нехватки оперативной памяти может зависать во время работы, в таком случае список надо разбить на несколько частей и выполнять по очереди