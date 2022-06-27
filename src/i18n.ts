import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          login: 'Login to SmartWork',
          register: 'Sign up to SwartWork',
          loading: {
            app: 'Loading app...',
            offices: 'Loading offices...',
            companies: 'Loading companies...',
            rooms: 'Loading office rooms...',
            subscribeDetails: 'Loading subscribe details...',
            profile: 'Loading profile...',
            subscribes: 'Loading subscribes...'
          },
          discover: 'Discover',
          profile: {
            account: 'My profile',
            logOut: 'Log out',
            email: 'Email',
            phoneNumber: 'Phone number'
          },
          companies: {
            title: 'Companies',
            addBtn: 'Add company',
            description: 'Description'
          },
          offices: {
            name: 'Office'
          },
          rooms: 'Rooms',
          room: {
            workplaces: 'Workplaces',
            square: 'Square',
            number: 'Room number',
            amount: 'Rooms amount'
          },
          statistic: {
            name: 'Statistic',
            moving: 'Moving to selected room...',
            lighting: 'Lighting',
            climate: 'Climate',
            attendance: 'Attendance',
            day: 'Day',
            lumens: 'Lighting (lumen/m2)'
          },
          subscribe: {
            day: 'Subscribe for a day',
            week: 'Subscribe for a week',
            month: 'Subscribe for a month'
          },
          filters: {
            title: 'Filters',
            all: 'All',
            favorites: 'Favorites',
            my: 'My'
          },
          button: {
            edit: 'Edit',
            view: 'View',
            delete: 'Delete',
            close: 'Close',
            addRoom: 'Add room',
            manageOffice: 'Manage office',
            viewStatistic: 'View statistic',
            subscribe: 'Subscribe',
            login: 'Login',
            register: 'Register'
          },
          officeItem: {
            roomsAmount: 'Rooms amount',
            companyDescription: 'Company description'
          },
          home: {
            title: 'SmartWork. Find your place to work',
            subtitle: "Just check out the offices we have and let's subscribe to a place to work ;)",
            description: 'The software system of flexible selection of the workplace in coworking aims to provide a comfortable search for the coworking area, and the detail information about the workspace that is considering. SmartWork provides for the organization of transparent access to the review of technical and material equipment of the coworking area, available rooms, statistic of their temperature, lighting and attendance.',
            goTo: 'Go to ',
            offices: 'Offices'
          }
        }
      },
      ua: {
        translation: {
          login: 'Логін вікно SmartWork',
          register: 'Приєднайся до SmartWork',
          loading: {
            app: 'Завантаження застосунку...',
            companies: 'Завантаження компаній...',
            offices: 'Завантаження офісів...',
            rooms: 'Завантаження кімнат офісу...',
            subscribeDetails: 'Завантаження деталей підписок...',
            profile: 'Завантаження профілю...',
            subscribes: 'Завантаження підписок...'
          },
          discover : 'Пошук коворкінгу',
          profile: {
            account: 'Мій профіль',
            logOut: 'Вийти з профілю',
            email: 'Поштова скринька',
            phoneNumber: 'Номер телефону'
          },
          companies: {
            title: 'Компанії',
            addBtn: 'Додати компанію',
            description: 'Опис компанії'
          },
          offices: {
            name: 'Офіс'
          },
          rooms: 'Кімнати',
          room: {
            workplaces: 'Кількість робочих місць',
            square: 'Площа',
            number: 'Номер кімнати',
            amount: 'Кількість кімнат'
          },
          statistic: {
            name: 'Статистика',
            moving: 'Переміщаюсь до вибраної кімнати...',
            lighting: 'Освітлення',
            climate: 'Клімат',
            attendance: 'К/сть чол.',
            day: 'День',
            lumens: 'Освітлення (люмен/м2)'
          },
          subscribe: {
            day: 'Підписка за день',
            week: 'Підписка за тиждень',
            month: 'Підписка за місяц'
          },
          filters: {
            title: 'Фільтри',
            all: 'Усі',
            favorites: 'Популярні',
            my: 'Мої'
          },
          button: {
            edit: 'Відредагувати',
            view: 'Переглянути',
            delete: 'Видалити',
            close: 'Закрити',
            addRoom: 'Додати кімнату',
            manageOffice: 'Відредагувати офіс',
            viewStatistic: 'Стянути статистику',
            subscribe: 'Оформити підписку',
            login: 'Логін',
            register: 'Реєстрація'
          },
          officeItem: {
            roomsAmount: 'Кількість кімнат',
            companyDescription: 'Опис компанії'
          },
          home: {
            title: 'SmartWork. Знайди своє робоче місце',
            subtitle: 'Просто заціни офіси які ми маємо для тебе та оформляй підписку ;)',
            description: 'Програмна система гнучкого вибору робочого місця в коворкінгу має на меті забезпечити комфортний пошук коворкінг-зони та детальну інформацію про робочий простір, що розглядається. SmartWork передбачає організацію прозорого доступу до огляду технічного та матеріального оснащення коворкінгу, наявних кімнат, статистики їх температури, освітлення та відвідуваності.',
            goTo: 'Нумо перглядати ',
            offices: 'Офіси'
          }
        }
      }
    }
  });

export default i18n;