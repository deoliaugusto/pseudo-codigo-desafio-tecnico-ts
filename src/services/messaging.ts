import AWS from './'

export class Messaging {
  private readonly _messagingService = new AWS.SQS();

  get messagingService(): Messaging {
    return this._messagingService;
  }

  notify(createdQueue: string, createdOrder: string): void {
    AWS.SQS.notify(createdQueue, createdOrder);
  }
}
