// Shared API response types

export interface ApiDomain {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  facts: string[];
  mapConfig: {
    markerColor: string;
    hoverFill: string;
    baseFill: string;
    strokeColor: string;
    accentGradient: string;
    backLabel: string;
  };
  timeline?: {
    minYear: number;
    maxYear: number;
    defaultYear: number;
    eras: ApiTimelineEra[];
    accentColor: string;
  };
}

export interface ApiTimelineEra {
  label: string;
  start: number;
  end: number;
}

export interface ApiMapItem {
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  details?: string;
  year?: number;
  yearLabel?: string;
  startYear?: number;
  endYear?: number;
  yearMya?: number;
}

export interface ApiCountryInfo {
  name: string;
  description: string;
}

export interface ApiTimelineEvent {
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  startYear?: number;
  endYear?: number;
  yearMya?: number;
}

export interface ApiContinentalPosition {
  period: string;
  yearMya: number;
  description: string;
  continents: {
    name: string;
    coordinates: [number, number];
    label: string;
  }[];
}

// Lesson & Slide types
export interface ApiSlide {
  id: string;
  lessonId: string;
  order: number;
  title: string;
  content: string;
  mapItemIds: string[];
  imageUrl?: string;
}

export interface ApiLesson {
  id: string;
  domain: string;
  title: string;
  description: string;
  coverImage?: string;
  slides: ApiSlide[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiStudentProgress {
  lessonId: string;
  studentId: string;
  completedSlides: number;
  totalSlides: number;
  lastSlideId?: string;
  completionPercent: number;
  updatedAt: string;
}

// Wrapped backend response types
export interface DomainsResponse {
  domains: ApiDomain[];
}

export interface DomainResponse {
  domain: ApiDomain;
}

export interface DomainItemsResponse {
  items: ApiMapItem[];
  total: number;
}

export interface DomainTimelineResponse {
  eras: ApiTimelineEra[];
  events: ApiTimelineEvent[];
  total: number;
}

export interface CountriesResponse {
  countries: ApiCountryInfo[];
  total: number;
}

export interface LessonsResponse {
  lessons: ApiLesson[];
  total: number;
}

export interface LessonResponse {
  lesson: ApiLesson;
}

export interface SlideResponse {
  slide: ApiSlide;
}

export interface StudentProgressResponse {
  progress: ApiStudentProgress[];
}

export interface StudentLessonProgressResponse {
  progress: ApiStudentProgress;
}
