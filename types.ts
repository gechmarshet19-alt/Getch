export interface BannerState {
  businessName: string;
  title: string;
  subtitle: string;
  phone: string;
  imageUrl: string;
  isProcessing: boolean;
  error: string | null;
}

export enum ProcessingMode {
  NONE = 'NONE',
  CLEANING = 'CLEANING',
  GENERATING = 'GENERATING',
}