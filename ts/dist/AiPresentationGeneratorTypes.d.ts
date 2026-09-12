export interface Presentation {
    colorScheme?: string;
    content: string;
    createdAt?: string;
    downloadUrl?: string;
    expiresAt?: string;
    format?: string;
    id?: string;
    includeCharts?: boolean;
    language?: string;
    layout?: string;
    previewUrl?: string;
    slides?: number;
    status?: string;
    theme?: string;
    topic: string;
}
export interface PresentationLoadMatch {
    id: string;
}
export interface PresentationCreateData {
    colorScheme?: string;
    content: string;
    createdAt?: string;
    downloadUrl?: string;
    expiresAt?: string;
    format?: string;
    id?: string;
    includeCharts?: boolean;
    language?: string;
    layout?: string;
    previewUrl?: string;
    slides?: number;
    status?: string;
    theme?: string;
    topic: string;
}
