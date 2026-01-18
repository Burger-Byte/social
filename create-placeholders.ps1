# IMPORTANT: Run this after cloning/pulling from GitHub
# This creates all missing placeholder files

Write-Host "🔧 Setting up missing files..." -ForegroundColor Green

# Create missing package stubs
$packages = @("matching", "messaging", "profiles", "geolocation", "notifications", "database", "utils")

foreach ($pkg in $packages) {
    $dir = "packages\$pkg\src"
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    
    $content = "export const ${pkg}Module = 'placeholder';"
    Set-Content -Path "$dir\index.ts" -Value $content
    
    Write-Host "✓ Created $dir\index.ts" -ForegroundColor Gray
}

Write-Host "`n✅ Done! Now run: npm install" -ForegroundColor Green
