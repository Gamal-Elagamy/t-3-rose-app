type ThemeOption = 'light' | 'system' | 'dark';

export interface IThemeOptions {
  value: ThemeOption;
  icon: React.ReactNode;
  label: string;
}
