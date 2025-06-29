# Generate checksums for all files in release directory
Set-Location 'e:\Trae_Project\Multi_Agent_Project_Lifecycle_Protocol\release\v1.0.4'

Get-ChildItem -Recurse -File | ForEach-Object {
    $hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash
    $relativePath = $_.FullName.Replace((Get-Location).Path + '\', '')
    Write-Output "$hash  $relativePath"
} | Sort-Object