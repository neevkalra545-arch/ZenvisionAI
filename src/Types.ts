export type ImageType = 'normal' | 'infrared' | 'thermal' | 'digital-negative';

export type ProcessingMode = 'false-color' | 'enhance' | 'grayscale-to-color' | 'negative';

export interface ProcessedImage {
  originalDataUrl: string;
  processedDataUrl: string;
  imageType: ImageType;
  mode: ProcessingMode;
  width: number;
  height: number;
}

export interface AnalysisResult {
  vegetationCoverage: number;
  waterBodies: number;
  urbanAreas: number;
  thermalIntensity: number;
  cloudCoverage: number;
  dominantFeatures: string[];
  spectralSummary: string;
  confidenceScore: number;
}

export type AppPage = 'upload' | 'processing' | 'result';
