export interface IMailable {
  to: string;
  from?: string;
  subject: string;
  template: string;
  getContext: () => object;
}
