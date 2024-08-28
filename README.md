## Description

в файле .env изменить данные для подключения к бд

## Installation

```bash
#перейти в service_customer
$ cd service_customer

#установка зависимостей
$ yarn

#запуск (express + ts)
$ yarn start

#открыть новый терминал и перейти в service_reports
$ cd service_reports

#создать сущность в бд
$ yarn prisma db push

#установка зависимостей
$ yarn

#запуск (nestjs)
$ yarn start dev
```
