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

import { isCustom, isStandardRelationship, isUserField, isCustomMetadata,
  isCustomLabel, isCustomSetting, isObjectType, isRelationshipField,
  isSpecialPrefix, isParent, isParentField } from '../src/grammar'

describe('Formula grammar', () => {
  it('identify custom fields', () => {
    expect(isCustom('Account__C')).toBeTruthy()
    expect(isCustom('AccountId')).toBeFalsy()
  })

  it('identify standard relationships', () => {
    expect(isStandardRelationship('Account')).toBeTruthy()
    expect(isStandardRelationship('Account__r')).toBeFalsy()
    expect(isStandardRelationship('Lead__R')).toBeFalsy()
  })

  it('Should identify user fields', () => {
    expect(isUserField('Owner.FirstName')).toBeTruthy()
    expect(isUserField('Manager.FirstName')).toBeTruthy()
    expect(isUserField('CreatedBy.FirstName')).toBeTruthy()
    expect(isUserField('LastModifiedBY.FirstName')).toBeTruthy()
    // upper case
    expect(isUserField('OWNER.FirstName')).toBeTruthy()
    expect(isUserField('MANAger.FirstName')).toBeTruthy()
    expect(isUserField('CREATEDBy.FirstName')).toBeTruthy()
    expect(isUserField('lastmodifiEDBY.FirstName')).toBeTruthy()
  })

  it('should identify custom metadata', () => {
    expect(isCustomMetadata('$CustomMetadata.Trigger_Context_Status__mdt.SRM_Metadata_c.Enable_After_Insert__c')).toBeTruthy()
    // upper case
    expect(isCustomMetadata('$CustomMetadata.Trigger_Context_Status__mDT.SRM_Metadata_c.Enable_After_Insert__c')).toBeTruthy()
  })

  it('Should identify custom labels', () => {
    expect(isCustomLabel('$Label.SomeName')).toBeTruthy()
    // upper case
    expect(isCustomLabel('$LaBEL.SomeName')).toBeTruthy()
  })

  it('Should identify custom settings', () => {
    expect(isCustomSetting('$Setup.SomeName')).toBeTruthy()
    // upper case
    expect(isCustomSetting('$SeTUP.SomeName')).toBeTruthy()
  })

  it('Should identify object types', () => {
    expect(isObjectType('$ObjectType.Center__c.Fields.My_text_field__c')).toBeTruthy()
    // upper case
    expect(isObjectType('$ObjectTYPE.Center__c.Fields.My_text_field__c')).toBeTruthy()
  })

  it('Should identify relationship fields', () => {
    expect(isRelationshipField('Account.Name')).toBeTruthy()
    expect(isRelationshipField('Name')).toBeFalsy()
  })

  it('Should identify special prefixes', () => {
    expect(isSpecialPrefix('$Organization')).toBeTruthy()
    expect(isSpecialPrefix('$PROfile')).toBeTruthy()
    expect(isSpecialPrefix('$ObjectType')).toBeFalsy()
  })

  it('Should identify parent fields', () => {
    expect(isParentField('Account.Parent')).toBeFalsy()
    expect(isParentField('Account.parEnTid')).toBeTruthy()
  })

  test('Should identify parent relationships', () => {
    expect(isParent('ParentId')).toBeFalsy()
    expect(isParent('Parent')).toBeTruthy()
  })
})
