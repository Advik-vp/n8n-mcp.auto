/**
 * Copyright (c) 2024 AiAdvisors Romuald Czlonkowski
 * Licensed under the Sustainable Use License v1.0
 */
/**
 * MCP Apps UI type definitions
 */

export interface UIAppConfig {
  id: string;
  displayName: string;
  description: string;
  uri: string;
  mimeType: string;
  toolPatterns: string[];
}

export interface UIMetadata {
  ui: {
    resourceUri: string;
  };
}

export interface UIAppEntry {
  config: UIAppConfig;
  html: string | null;
}
