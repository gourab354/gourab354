import os
import random
import string
import time
import subprocess
from datetime import datetime

# File to use for dummy commits
DUMMY_FILE_PATH = "local_dummy_commit.txt"

def get_random_string(length=10):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for i in range(length))

def run_command(command):
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error executing command: {result.stderr}")
    return result.returncode == 0

def main():
    num_actions = random.randint(1, 3)
    print(f"Planning {num_actions} local commits for today.")

    for i in range(num_actions):
        print(f"\nAction {i+1}/{num_actions}:")
        
        # 1. Update the file
        random_content = f"Update timestamp: {datetime.now().isoformat()} - {get_random_string()}\n"
        with open(DUMMY_FILE_PATH, "a") as f:
            f.write(random_content)
            
        print("Updated dummy file.")
        
        # 2. Git add
        if not run_command(f"git add {DUMMY_FILE_PATH}"):
            continue
            
        # 3. Git commit
        commit_msg = f"Automated local update {get_random_string(5)} [skip ci]"
        if not run_command(f'git commit -m "{commit_msg}"'):
            continue
            
        print(f"Successfully committed.")
        
        # Sleep a bit between actions
        if i < num_actions - 1:
            sleep_time = random.randint(2, 5)
            print(f"Sleeping for {sleep_time} seconds before next action...")
            time.sleep(sleep_time)

    print("\nPushing to remote...")
    if run_command("git push"):
        print("Successfully pushed all automated commits!")
    else:
        print("Failed to push to remote.")

if __name__ == "__main__":
    main()
