#!/bin/bash
# Bash script to set up aliases for cool-animation-cli
# Run this script with: bash setup-aliases.sh or ./setup-aliases.sh

echo -e "\033[0;32mSetting up aliases for cool-animation-cli...\033[0m"

# Determine the bashrc file location
BASHRC="$HOME/.bashrc"

# Check if .bashrc exists, create if not
if [ ! -f "$BASHRC" ]; then
    touch "$BASHRC"
    echo -e "\033[0;33mCreated .bashrc at: $BASHRC\033[0m"
fi

# Define the aliases to add
ALIAS_BLOCK="
# Cool Animation CLI aliases
alias matrix='coolanim matrix'
alias starfield='coolanim starfield'
alias plasma='coolanim plasma'
alias fire='coolanim fire'
alias ss='coolanim matrix'  # screensaver
"

# Check if aliases already exist
if grep -q "Cool Animation CLI aliases" "$BASHRC"; then
    echo -e "\033[0;33mAliases already exist in $BASHRC!\033[0m"
else
    # Add aliases to .bashrc
    echo "$ALIAS_BLOCK" >> "$BASHRC"
    echo -e "\033[0;32m✓ Aliases added to $BASHRC!\033[0m"
    echo ""
    echo -e "\033[0;36mYou can now use:\033[0m"
    echo -e "\033[0;37m  matrix     - Show the matrix animation\033[0m"
    echo -e "\033[0;37m  starfield  - Show the starfield animation\033[0m"
    echo -e "\033[0;37m  plasma     - Show the plasma animation\033[0m"
    echo -e "\033[0;37m  fire       - Show the fire animation\033[0m"
    echo -e "\033[0;37m  ss         - Show the matrix screensaver\033[0m"
    echo ""
    echo -e "\033[0;33mRestart your terminal or run: source ~/.bashrc\033[0m"
fi