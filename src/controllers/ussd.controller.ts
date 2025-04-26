import { Request, Response } from 'express';
import { UssdService } from '../services/ussd.service';

export class UssdController {
  private ussdService: UssdService;

  constructor() {
    this.ussdService = new UssdService();
  }

  handleUssdRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      const { sessionId, serviceCode, phoneNumber, text } = req.body;
      
      console.log('Session ID:', sessionId);
      console.log('Service Code:', serviceCode);
      console.log('Phone Number:', phoneNumber);
      console.log('Text:', text);

      const response = await this.ussdService.processUssdRequest(text, phoneNumber);
      
      res.contentType('text/plain');
      res.send(response);
    } catch (error) {
      console.error('Error processing USSD request:', error);
      res.status(500).send('END An error occurred');
    }
  }
}