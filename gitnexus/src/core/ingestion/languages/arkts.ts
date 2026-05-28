/**
 * HarmonyOS ArkTS language provider.
 *
 * ArkTS is a subset/superset of TypeScript, tailored for static typing and UI components.
 * This provider reuses TypeScript infrastructure — queries, type config, field
 * extraction, and named binding extraction, specialized for ArkTS specific patterns.
 */

import { SupportedLanguages } from 'gitnexus-shared';
import type { AstFrameworkPatternConfig } from '../language-provider.js';
import { defineLanguage } from '../language-provider.js';
import { createClassExtractor } from '../class-extractors/generic.js';
import { typescriptClassConfig } from '../class-extractors/configs/typescript-javascript.js';
import { typeConfig as typescriptConfig } from '../type-extractors/typescript.js';
import { tsExportChecker } from '../export-detection.js';
import { createImportResolver } from '../import-resolvers/resolver-factory.js';
import { typescriptImportConfig } from '../import-resolvers/configs/typescript-javascript.js';
import { extractTsNamedBindings } from '../named-bindings/typescript.js';
import { TYPESCRIPT_QUERIES } from '../tree-sitter-queries.js';
import { typescriptFieldExtractor } from '../field-extractors/typescript.js';
import { createVariableExtractor } from '../variable-extractors/generic.js';
import { typescriptVariableConfig } from '../variable-extractors/configs/typescript-javascript.js';
import { createCallExtractor } from '../call-extractors/generic.js';
import { typescriptCallConfig } from '../call-extractors/configs/typescript-javascript.js';
import { createHeritageExtractor } from '../heritage-extractors/generic.js';
import { createMethodExtractor } from '../method-extractors/generic.js';
import { typescriptMethodConfig } from '../method-extractors/configs/typescript-javascript.js';
import { tsExtractFunctionName, BUILT_INS as TS_BUILT_INS } from './typescript.js';
import {
  emitTsScopeCaptures,
  interpretTsImport,
  interpretTsTypeBinding,
  tsBindingScopeFor,
  tsImportOwningScope,
  tsReceiverBinding,
  typescriptMergeBindings,
  typescriptArityCompatibility,
  resolveTsImportTarget,
} from './typescript/index.js';

const ARKTS_SPECIFIC_BUILT_INS = [
  'AppStorage',
  'PersistentStorage',
  'Environment',
  'Context',
  'UIContext',
  'router',
  'promptAction',
  'postCardAction',
  'getSharedAsync',
] as const;

const ARKTS_BUILT_INS: ReadonlySet<string> = new Set([...TS_BUILT_INS, ...ARKTS_SPECIFIC_BUILT_INS]);

export const arktsProvider = defineLanguage({
  id: SupportedLanguages.ArkTS,
  extensions: ['.ets'],
  entryPointPatterns: [/^use[A-Z]/],
  astFrameworkPatterns: [
    {
      framework: 'harmonyos',
      entryPointMultiplier: 3.0,
      reason: 'harmonyos-entry-decorator',
      patterns: ['@Entry', '@Component', 'struct'],
    },
  ] satisfies AstFrameworkPatternConfig[],
  treeSitterQueries: TYPESCRIPT_QUERIES,
  typeConfig: typescriptConfig,
  exportChecker: tsExportChecker,
  importResolver: createImportResolver(typescriptImportConfig),
  namedBindingExtractor: extractTsNamedBindings,
  callExtractor: createCallExtractor(typescriptCallConfig),
  fieldExtractor: typescriptFieldExtractor,
  methodExtractor: createMethodExtractor({
    ...typescriptMethodConfig,
    extractFunctionName: tsExtractFunctionName,
  }),
  variableExtractor: createVariableExtractor(typescriptVariableConfig),
  classExtractor: createClassExtractor(typescriptClassConfig),
  heritageExtractor: createHeritageExtractor(SupportedLanguages.ArkTS),
  builtInNames: ARKTS_BUILT_INS,

  // ── RFC #909 Ring 3: scope-based resolution hooks ──────────────────
  emitScopeCaptures: emitTsScopeCaptures,
  interpretImport: interpretTsImport,
  interpretTypeBinding: interpretTsTypeBinding,
  bindingScopeFor: tsBindingScopeFor,
  importOwningScope: tsImportOwningScope,
  mergeBindings: (_scope, bindings) => typescriptMergeBindings(bindings),
  receiverBinding: tsReceiverBinding,
  arityCompatibility: typescriptArityCompatibility,
  resolveImportTarget: resolveTsImportTarget,
});
