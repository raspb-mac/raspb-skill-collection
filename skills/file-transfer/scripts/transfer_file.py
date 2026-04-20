import sys
import shutil
import os
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 transfer_file.py <source_path>")
        sys.exit(1)

    source_path = Path(sys.argv[1])
    transfer_dir = Path("/home/node/.openclaw/workspace/transfers/downloads")
    
    if not source_path.exists():
        print(f"Error: Source file {source_path} not found.")
        sys.exit(1)

    if not transfer_dir.exists():
        transfer_dir.mkdir(parents=True, exist_ok=True)

    dest_path = transfer_dir / source_path.name
    
    try:
        shutil.copy2(source_path, dest_path)
        # Use a query parameter that we can catch in Nginx to force download
        download_url = f"https://claw.raspb.eu/downloads/{source_path.name}"
        print(f"File successfully copied to: {dest_path}")
        print(f"Download-Link: {download_url}")
    except Exception as e:
        print(f"Error during transfer: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
