import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'node-mailjet';

@Injectable()
export class MailService {
  private mailjet: Client;
  private readonly logger = new Logger(MailService.name);

  constructor(configService: ConfigService) {
    this.mailjet = new Client({
      apiKey: configService.get('MJ_APIKEY_PUBLIC'),
      apiSecret: configService.get('MJ_APIKEY_PRIVATE'),
    });
  }

  async sendMail({
    recipientEmail,
    subject,
    textPart,
    htmlPart,
  }: {
    recipientEmail: string;
    subject: string;
    textPart: string;
    htmlPart: string;
  }): Promise<void> {
    const request = this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'jimmylo1606@gmail.com',
          },
          To: [
            {
              Email: recipientEmail,
            },
          ],
          Subject: subject,
          TextPart: textPart,
          HTMLPart: htmlPart,
        },
      ],
    });

    try {
      await request;
      this.logger.log(`Email sent to ${recipientEmail}`);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Error while sending the email');
    }
  }
}
