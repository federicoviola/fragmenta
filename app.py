from ascii_generator import get_ascii
from html_builder import build_html
from bitty_compressor import generate_bitty_url

if __name__ == "__main__":
    ascii_art = get_ascii()
    html_path = build_html(ascii_art, title="Fragmenta #1")
    url = generate_bitty_url(html_path)
    if url:
        print("\n✅ URL generada:")
        print(url)

