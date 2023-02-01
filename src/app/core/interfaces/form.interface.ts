
// Froms Response Interface
export interface formResInterface {
  id: string,
  title: string,
  description: string,
  created: string
}

// Answers Response Interface
export interface answerResInterface {
  id?: number;
  formId: string;
  questionId: number;
  value: string;
  userToken?: string;
}

// Question Response Interface
export interface questionResInterface {
  id?: number;
  formId: string;
  label: string;
  type: string;
  formControlName: string;
  options?: string[];
  hint?: string;
  placeholder?: string;
}

// Forms Response Interface
export interface formsInterface extends formResInterface {
  questions?: questionResInterface[];
  answers?: answerResInterface[];
}
