
export type Page = 'home' | 'registration' | 'bundles' | 'payment' | 'activation';

export interface Bundle {
    id: string;
    nameKey: string;
    data: string;
    price: number;
    descriptionKey: string;
}

export interface RegistrationFormData {
    fullName: string;
    atNumber: string;
    gender: 'Male' | 'Female' | 'Other' | '';
    dob: string;
    location: string;
    idType: 'Ghana Card';
    idNumber: string;
    idFront: File | null;
    selfieWithId: File | null;
    nextOfKin: string;
    customerType: 'Existing';
    alternativeNumber: string;
    email: string;
    freqDialedNumber1: string;
    freqDialedNumber2: string;
    atMoneyBalance: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface BlogPost {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  publishedDate: string;
}