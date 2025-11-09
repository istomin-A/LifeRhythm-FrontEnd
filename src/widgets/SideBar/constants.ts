import type { MenuItem } from '@/widgets/Header/header.type'
import HomeIcon from '@/shared/images/home.svg?react'
import StatisticsIcon from '@/shared/images/statistics.svg?react'

export const menuItems: MenuItem[] = [
  {
    close: true,
    label: "home",
    icon: HomeIcon,
    path: "/LifeRhythm-FrontEnd/",
    link: "",
  },
  {
    close: true,
    label: "statistics",
    icon: StatisticsIcon,
    path: "statistics",
    link: "",
  },
]