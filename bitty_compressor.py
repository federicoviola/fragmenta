import subprocess
from pathlib import Path

def generate_bitty_url(input_html: Path):
    compressor_path = Path("compressor.js")
    if not compressor_path.exists():
        raise FileNotFoundError("compressor.js not found. Please make sure it's in the project root.")

    result = subprocess.run(
        ["node", str(compressor_path), str(input_html)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    if result.returncode != 0:
        print("❌ Compression failed:", result.stderr.decode())
        return None

    return result.stdout.decode().strip()

