# Deploy RevTech website: add, commit, push in one step
# Usage: .\deploy.ps1
#        .\deploy.ps1 "Your commit message"

$msg = if ($args.Count -gt 0) { $args[0] } else { "Deploy: site updates" }

git add -A
$status = git status --short
if (-not $status) {
    Write-Host "Nothing to commit. Working tree clean."
    exit 0
}
git commit -m $msg
git push
Write-Host "Done. Pushed to origin."
