export interface Value {
  value: string;
}

export interface TextDomain {
  type: "text";
  values: Value[];
}

export interface NumberDomain {
  type: "number";
  lowerbound: number;
  upperbound: number;
}

export interface Prediction {
  question: string;
  domain: TextDomain;
}

export interface Attribute {
  question: string;
  domain: TextDomain | NumberDomain;
}

export interface ExclusionCondition {
  index?: number;
  threshold: string | number;
  type: "EQ" | "NEQ" | "LTEQ";
}

export interface Exclusion {
  antecedent?: ExclusionCondition | ExclusionCondition[];
  consequent?:
    | ExclusionCondition
    | { type: "ClassRes"; value: string }
    | ExclusionCondition[];
  type: "BlatantEx" | "ValueEx" | "RelationshipEx";
  relation?: ExclusionCondition;
}

export interface Metadata {
  prediction: Prediction;
  attributes: Attribute[];
  exclusions: Exclusion[];
}

export interface ApiResponse {
  name: string;
  description: string;
  metadata: Metadata;
}

export interface DecisionData {
  id: string;
  modelInput: {
    [key: string]: number | string;
  };
  userInput: {
    [key: string]: number | string;
  };
  decision: string;
  confidence: number;
  model: string;
}

export interface EndpointState {
  error?: string;
  data?: ApiResponse;
  message?: string;
  url?: string;
  key?: string;
}

export interface ApiResultResponse {
  id: string;
  modelInputs: {
    [key: string]: number | string;
  };
  userInputs: {
    [key: string]: number | string;
  };
  confidence: number;
  decision: string;
}
