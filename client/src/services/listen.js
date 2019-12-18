import { Subject } from 'rxjs'

const subject = new Subject()

export const ListenService = {
  language: {
    switchLang: (lang) => subject.next({ lang: lang }),
    onSwitchLang: () => subject.asObservable()
  }
}