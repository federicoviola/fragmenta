from flask import Flask, request, jsonify
from flask_cors import CORS
from store_to_stellar import publish_to_stellar

app = Flask(__name__)
CORS(app)  # permite conexiones desde React en localhost:3000

@app.route("/api/publish", methods=["POST"])
def publish():
    data = request.get_json()

    fragment_hash = data.get("hash")
    ittybitty_url = data.get("url")

    if not fragment_hash or not ittybitty_url:
        return jsonify({"error": "Missing hash or url"}), 400

    tx = publish_to_stellar(fragment_hash, ittybitty_url)

    if tx is None:
        return jsonify({"error": "Transaction failed"}), 500

    return jsonify({
        "success": True,
        "account": tx["source_account"],
        "explorer": f"https://stellar.expert/explorer/testnet/account/{tx['source_account']}",
        "tx_hash": tx["hash"],
    })

if __name__ == "__main__":
    app.run(debug=True)

