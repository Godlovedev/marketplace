"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
let MailService = MailService_1 = class MailService {
    resend;
    logger = new common_1.Logger(MailService_1.name);
    constructor() {
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    async sendOrderNotificationEmailToAdmins(newOrder) {
        try {
            const itemsHtml = newOrder.items
                .map((item) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${item.product?.name || `Produit #${item.productId}`}</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7; text-align: center;"><strong>x${item.quantity}</strong></td>
          </tr>
        `)
                .join('');
            await this.resend.emails.send({
                from: 'R-livraisons <onboarding@resend.dev>',
                to: "emkagloria8@gmail.com",
                subject: `🚨 Nouvelle commande reçue ! (${newOrder.id})`,
                html: `
          <div style="font-family: sans-serif; color: #1a202c; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #1e3a8a; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; text-transform: uppercase;">Nouvelle Commande !</h1>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #eab308; font-weight: bold;">ID : ${newOrder.id}</p>
            </div>
            
            <div style="padding: 24px;">
              <h2 style="font-size: 14px; color: #4a5568; margin-top: 0;">Infos Client :</h2>
              <p style="margin: 4px 0;">👤 <strong>Nom :</strong> ${newOrder.customerName}</p>
              <p style="margin: 4px 0;">📞 <strong>Téléphone :</strong> ${newOrder.customerPhone}</p>
              <p style="margin: 4px 0;">📍 <strong>Point de retrait :</strong> ${newOrder.pickupLocation?.toUpperCase()}</p>
              
              <h2 style="font-size: 14px; color: #4a5568; margin-top: 24px;">Détails des articles :</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <thead>
                  <tr style="background-color: #f7fafc;">
                    <th style="padding: 8px; text-align: left; color: #718096;">Produit</th>
                    <th style="padding: 8px; text-align: center; color: #718096;">Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="margin-top: 24px; padding: 15px; background-color: #f8fafc; border-radius: 8px; text-align: right;">
                <span style="font-size: 14px; font-weight: bold; color: #1e3a8a;">Montant Total : ${newOrder.totalPrice?.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>
        `,
            });
            this.logger.log(`Notification envoyée avec succès via Resend à tous les admins.`);
        }
        catch (error) {
            this.logger.error(`Erreur Resend lors de l'envoi de l'e-mail :`, error);
            throw new common_1.InternalServerErrorException("Échec de l'envoi de l'e-mail de notification.");
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map