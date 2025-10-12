import type { InputHTMLAttributes } from 'react';

export type InputType = InputHTMLAttributes<HTMLInputElement> & {
  search?: boolean
}