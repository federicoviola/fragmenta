import requests
from stellar_sdk import Keypair, Network, Server, TransactionBuilder

def publish_to_stellar(fragment_hash, ittybitty_url, secret_key=None):
    server = Server("https://horizon-testnet.stellar.org")
    network_passphrase = Network.TESTNET_NETWORK_PASSPHRASE

    # Crear o usar clave existente
    if secret_key is None:
        kp = Keypair.random()
        print(f"🔐 Generated account:\nPublic: {kp.public_key}\nSecret: {kp.secret}")
        # Cargar fondos con friendbot
        friendbot_url = f"https://friendbot.stellar.org/?addr={kp.public_key}"
        response = requests.get(friendbot_url)
        if response.status_code != 200:
            raise Exception("Friendbot funding failed")
    else:
        kp = Keypair.from_secret(secret_key)

    try:
        account = server.load_account(kp.public_key)

        # Limitar datos a 64 bytes cada uno
        url_trimmed = ittybitty_url.encode()[:64]
        hash_trimmed = fragment_hash.encode()[:64]

        tx = (
            TransactionBuilder(account, network_passphrase)
            .add_text_memo("Fragmenta")
            .append_manage_data_op("fragment_hash", hash_trimmed)
            .append_manage_data_op("ittybitty", url_trimmed)
            .set_timeout(30)
            .build()
        )

        tx.sign(kp)
        result = server.submit_transaction(tx)

        print("✅ Transaction successful!")
        print(f"🔗 Explorer: https://stellar.expert/explorer/testnet/account/{kp.public_key}")
        return result

    except Exception as e:
        print("❌ Error submitting transaction:", e)
        return None

