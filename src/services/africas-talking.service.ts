import * as AfricasTalking from 'africastalking';

export class AfricasTalkingService {
  private client: any;

  constructor() {
    this.client = AfricasTalking({
      apiKey: process.env.AFRICAS_TALKING_API_KEY || '',
      username: process.env.AFRICAS_TALKING_USERNAME || ''
    });
  }

  /**
   * Send SMS via Africa's Talking
   * @param to Recipient phone number(s)
   * @param message Message to send
   * @returns Result of sending
   */
  async sendSms(to: string | string[], message: string): Promise<any> {
    try {
      const sms = this.client.SMS;
      const recipients = Array.isArray(to) ? to : [to];
      
      const result = await sms.send({
        to: recipients,
        message,
        from: '' // Optional: Custom sender ID
      });
      
      return result;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  /**
   * Make a voice call via Africa's Talking
   * @param to Phone number to call
   * @param url URL of audio file or voice response script
   * @returns Result of the call
   */
  async makeCall(to: string, url: string): Promise<any> {
    try {
      const voice = this.client.VOICE;
      
      const result = await voice.call({
        callFrom: '+xxxxxxxxxxxx', // Call number (must be purchased from Africa's Talking)
        callTo: [to],
        clientRequestId: Date.now().toString(),
        callUrl: url
      });
      
      return result;
    } catch (error) {
      console.error('Error making voice call:', error);
      throw error;
    }
  }
}