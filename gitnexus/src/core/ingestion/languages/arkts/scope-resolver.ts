/**
 * ArkTS `ScopeResolver` registered in `SCOPE_RESOLVERS` and
 * consumed by the generic `runScopeResolution` orchestrator.
 *
 * Inherits all features of the TypeScript scope resolver since
 * ArkTS is syntactically a subset/superset of TypeScript.
 */

import { SupportedLanguages } from 'gitnexus-shared';
import type { ScopeResolver } from '../../scope-resolution/contract/scope-resolver.js';
import { typescriptScopeResolver } from '../typescript/scope-resolver.js';
import { arktsProvider } from '../arkts.js';

export const arktsScopeResolver: ScopeResolver = {
  ...typescriptScopeResolver,
  language: SupportedLanguages.ArkTS,
  languageProvider: arktsProvider,
  importEdgeReason: 'arkts-scope: import',
};
