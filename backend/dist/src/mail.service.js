"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let MailService = MailService_1 = class MailService {
    transporter;
    logger = new common_1.Logger(MailService_1.name);
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
    }
    async sendOrderNotificationEmailToAdmins(newOrder, adminEmails) {
        if (!adminEmails || adminEmails.length === 0) {
            this.logger.warn('Aucun email admin trouvé, envoi annulé.');
            return;
        }
        try {
            const itemsHtml = newOrder.items
                .map((item) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${item.product?.name || `Produit #${item.productId}`}</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7; text-align: center;"><strong>x${item.quantity}</strong></td>
          </tr>
        `)
                .join('');
            await this.transporter.sendMail({
                from: `"R-livraisons" <${process.env.GMAIL_USER}>`,
                to: adminEmails.join(', '),
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
              <p style="margin: 4px 0;">📍 <strong>Point de retrait :</strong> ${newOrder.pickupLocation.toUpperCase()}</p>
              
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
                <span style="font-size: 14px; font-weight: bold; color: #1e3a8a;">Montant Total : ${newOrder.totalPrice.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>
        `,
            });
            this.logger.log(`Notification envoyée avec succès via Gmail à tous les admins.`);
        }
        catch (error) {
            this.logger.error(`Erreur Nodemailer`);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map