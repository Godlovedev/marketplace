export declare class MailService {
    private resend;
    private readonly logger;
    constructor();
    sendOrderNotificationEmailToAdmins(newOrder: any): Promise<void>;
}
