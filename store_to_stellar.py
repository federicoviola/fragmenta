from stellar_sdk import Keypair, Server, TransactionBuilder, Network, ManageData
import os

def publish_to_stellar(fragment_hash, ittybitty_url, secret_key=None):
    server = Server("https://horizon-testnet.stellar.org")
    network_passphrase = Network.TESTNET_NETWORK_PASSPHRASE

    # Generar clave nueva si no se pasó ninguna
    if secret_key is None:
        kp = Keypair.random()
        print(f"Generated new account:\nPublic: {kp.public_key}\nSecret: {kp.secret}")
        # Fondear desde friendbot
        import requests
        requests.get(f"https://friendbot.stellar.org/?addr={kp.public_key}")
    else:
        kp = Keypair.from_secret(secret_key)

    account = server.load_account(kp.public_key)

    tx = (
        TransactionBuilder(account, network_passphrase)
        .add_text_memo("Fragmenta")
        .append_manage_data_op("fragment_hash", fragment_hash.encode())
        .append_manage_data_op("ittybitty", ittybitty_url.encode()[:64])  # max 64 bytes
        .build()
    )

    tx.sign(kp)
    response = server.submit_transaction(tx)
    print("✅ Data uploaded to Stellar Testnet.")
    print(response)

# Ejemplo de uso
if __name__ == "__main__":
    fragment_hash = "abc123..."
    ittybitty_url = "https://itty.bitty.site/#data:text/html,..."
    publish_to_stellar(fragment_hash, ittybitty_url)

