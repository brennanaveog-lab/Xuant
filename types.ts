
export interface Source {
  uri: string;
  title: string;
  type: 'primary' | 'secondary';
}

export interface TopicEvaluationCard {
  title: string;
  triggeringEvent: string;
  targetAudience: string;
  impactedIndustries: string;
  writingAngles: string[];
  blindSpot: string;
  actionPackage: string[];
  noveltySignal: string;
  score: number;
  scoreExplanation: string;
  primarySources: Source[];
  secondarySources: Source[];
}

export interface SearchState {
  loading: boolean;
  error: string | null;
  results: TopicEvaluationCard[];
}
