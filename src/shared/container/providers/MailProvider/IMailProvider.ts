interface IMailProvider {
  sandMail(to: string, subject: string, body: string): Promise<void>;
}
export { IMailProvider };
