import os
import sys
import json
import urllib.request
import urllib.error

def github_api_call(endpoint, method="GET", data=None):
    token_path = ".secrets/github_token"
    if not os.path.exists(token_path):
        print(f"Error: GitHub token file not found at {token_path}")
        sys.exit(1)
        
    with open(token_path, "r") as f:
        token = f.read().strip()

    url = f"https://api.github.com/{endpoint}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "OpenClaw-Haley"
    }
    
    req = urllib.request.Request(url, headers=headers, method=method)
    
    try:
        body = json.dumps(data).encode("utf-8") if data else None
        with urllib.request.urlopen(req, data=body) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"API Error: {e.code} - {e.reason}")
        try:
            print(f"Body: {e.read().decode('utf-8')}")
        except: pass
        return None
    except Exception as e:
        print(f"General Error: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 github_client.py <user|repos|org_repos> [org_name]")
        sys.exit(1)
    
    action = sys.argv[1]
    
    if action == "user":
        res = github_api_call("user")
        print(json.dumps(res, indent=2) if res else "Failed")
        
    elif action == "repos":
        res = github_api_call("user/repos")
        if res:
            repo_names = [r['full_name'] for r in res]
            print(json.dumps(repo_names, indent=2))
        else:
            print("Failed to fetch user repos")

    elif action == "org_repos":
        org = sys.argv[2] if len(sys.argv) > 2 else "raspb-webservices"
        res = github_api_call(f"orgs/{org}/repos")
        if res:
            repo_names = [r['full_name'] for r in res]
            print(json.dumps(repo_names, indent=2))
        else:
            print(f"Failed to fetch repos for {org}")
