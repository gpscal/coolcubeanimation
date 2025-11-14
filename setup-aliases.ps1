# PowerShell script to set up aliases for cool-animation-cli
# Run this script with: .\setup-aliases.ps1

Write-Host "Setting up aliases for cool-animation-cli..." -ForegroundColor Green

# Check if profile exists, create if not
if (!(Test-Path $PROFILE)) {
    New-Item -Path $PROFILE -Type File -Force | Out-Null
    Write-Host "Created PowerShell profile at: $PROFILE" -ForegroundColor Yellow
}

# Add aliases to profile
$aliasCommands = @"

# Cool Animation CLI aliases
function Show-CoolAnimation { 
    if (Get-Command coolanim -ErrorAction SilentlyContinue) {
        coolanim screensaver
    } else {
        node `"$PSScriptRoot\index.js`" screensaver
    }
}
Set-Alias -Name ss -Value Show-CoolAnimation -Option AllScope
Set-Alias -Name canim -Value Show-CoolAnimation -Option AllScope

"@

# Check if aliases already exist
$profileContent = Get-Content $PROFILE -ErrorAction SilentlyContinue
if ($profileContent -notmatch "Cool Animation CLI") {
    Add-Content -Path $PROFILE -Value $aliasCommands
    Write-Host "✓ Aliases added to profile!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now use:" -ForegroundColor Cyan
    Write-Host "  ss      - Show the animation screensaver" -ForegroundColor White
    Write-Host "  canim   - Show the animation screensaver" -ForegroundColor White
    Write-Host ""
    Write-Host "Restart your PowerShell or run: . `$PROFILE" -ForegroundColor Yellow
} else {
    Write-Host "Aliases already exist in profile!" -ForegroundColor Yellow
}

