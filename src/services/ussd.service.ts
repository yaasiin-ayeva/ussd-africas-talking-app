export class UssdService {
    /**
     * Process USSD requests based on the received text
     * @param text The text received from the USSD request
     * @param phoneNumber The user's phone number
     * @returns The response to send to the user
     */
    async processUssdRequest(text: string, phoneNumber: string): Promise<string> {
        // Handle different levels of the USSD menu
        if (text === '') {
            // First access to the USSD application
            return this.getMainMenu();
        } else if (text === '1') {
            // User chose option 1 from the main menu
            return this.getCheckBalanceMenu();
        } else if (text === '2') {
            // User chose option 2 from the main menu
            return this.getSendMoneyMenu();
        } else if (text === '3') {
            // User chose option 3 from the main menu
            return this.getBuyAirtimeMenu();
        } else if (text.startsWith('2*')) {
            // Processing for sending money
            return this.processSendMoney(text, phoneNumber);
        } else if (text.startsWith('3*')) {
            // Processing for buying airtime
            return this.processBuyAirtime(text);
        } else {
            // Unrecognized option
            return 'END Invalid option. Please try again.';
        }
    }

    /**
     * Returns the main menu
     */
    private getMainMenu(): string {
        return 'CON Welcome to our mobile banking service\n' +
            '1. Check my balance\n' +
            '2. Send money\n' +
            '3. Buy airtime';
    }

    /**
     * Returns the balance check menu
     */
    private getCheckBalanceMenu(): string {
        // In a real case, you would retrieve the balance from a database
        const balance = 1500.75;
        return `END Your current balance is: $${balance}`;
    }

    /**
     * Returns the send money menu
     */
    private getSendMoneyMenu(): string {
        return 'CON Enter the recipient\'s phone number:';
    }

    /**
     * Returns the buy airtime menu
     */
    private getBuyAirtimeMenu(): string {
        return 'CON Enter the airtime amount to purchase:';
    }

    /**
     * Process sending money
     */
    private processSendMoney(text: string, senderPhone: string): string {
        const parts = text.split('*');

        if (parts.length === 2) {
            // User just entered the recipient's number
            return 'CON Enter the amount to send:';
        } else if (parts.length === 3) {
            // User entered the amount
            const recipientPhone = parts[1];
            const amount = parts[2];

            // In a real case, you would process the transaction here

            return `END You have sent $${amount} to ${recipientPhone}. Thank you for using our service!`;
        } else {
            return 'END An error occurred. Please try again.';
        }
    }

    /**
     * Process buying airtime
     */
    private processBuyAirtime(text: string): string {
        const parts = text.split('*');

        if (parts.length === 2) {
            const amount = parts[1];

            // In a real case, you would process the airtime purchase here

            return `END You have purchased $${amount} of airtime. Thank you for using our service!`;
        } else {
            return 'END An error occurred. Please try again.';
        }
    }
}