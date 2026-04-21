# 小说阅读站

基于纯静态 HTML+JS 的沉浸式小说阅读网站，支持多本小说切换、深色/浅色主题、阅读进度记忆。

## 包含的小说

- **灰烬纪元** — 科幻末日
- **登录** — 网游竞技
- **霸总他真香了** — 都市甜宠

## 技术栈

- 原生 HTML + CSS + JS
- marked.js（CDN）

## 本地预览

```bash
npx serve .
# 或
python -m http.server
```

## Gitee Pages 部署步骤

1. 在 Gitee 上创建新仓库（如 `novel-site`）
2. 推送代码：
   ```bash
   git remote add origin https://gitee.com/你的用户名/novel-site.git
   git push -u origin master
   ```
3. 进入 Gitee 仓库页面 → 「服务」→「Gitee Pages」
4. 部署分支选 `master`，部署目录选 `/`
5. 点击「启动」，等待部署完成
6. 访问 `https://你的用户名.gitee.io/novel-site/`

## 更新小说内容

1. 修改 `novel_` 目录下的 md 文件
2. 运行 `generate_data.js` 重新生成数据
3. 推送到 Gitee
