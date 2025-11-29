export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Volunteering {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Hobby {
  id: string;
  name: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

export type SectionType = 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'publications' 
  | 'awards' 
  | 'volunteering' 
  | 'hobbies' 
  | 'references' 
  | 'custom';

export interface SectionTitles {
  experience: string;
  education: string;
  skills: string;
  publications: string;
  awards: string;
  volunteering: string;
  hobbies: string;
  references: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  publications: Publication[];
  awards: Award[];
  volunteering: Volunteering[];
  hobbies: Hobby[];
  references: Reference[];
  customSections: CustomSection[];
  sectionTitles: SectionTitles;
  sectionOrder: (SectionType | string)[]; // string for custom section IDs
  colorScheme: ColorScheme;
}

export type TemplateType = 'modern' | 'creative';
