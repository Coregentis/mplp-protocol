# MPLP Protocol Repository Sync Script (PowerShell)
# Usage: .\sync-to-protocol-repo.ps1 v1.0.4
# Purpose: Sync release content from development repository to public protocol repository

param(
    [Parameter(Mandatory=$true)]
    [string]$Version
)

$DevRepoPath = Get-Location
$ProtocolRepoPath = "..\MPLP-Protocol"
$ReleasePath = "release\$Version"

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Red
}

# Validation
if (-not (Test-Path $ReleasePath)) {
    Write-Error "❌ Error: Release directory $ReleasePath not found"
    Write-Warning "Please ensure the release has been prepared using the release guide."
    exit 1
}

# Validate release content
if (-not (Test-Path "$ReleasePath\README.md") -or -not (Test-Path "$ReleasePath\VERSION.json")) {
    Write-Error "❌ Error: Invalid release structure in $ReleasePath"
    Write-Warning "Missing required files: README.md or VERSION.json"
    exit 1
}

Write-Status "🚀 Starting sync to Protocol Repository..."
Write-Status "📦 Version: $Version"
Write-Status "📁 Source: $ReleasePath"
Write-Status "🎯 Target: https://github.com/Coregentis/MPLP-Protocol"

# Clone or update protocol repository
if (-not (Test-Path $ProtocolRepoPath)) {
    Write-Status "📥 Cloning Protocol Repository..."
    try {
        git clone https://github.com/Coregentis/MPLP-Protocol.git $ProtocolRepoPath
        if ($LASTEXITCODE -ne 0) {
            throw "Git clone failed"
        }
    }
    catch {
        Write-Error "❌ Failed to clone protocol repository: $_"
        exit 1
    }
} else {
    Write-Status "🔄 Updating Protocol Repository..."
    Push-Location $ProtocolRepoPath
    try {
        git pull origin master
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "⚠️  Warning: Failed to pull latest changes, continuing with existing state"
        }
    }
    catch {
        Write-Warning "⚠️  Warning: Failed to pull latest changes, continuing with existing state"
    }
    Pop-Location
}

# Sync content
Write-Status "📋 Syncing release content..."
Push-Location $ProtocolRepoPath

try {
    # Backup current state (optional)
    Write-Status "💾 Creating backup of current state..."
    git stash push -m "Backup before sync $Version" 2>$null

    # Clear existing content (except .git and .github)
    Write-Status "🧹 Clearing existing content..."
    Get-ChildItem -Path . -Exclude '.git', '.github' | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

    # Copy release content
    Write-Status "📂 Copying release content..."
    $SourcePath = Join-Path $DevRepoPath $ReleasePath
    Copy-Item -Path "$SourcePath\*" -Destination . -Recurse -Force

    # Verify copied content
    if (-not (Test-Path "README.md") -or -not (Test-Path "VERSION.json")) {
        throw "Critical files missing after copy"
    }

    # Configure git if needed
    git config user.name "MPLP Release Bot" 2>$null
    git config user.email "release@coregentis.com" 2>$null

    # Check for changes
    $gitStatus = git status --porcelain
    if (-not $gitStatus) {
        Write-Warning "⚠️  No changes detected, skipping commit"
        Pop-Location
        exit 0
    }

    # Commit and tag
    Write-Status "💾 Committing changes..."
    git add .
    $commitMessage = @"
🚀 Release MPLP $Version

- Synchronized from development repository
- Version: $Version
- Release date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss UTC')
- Source: MPLP-Protocol-Dev/release/$Version
"@
    
    git commit -m $commitMessage
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to commit changes"
    }

    # Create annotated tag
    Write-Status "🏷️  Creating release tag..."
    $tagMessage = @"
MPLP $Version

Multi-Agent Project Lifecycle Protocol
Release: $Version
Date: $(Get-Date -Format 'yyyy-MM-dd')
Repository: https://github.com/Coregentis/MPLP-Protocol
"@
    
    git tag -a $Version -m $tagMessage
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to create tag"
    }

    # Push to remote
    Write-Status "📤 Pushing to remote repository..."
    git push origin master
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to push changes to main branch"
    }

    git push origin $Version
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to push tag"
    }

    Write-Success "✅ Sync completed successfully!"
    Write-Success "🌐 Protocol Repository: https://github.com/Coregentis/MPLP-Protocol"
    Write-Success "🏷️  Release Tag: $Version"
    Write-Success "📊 Release URL: https://github.com/Coregentis/MPLP-Protocol/releases/tag/$Version"

    # Optional: Open release page
    $response = Read-Host "🌐 Open release page in browser? (y/N)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Start-Process "https://github.com/Coregentis/MPLP-Protocol/releases/tag/$Version"
    }

    Write-Success "🎉 MPLP $Version has been successfully released to the public repository!"
}
catch {
    Write-Error "❌ Error during sync process: $_"
    exit 1
}
finally {
    # Return to development repository
    Pop-Location
}