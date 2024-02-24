import { ReactElement } from "react";

export interface OnboardingSlide {
  id: number;
  title: string;
  desc: string;
  animation: ReactElement;
}
