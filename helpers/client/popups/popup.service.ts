import { BehaviorSubject } from 'rxjs';

const popupSubject = new BehaviorSubject("");
  
const getPopup = (popup:string) => {
    popupSubject.next(popup);
}

const remove = () => {
    popupSubject.next("");
};
export const popupService = {
    popup: popupSubject.asObservable(),
    get value () { return popupSubject.value },
    getPopup,
    remove,
};