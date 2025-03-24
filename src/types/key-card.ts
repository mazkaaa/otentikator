import { IOTPFormat } from "./otp-format";

export interface IKeyCard extends IOTPFormat {
  id: string;
  createdAt: string;
}
