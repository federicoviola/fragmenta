from flask import Flask, render_template, request
from html_builder import build_html
from bitty_compressor import generate_bitty_url
from pathlib import Path
import tempfile

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    generated_url = None
    ascii_input = ""

    if request.method == "POST":
        ascii_input = request.form["ascii_art"]

        with tempfile.NamedTemporaryFile(delete=False, suffix=".html") as tmp_file:
            html_path = build_html(ascii_input, output_path=Path(tmp_file.name))
            generated_url = generate_bitty_url(html_path)

    return render_template("web_form.html", generated_url=generated_url, ascii_input=ascii_input)

if __name__ == "__main__":
    app.run(debug=True)

