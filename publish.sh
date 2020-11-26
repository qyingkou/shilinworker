#!/usr/bin/env sh

echo "build..."

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build


# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
echo 'tool.qingkooo.cc' > CNAME

git init
git add -A
git commit -m 'deploy'

echo "push..."
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com_qyingkou:qyingkou/shilinworker.git master:gh-pages

cd -

echo "okay!"
