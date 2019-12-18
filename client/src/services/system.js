import LocalizedStrings from 'react-localization'
import { en } from '../config/locales/en'
import { vi } from '../config/locales/vi'
import Cookies from 'universal-cookie'
import { ListenService } from './listen'

export const locale = new LocalizedStrings(
    {
        en: en,
        vi: vi
    }
)

export const cookie = new Cookies()

export const global = {
    lang: {
        en: 'en',
        vi: 'vi'
    }
}

export const cookieM = {
    currentLang: () => {
        const lang = cookieM.get('Lang') || global.lang.en
        return lang
    },
    setLang: (lang) => {
        cookie.set('lang', lang)
        locale.setLanguage(lang)
        ListenService.language.switchLang(lang)
    }
}