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
          loading: {
            app: 'Loading app...',
            offices: 'Loading offices...',
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
            addBtn: 'Add company'
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
            subscribe: 'Subscribe'
          },
          officeItem: {
            roomsAmount: 'Rooms amount',
            companyDescription: 'Company description'
          }
        }
      },
      ua: {
        translation: {
          loading: {
            app: 'Завантаження застосунку...',
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
            addBtn: 'Додати компанію'
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
            subscribe: 'Оформити підписку'
          },
          officeItem: {
            roomsAmount: 'Кількість кімнат',
            companyDescription: 'Опис компанії'
          }
        }
      }
    }
  });

export default i18n;