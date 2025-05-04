export class SmartWallet {
  constructor() {
    this.publicKey = this._generatePublicKey();
  }

  _generatePublicKey() {
    // Generador de clave estilo Stellar (falso)
    return "G" + Math.random().toString(36).substring(2).toUpperCase().padEnd(55, "A");
  }

  async connect() {
    return { publicKey: this.publicKey };
  }

  async sign(message) {
    const signature = btoa("signed:" + message);
    return {
      message,
      signature,
    };
  }
}

