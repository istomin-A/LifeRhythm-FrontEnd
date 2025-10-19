import type { MenuItem } from './header.type'
import AccountIcon from '@/shared/images/user.svg?react'

export const menuItems: MenuItem[] = [
  {
    close: false,
    label: "Registration",
    path: "registration",
    icon: null,
    link: "",
  },
  {
    close: false,
    label: "Login",
    path: "login",
    icon: null,
    link: "",
  },
  {
    close: true,
    label: "",
    path: "account",
    icon: AccountIcon,
    link: "",
  },
]