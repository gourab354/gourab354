import os
import random
import string
import time
from datetime import datetime
from github import Github, GithubException

# File to use for dummy commits
DUMMY_FILE_PATH = ".github_manager_dummy.txt"

def get_random_string(length=10):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for i in range(length))

def main():
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("Error: GITHUB_TOKEN environment variable is not set.")
        return

    g = Github(token)
    user = g.get_user()
    
    # Get all repos owned by the user (exclude forks and archived repos to be safe)
    print("Fetching repositories...")
    repos = []
    for repo in user.get_repos(affiliation="owner"):
        if not repo.fork and not repo.archived:
            repos.append(repo)
    
    if not repos:
        print("No suitable repositories found.")
        return

    # Decide how many commits to make (3 to 4 as requested)
    num_actions = random.randint(3, 4)
    print(f"Planning {num_actions} contribution actions for today.")

    for i in range(num_actions):
        repo = random.choice(repos)
        print(f"\nAction {i+1}/{num_actions}: Selected repository '{repo.name}'")
        
        try:
            default_branch = repo.default_branch
            
            random_content = f"Update timestamp: {datetime.now().isoformat()} - {get_random_string()}"
            commit_msg_update = "Automated update [skip ci]"
            commit_msg_revert = "Revert automated update [skip ci]"
            
            try:
                # Check if file exists
                contents = repo.get_contents(DUMMY_FILE_PATH, ref=default_branch)
                print(f"Updating existing dummy file in {repo.name}...")
                repo.update_file(contents.path, commit_msg_update, random_content, contents.sha, branch=default_branch)
                
                print(f"Reverting (deleting) dummy file in {repo.name}...")
                time.sleep(2)
                contents = repo.get_contents(DUMMY_FILE_PATH, ref=default_branch)
                repo.delete_file(contents.path, commit_msg_revert, contents.sha, branch=default_branch)
                
            except GithubException as e:
                if e.status == 404:
                    # File doesn't exist, create it
                    print(f"Creating dummy file in {repo.name}...")
                    repo.create_file(DUMMY_FILE_PATH, commit_msg_update, random_content, branch=default_branch)
                    
                    print(f"Reverting (deleting) dummy file in {repo.name}...")
                    time.sleep(2)
                    contents = repo.get_contents(DUMMY_FILE_PATH, ref=default_branch)
                    repo.delete_file(contents.path, commit_msg_revert, contents.sha, branch=default_branch)
                else:
                    print(f"Error accessing repository {repo.name}: {e}")
                    
            print(f"Successfully completed action on {repo.name}")
            
        except Exception as e:
            print(f"Failed to perform action on {repo.name}: {e}")

        # Sleep a bit between actions
        if i < num_actions - 1:
            sleep_time = random.randint(5, 15)
            print(f"Sleeping for {sleep_time} seconds before next action...")
            time.sleep(sleep_time)

    print("\nAll automated commits for today are complete!")

if __name__ == "__main__":
    main()
