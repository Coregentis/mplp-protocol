@echo off
setlocal enabledelayedexpansion

REM MPLP Quick Release Script for Windows
REM This script provides a convenient way to trigger different types of releases

REM Default values
set RELEASE_TYPE=patch
set ENVIRONMENT=staging
set DRY_RUN=false
set ENHANCED=false
set SKIP_SECURITY=false
set SKIP_APPROVAL=false
set USE_GITHUB_ACTIONS=false
set VERSION=

REM Get script directory
set SCRIPT_DIR=%~dp0
set PROJECT_ROOT=%SCRIPT_DIR%..

REM Colors (Windows doesn't support colors in batch easily, so we'll use text)
set INFO_PREFIX=[INFO]
set SUCCESS_PREFIX=[SUCCESS]
set WARNING_PREFIX=[WARNING]
set ERROR_PREFIX=[ERROR]

REM Function to show help
if "%1"=="--help" goto :show_help
if "%1"=="-h" goto :show_help
if "%1"=="/?" goto :show_help

REM Parse command line arguments
:parse_args
if "%1"=="" goto :validate_args

if "%1"=="-t" (
    set RELEASE_TYPE=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--type" (
    set RELEASE_TYPE=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="-e" (
    set ENVIRONMENT=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--environment" (
    set ENVIRONMENT=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="-v" (
    set VERSION=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--version" (
    set VERSION=%2
    shift
    shift
    goto :parse_args
)
if "%1"=="--enhanced" (
    set ENHANCED=true
    shift
    goto :parse_args
)
if "%1"=="--dry-run" (
    set DRY_RUN=true
    shift
    goto :parse_args
)
if "%1"=="--skip-security" (
    set SKIP_SECURITY=true
    shift
    goto :parse_args
)
if "%1"=="--skip-approval" (
    set SKIP_APPROVAL=true
    shift
    goto :parse_args
)
if "%1"=="--github-actions" (
    set USE_GITHUB_ACTIONS=true
    shift
    goto :parse_args
)

echo %ERROR_PREFIX% Unknown option: %1
goto :show_help

:validate_args
REM Validate release type
if not "%RELEASE_TYPE%"=="patch" if not "%RELEASE_TYPE%"=="minor" if not "%RELEASE_TYPE%"=="major" (
    echo %ERROR_PREFIX% Invalid release type: %RELEASE_TYPE%
    echo %INFO_PREFIX% Valid types: patch, minor, major
    exit /b 1
)

REM Validate environment
if not "%ENVIRONMENT%"=="staging" if not "%ENVIRONMENT%"=="production" (
    echo %ERROR_PREFIX% Invalid environment: %ENVIRONMENT%
    echo %INFO_PREFIX% Valid environments: staging, production
    exit /b 1
)

REM Get version if not provided
if "%VERSION%"=="" (
    call :get_next_version %RELEASE_TYPE%
    echo %INFO_PREFIX% Auto-generated version: !VERSION!
)

REM Validate prerequisites
call :validate_prerequisites
if errorlevel 1 exit /b 1

REM Show release summary
call :show_release_summary

REM Confirm before proceeding (unless dry run)
if not "%DRY_RUN%"=="true" (
    set /p CONFIRM="Do you want to proceed with this release? (y/N): "
    if /i not "!CONFIRM!"=="y" (
        echo %INFO_PREFIX% Release cancelled by user
        exit /b 0
    )
)

REM Execute release based on mode
if "%USE_GITHUB_ACTIONS%"=="true" (
    call :trigger_github_actions
) else if "%ENHANCED%"=="true" (
    call :run_enhanced_release
) else (
    call :run_local_release
)

if errorlevel 1 (
    echo %ERROR_PREFIX% Release process failed!
    exit /b 1
)

echo %SUCCESS_PREFIX% Release process completed!
echo.
echo %INFO_PREFIX% Next steps:
if "%USE_GITHUB_ACTIONS%"=="true" (
    echo   1. Monitor the GitHub Actions workflow progress
    echo   2. Review the deployment in %ENVIRONMENT% environment
    echo   3. Verify the release functionality
) else (
    echo   1. Review the generated release package
    echo   2. Test the release in %ENVIRONMENT% environment
    echo   3. Monitor system metrics after deployment
)

if "%ENVIRONMENT%"=="staging" if not "%DRY_RUN%"=="true" (
    echo   4. Consider promoting to production after validation
)

echo.
echo %SUCCESS_PREFIX% MPLP %VERSION% release process completed successfully! 🎉
exit /b 0

REM Functions
:show_help
echo MPLP Quick Release Script for Windows
echo.
echo Usage: %0 [OPTIONS]
echo.
echo Options:
echo     -t, --type TYPE         Release type: patch, minor, major (default: patch)
echo     -e, --environment ENV   Target environment: staging, production (default: staging)
echo     -v, --version VERSION   Specific version to release (auto-generated if not provided)
echo     --enhanced             Use enhanced release process with security checks
echo     --dry-run              Perform dry run without making actual changes
echo     --skip-security        Skip security checks (not recommended)
echo     --skip-approval        Skip manual approval process
echo     --github-actions       Trigger GitHub Actions workflow instead of local script
echo     -h, --help             Show this help message
echo.
echo Examples:
echo     %0 --type patch --environment staging
echo     %0 --type minor --environment production --enhanced
echo     %0 --type major --dry-run
echo     %0 --github-actions --type minor --environment production
echo.
echo Release Types:
echo     patch    - Bug fixes and small improvements (1.0.X)
echo     minor    - New features, backward compatible (1.X.0)
echo     major    - Breaking changes (X.0.0)
echo.
echo Environments:
echo     staging     - Staging environment for testing
echo     production  - Production environment
exit /b 0

:get_next_version
set type=%1

REM Get current version from package.json
if not exist "%PROJECT_ROOT%\package.json" (
    echo %ERROR_PREFIX% package.json not found
    exit /b 1
)

REM Use PowerShell to parse JSON (more reliable than batch)
for /f "delims=" %%i in ('powershell -Command "(Get-Content '%PROJECT_ROOT%\package.json' | ConvertFrom-Json).version"') do set current_version=%%i

REM Parse version components
for /f "tokens=1,2,3 delims=." %%a in ("%current_version%") do (
    set major=%%a
    set minor=%%b
    set patch=%%c
)

REM Calculate next version
if "%type%"=="patch" (
    set /a patch+=1
) else if "%type%"=="minor" (
    set /a minor+=1
    set patch=0
) else if "%type%"=="major" (
    set /a major+=1
    set minor=0
    set patch=0
) else (
    echo %ERROR_PREFIX% Invalid release type: %type%
    exit /b 1
)

set VERSION=v%major%.%minor%.%patch%
exit /b 0

:validate_prerequisites
echo %INFO_PREFIX% Validating prerequisites...

REM Check if we're in the right directory
if not exist "%PROJECT_ROOT%\package.json" (
    echo %ERROR_PREFIX% Not in MPLP project root directory
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo %ERROR_PREFIX% Node.js is not installed
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo %ERROR_PREFIX% npm is not installed
    exit /b 1
)

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo %ERROR_PREFIX% git is not installed
    exit /b 1
)

REM Check if dependencies are installed
if not exist "%PROJECT_ROOT%\node_modules" (
    echo %WARNING_PREFIX% Dependencies not installed, running npm install...
    cd /d "%PROJECT_ROOT%"
    npm install
    if errorlevel 1 (
        echo %ERROR_PREFIX% Failed to install dependencies
        exit /b 1
    )
)

echo %SUCCESS_PREFIX% Prerequisites validated
exit /b 0

:run_local_release
echo %INFO_PREFIX% Running local release process...

cd /d "%PROJECT_ROOT%"

REM Build command
set cmd=node scripts\release.js --version %VERSION% --type %RELEASE_TYPE%

if "%DRY_RUN%"=="true" (
    set cmd=!cmd! --dry-run
)

if "%ENHANCED%"=="true" (
    set cmd=!cmd! --enhanced
)

echo %INFO_PREFIX% Executing: !cmd!
!cmd!
exit /b %errorlevel%

:run_enhanced_release
echo %INFO_PREFIX% Running enhanced release process...

cd /d "%PROJECT_ROOT%"

REM Build command
set cmd=node scripts\release-enhanced.js --version %VERSION% --type %RELEASE_TYPE% --environment %ENVIRONMENT%

if "%DRY_RUN%"=="true" (
    set cmd=!cmd! --dry-run
)

if "%SKIP_SECURITY%"=="true" (
    set cmd=!cmd! --skip-security
)

if "%SKIP_APPROVAL%"=="true" (
    set cmd=!cmd! --skip-approval
)

echo %INFO_PREFIX% Executing: !cmd!
!cmd!
exit /b %errorlevel%

:trigger_github_actions
echo %INFO_PREFIX% Triggering GitHub Actions workflow...

REM Check if gh CLI is installed
gh --version >nul 2>&1
if errorlevel 1 (
    echo %ERROR_PREFIX% GitHub CLI (gh) is not installed. Please install it to use GitHub Actions integration.
    echo %INFO_PREFIX% Install from: https://cli.github.com/
    exit /b 1
)

REM Check if user is authenticated
gh auth status >nul 2>&1
if errorlevel 1 (
    echo %ERROR_PREFIX% Not authenticated with GitHub. Please run 'gh auth login'
    exit /b 1
)

REM Build workflow inputs
set inputs=version=%VERSION%,release_type=%RELEASE_TYPE%,environment=%ENVIRONMENT%

if "%DRY_RUN%"=="true" (
    set inputs=!inputs!,dry_run=true
)

if "%SKIP_SECURITY%"=="true" (
    set inputs=!inputs!,skip_security=true
)

if "%SKIP_APPROVAL%"=="true" (
    set inputs=!inputs!,skip_approval=true
)

echo %INFO_PREFIX% Triggering workflow with inputs: !inputs!

cd /d "%PROJECT_ROOT%"
gh workflow run "Enhanced Release Process" --field "!inputs!"

if errorlevel 1 (
    echo %ERROR_PREFIX% Failed to trigger GitHub Actions workflow
    exit /b 1
)

echo %SUCCESS_PREFIX% GitHub Actions workflow triggered successfully!
echo %INFO_PREFIX% You can monitor the progress in your GitHub repository's Actions tab
exit /b 0

:show_release_summary
echo.
echo ===========================================
echo            RELEASE SUMMARY
echo ===========================================
echo Version:      %VERSION%
echo Type:         %RELEASE_TYPE%
echo Environment:  %ENVIRONMENT%
echo Enhanced:     %ENHANCED%
echo Dry Run:      %DRY_RUN%
echo Skip Security: %SKIP_SECURITY%
echo Skip Approval: %SKIP_APPROVAL%
echo ===========================================
echo.
exit /b 0