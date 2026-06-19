export declare class MailService {
    private transporter;
    private readonly logger;
    constructor();
    sendOrderNotificationEmailToAdmins(newOrder: any, adminEmails: string[]): Promise<void>;
}
