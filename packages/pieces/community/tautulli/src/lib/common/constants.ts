// tautulli/src/lib/common/constants.ts

export const WEBHOOK_SOURCES = ['public', 'admin', 'api', 'system'] as const;

export enum CUSTOM_FIELD_TYPE {
  TEXT = 'text',
  DROPDOWN = 'dropdown',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  MONEY = 'currency',
  DATE = 'date',
  DATETIME = 'datetime',
  LIST_BOX = 'listbox',
  MULTISELECT = 'multiselect',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  HIDDEN = 'hidden',
}
