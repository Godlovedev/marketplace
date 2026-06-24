import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    // Initialisation de Resend avec la variable d'environnement
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendOrderNotificationEmailToAdmins(newOrder: any): Promise<void> {

    try {
      // Génération du tableau des articles en HTML
      const itemsHtml = newOrder.items
        .map(
          (item: any) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${item.product?.name || `Produit #${item.productId}`}</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7; text-align: center;"><strong>x${item.quantity}</strong></td>
          </tr>
        `
        )
        .join('');

      // Envoi de l'e-mail avec le SDK Resend
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
    } catch (error) {
      this.logger.error(`Erreur Resend lors de l'envoi de l'e-mail :`, error);
      throw new InternalServerErrorException("Échec de l'envoi de l'e-mail de notification.");
    }
  }
}