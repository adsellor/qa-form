export interface QuestionOption {
  next: string | null;
}

export interface Question {
  text: string;
  type: 'boolean' | 'freetext';
  options: Record<string, QuestionOption>;
}

export interface Questions {
  [key: string]: Question;
}
