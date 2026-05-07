export interface SwiftCodeOptions {
  message?: string | SwiftCodeMessage;
}

export interface SwiftCodeMessage {
  invalidFormat?: string;
  invalidLength?: string;
  [key: string]: string | undefined;
}
