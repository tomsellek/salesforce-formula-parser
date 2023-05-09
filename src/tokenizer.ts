/*
*                      Copyright 2023 Salto Labs Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import moo from 'moo'
import _ from 'lodash'

const formulaLexer = moo.states({
  main: {
    whitespace: {
      match: /[\s\t\n\r]+/,
      lineBreaks: true,
    },
    comment: /\/\/.*?$/,
    number: /[0-9]+(?:\.[0-9]*)?(?![a-zA-Z_$[])/,
    string_start_dquote: { match: '"', next: 'string_dquote' },
    string_start_squote: { match: '\'', next: 'string_squote' },
    boolean: /(?:[tT][rR][uU][eE]|[fF][aA][lL][sS][eE])(?![a-zA-Z_0-9])/,
    identifier_prefix: /[[$](?!\s)/,
    identifier_part: /[a-zA-Z_]\w*/,
    identifier_suffix: /(?<!\s)]/,
    lparen: '(',
    rparen: ')',
    comma: ',',
    dot: '.',
    bop: ['+', '-', '/', '*', '=', '==', '&&', '||', '&', '|'],
    uop: '!',
  },
  string_dquote: {
    escaped_char: /\\./,
    string_contents: { match: /[^\\"]/, lineBreaks: true },
    string_end_dquote: { match: '"', next: 'main' },
  },
  string_squote: {
    escaped_char: /\\./,
    string_contents: { match: /[^\\']/, lineBreaks: true },
    string_end_squote: { match: '\'', next: 'main' },
  },
})

export const extractFormulaIdentifiers = (formula: string): string[] => {
  const isIdentifierStart = (currentToken: { type?: string }): boolean => (
    !!currentToken.type && ['identifier_prefix', 'identifier_part'].includes(currentToken.type)
  )
  const isIdentifierMiddleOrEnd = (currentToken: { type?: string }): boolean => (
    !!currentToken.type && ['identifier_part', 'dot', 'identifier_suffix'].includes(currentToken.type)
  )
  const isIdentifier = (token: {type?: string}): boolean => (
    !!token.type && ['identifier_prefix', 'identifier_part', 'dot', 'identifier_suffix'].includes(token.type)
  )
  const identifiers: string[] = []
  formulaLexer.reset(formula)
  let currentIdentifier = ''
  for (const token of formulaLexer) {
    if (isIdentifierStart(token)) {
      currentIdentifier += token.value
    } else if (currentIdentifier && isIdentifierMiddleOrEnd(token)) {
      currentIdentifier += token.value
    }
    if (currentIdentifier && !isIdentifier(token) && token.type !== 'whitespace') {
      if (token.type !== 'lparen') {
        // it's not a function call
        identifiers.push(currentIdentifier)
      }
      currentIdentifier = ''
    }
  }
  if (currentIdentifier) {
    identifiers.push(currentIdentifier)
  }
  return _.uniq(identifiers)
}
