import { Router } from 'express';
import { UssdController } from '../controllers/ussd.controller';

const router = Router();
const ussdController = new UssdController();

router.post('/callback', ussdController.handleUssdRequest);

export { router as UssdRouter };