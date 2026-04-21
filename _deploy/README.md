# 小说阅读站

基于纯静态 HTML+JS 的沉浸式小说阅读网站，支持多本小说切换、深色/浅色主题、阅读进度记忆。

## 包含的小说

- **灰烬纪元** — 科幻末日
- **登录** — 网游竞技
- **霸总他真香了** — 都市甜宠

## 技术栈

- 原生 HTML + CSS + JS
- marked.js（CDN）
- Cloudflare Pages（托管部署）

## 本地预览

```bash
npx serve .
# 或
python -m http.server
```

## Cloudflare Pages 部署

### 通过 Wrangler CLI 部署（推荐）

```bash
# 安装 wrangler
pnpm add -D wrangler

# 登录 Cloudflare
npx wrangler login

# 部署
npx wrangler pages deploy . --project-name=novel-site
```

### 更新部署

1. 修改 `novel_` 目录下的 md 文件
2. 运行 `node generate_data.js` 重新生成数据
3. 重新部署：`npx wrangler pages deploy . --project-name=novel-site`

## 自定义域名

在 Cloudflare Dashboard → Workers & Pages → novel-site → Custom domains 中绑定。
