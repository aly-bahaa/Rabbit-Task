import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private pushover: any;

  constructor() {
    const Pushover = require('node-pushover');
    this.pushover = new Pushover({
      token: 'artd2mdtfmiigams1nmdazrqdeapxp', // Your Pushover API token
      user: 'ugvipc2o8ofow349wpe9p25wze79v8', // Your Pushover User Key
    });
  }

  async sendNotification(message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pushover.send('New Order', message, (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
