# Compress "Artemis Investor- Final 2.mp4" to under GitHub's 100 MB limit.
# Requires: ffmpeg in PATH. Install via: winget install ffmpeg
# Uses: 720p, H.264 CRF 30, AAC 128k. Output target: <100 MB.

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $PSScriptRoot
$base = Join-Path (Split-Path -Parent $scriptDir) "revtech-industries.github.io"
$src = Join-Path (Join-Path $base "videos") "Artemis Investor- Final 2.mp4"
$out = Join-Path (Join-Path $scriptDir "videos") "Artemis_Investor_Final_2_Compressed.mp4"

if (-not (Test-Path $src)) {
    # Fallback: same repo videos folder if we have a local copy
    $src = Join-Path $scriptDir "videos" "Artemis Investor- Final 2.mp4"
}
if (-not (Test-Path $src)) { throw "Source not found: $src" }

$videosDir = Join-Path $scriptDir "videos"
if (-not (Test-Path $videosDir)) { New-Item -ItemType Directory -Path $videosDir -Force | Out-Null }

Write-Host "Compressing to $out (720p, CRF 30, target <100 MB)..."
& ffmpeg -y -i $src -vf "scale=-2:720" -c:v libx264 -crf 30 -preset medium -c:a aac -b:a 128k $out 2>$null
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed with exit $LASTEXITCODE" }
if (-not (Test-Path $out)) { throw "ffmpeg failed" }

$sizeMB = [math]::Round((Get-Item $out).Length / 1MB, 2)
Write-Host "Done. $out ($sizeMB MB)"
