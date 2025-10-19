export type MenuItem = {
  close: boolean;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null
  path?: string;
  link?: string;
}