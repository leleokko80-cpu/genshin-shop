#!/bin/bash
set -e

OLD="${1:-healthy}"
NEW="${2:-ok}"

CONTROLLER=backend/src/main/java/com/genshin/shop/controller/HealthController.java
TEST=backend/src/test/java/com/genshin/shop/HealthControllerTest.java

echo "1. Modifying the code ($OLD -> $NEW)..."
sed -i "s/\"$OLD\"/\"$NEW\"/" "$CONTROLLER" "$TEST"

echo "2. Commit and push..."
git checkout -b "demo-$(date +%s)"
git add "$CONTROLLER" "$TEST"
git commit -m "demo: update health response"
git push github HEAD

echo "3. Open a pull request at:"
echo "   https://github.com/leleokko80-cpu/genshin-shop/compare/main...$(git branch --show-current)"
echo "4. After the merge and the green pipeline, deploy with: pyinfra @local deploy.py"