/**
 * ArkTS (.ets): symbol parsing, import resolution, component calls, and relationship mapping
 */
import { describe, it, expect, beforeAll } from 'vitest';
import path from 'path';
import {
  FIXTURES,
  getRelationships,
  getNodesByLabel,
  runPipelineFromRepo,
  type PipelineResult,
} from './helpers.js';

describe('ArkTS support', () => {
  let result: PipelineResult;

  beforeAll(async () => {
    result = await runPipelineFromRepo(path.join(FIXTURES, 'arkts-basic'), () => {});
  }, 60000);

  // -------------------------------------------------------------------------
  // File nodes exist for .ets files
  // -------------------------------------------------------------------------

  it('creates File nodes for .ets files', () => {
    const files = getNodesByLabel(result, 'File');
    expect(files.some((f) => f.endsWith('.ets'))).toBe(true);
    expect(files.some((f) => f.endsWith('EntryComponent.ets'))).toBe(true);
    expect(files.some((f) => f.endsWith('ButtonComponent.ets'))).toBe(true);
    expect(files.some((f) => f.endsWith('utils.ets'))).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Symbol extraction from ArkTS
  // -------------------------------------------------------------------------

  it('extracts Function nodes from ArkTS files', () => {
    const functions = getNodesByLabel(result, 'Function');
    expect(functions).toContain('formatUser');
  });

  it('extracts Interface nodes from ArkTS files', () => {
    const interfaces = getNodesByLabel(result, 'Interface');
    expect(interfaces).toContain('User');
  });

  // -------------------------------------------------------------------------
  // Import resolution: .ets files
  // -------------------------------------------------------------------------

  it('resolves imports between ArkTS files', () => {
    const imports = getRelationships(result, 'IMPORTS');
    const importToUtils = imports.filter(
      (e) =>
        e.sourceFilePath.endsWith('EntryComponent.ets') && e.targetFilePath.endsWith('utils.ets'),
    );
    expect(importToUtils.length).toBeGreaterThanOrEqual(1);

    const importToBtn = imports.filter(
      (e) =>
        e.sourceFilePath.endsWith('EntryComponent.ets') &&
        e.targetFilePath.endsWith('ButtonComponent.ets'),
    );
    expect(importToBtn.length).toBeGreaterThanOrEqual(1);
  });

  // -------------------------------------------------------------------------
  // Cross-file function calls
  // -------------------------------------------------------------------------

  it('resolves CALLS edges from .ets to .ets functions', () => {
    const calls = getRelationships(result, 'CALLS');
    const callsToFormat = calls.filter(
      (e) => e.sourceFilePath.endsWith('EntryComponent.ets') && e.target === 'formatUser',
    );
    expect(callsToFormat.length).toBeGreaterThanOrEqual(1);
  });
});
