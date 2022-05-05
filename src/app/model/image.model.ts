export class Image {
  constructor(public imageUrl: string,
              public photographerName: string,
              public photographerUsername: string,
              public updatedAt: string,
              public expireDuration: number) {
  }
}
