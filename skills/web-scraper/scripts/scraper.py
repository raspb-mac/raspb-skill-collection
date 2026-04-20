import urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
import os
import sys
import time
import re

# Minimal HTML to Text converter using standard library
class HTMLToText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.links = []
        self.title = "No Title"
        self.in_title = False
        self.ignore_tags = {'script', 'style', 'header', 'footer', 'nav'}
        self.ignore_stack = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.ignore_tags:
            self.ignore_stack += 1
        if tag == 'title':
            self.in_title = True
        if tag == 'a':
            for attr, value in attrs:
                if attr == 'href':
                    self.links.append(value)

    def handle_endtag(self, tag):
        if tag in self.ignore_tags:
            self.ignore_stack -= 1
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.ignore_stack == 0:
            if self.in_title:
                self.title = data.strip()
            else:
                self.text.append(data)

def is_internal(url, base_domain):
    parsed = urlparse(url)
    return parsed.netloc == '' or parsed.netloc == base_domain

def scrape(base_url, max_pages=20):
    domain = urlparse(base_url).netloc
    base_dir = f"scrapes/{domain.replace('.', '_')}"
    os.makedirs(base_dir, exist_ok=True)
    
    visited = set()
    to_visit = [base_url]
    count = 0
    
    print(f"Starting scrape of {base_url} into {base_dir}")
    
    while to_visit and count < max_pages:
        url = to_visit.pop(0)
        if url in visited:
            continue
            
        try:
            print(f"Fetching: {url}")
            req = urllib.request.Request(url, headers={'User-Agent': 'OpenClaw-Scraper/1.0'})
            with urllib.request.urlopen(req, timeout=15) as response:
                if response.getcode() != 200:
                    continue
                html = response.read().decode('utf-8', errors='ignore')
                
            visited.add(url)
            count += 1
            
            parser = HTMLToText()
            parser.feed(html)
            
            # Save content
            path = urlparse(url).path
            if not path or path == '/':
                filename = "index.md"
            else:
                filename = re.sub(r'[/\\?%*:|"<>]', '_', path.strip('/')) + ".md"
            
            text_content = "\n".join([line.strip() for line in parser.text if line.strip()])
            
            with open(os.path.join(base_dir, filename), "w", encoding="utf-8") as f:
                f.write(f"--- \nsource: {url}\ntitle: {parser.title}\n---\n\n")
                f.write(text_content)
            
            # Find links
            for link in parser.links:
                full_url = urljoin(base_url, link).split('#')[0].rstrip('/')
                if is_internal(full_url, domain) and full_url not in visited:
                    if full_url not in to_visit:
                        to_visit.append(full_url)
            
            time.sleep(0.5) 
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    print(f"Scrape completed. Processed {count} pages.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 scraper.py <url> [max_pages]")
        sys.exit(1)
    
    target_url = sys.argv[1]
    max_p = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    scrape(target_url, max_p)
