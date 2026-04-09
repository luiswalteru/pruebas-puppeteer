export interface ConfigurationStudent {
  id: string;
  name: string;
  lastname: string;
}

export interface EvaluationPeriod {
  id: string;
  name: string;
}

export interface SchoolGroup {
  id: string;
  name: string;
}

export interface Configuration {
  name: string;
  type: string;
  education_year_id: string;
  education_year_level: string;
  education_year_year: string;
  report_date_period: string;
  report_date: string;
  school_group: SchoolGroup;
  students: ConfigurationStudent[];
  evaluation_periods: EvaluationPeriod[];
  orientation: string;
  max_number_of_rows: string;
  font_size: string;
}

export interface ShowAverage {
  value: string;
  label: string;
}

export interface Advanced {
  evaluation_scale_id: string;
  show_averages: ShowAverage[];
  show_category_evaluation: boolean;
  show_materias: boolean;
}

export interface SchoolLogo {
  id: string;
  name: string;
  url: string;
}

export interface SignatureImage {
  id: string;
  name: string;
  url: string;
}

export interface Signature {
  title: string;
  name: string;
  signature_images: SignatureImage[];
}

export interface Signatures {
  signature_left: Signature;
  signature_right: Signature;
}

export interface InformationSchool {
  school_name: string;
  school_logo: SchoolLogo[];
}

export interface InformationContact {
  school_adress: string;
  school_phone: string;
  school_email: string;
}

export interface Certification {
  id: string;
  name: string;
  url: string;
}

export interface School {
  information_school: InformationSchool;
  signatures: Signatures;
  information_contact: InformationContact;
  certifications: Certification[];
}

export interface GroupAverage {
  average: string;
  averageCalculated: number;
}

export interface Category {
  id: string;
  name: string;
  average: string;
  averageCalculated: number;
}

export interface Period {
  id: string;
  average: string | null;
  averageCalculated: number | null;
  period: string;
  name: string;
  categories: Category[];
}
export interface SubPeriod {
  id: string;
  average: string | null;
  averageCalculated: number | null;
  period: string;
  name: string;
  subperiod: string;
  start_date: string;
  end_date: string;
  categories: Category[];
}

export interface CourseAverage {
  id: string;
  average: string | null;
  averageCalculated: number | null;
}

export interface Course {
  id: string;
  name: string;
  periods: Period[];
  subperiods: SubPeriod[];
  average: CourseAverage;
}

export interface Student {
  id: string;
  name: string;
  lastname: string;
  courses?: Course[];
  groupAverage?: GroupAverage;
}

export interface EvaluationReportRequest {
  reportId: string;
  schoolGuid: string;
  jobId: string;
  configuration: Configuration;
  advanced: Advanced;
  school: School;
  groupAverage: GroupAverage;
  students: Student[];
}
