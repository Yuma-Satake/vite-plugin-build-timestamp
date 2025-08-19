# vite-plugin-build-timestamp

ビルド時にindex.htmlへタイムスタンプを埋め込むViteプラグイン

## インストール

```bash
bun add -D vite-plugin-build-timestamp
```

または

```bash
npm install --save-dev vite-plugin-build-timestamp
```

または

```bash
yarn add -D vite-plugin-build-timestamp
```

または

```bash
pnpm add -D vite-plugin-build-timestamp
```

## 使い方

### 基本的な使い方

`vite.config.ts` または `vite.config.js` に以下のように設定します：

```typescript
import { defineConfig } from 'vite';
import vitePluginBuildTimestamp from 'vite-plugin-build-timestamp';

export default defineConfig({
  plugins: [
    vitePluginBuildTimestamp()
  ],
});
```

ビルド実行後、`index.html` の先頭にビルド日時がコメントとして挿入されます：

```html
<!-- Build time: 2024/1/19 15:30:45 -->
<!DOCTYPE html>
<html>
  ...
</html>
```

### オプション設定

プラグインは以下のオプションをサポートしています：

```typescript
interface BuildTimestampPluginOptions {
  buildDir?: string;    // ビルド出力ディレクトリ (デフォルト: 'dist')
  timeZone?: string;    // タイムゾーン (デフォルト: 'Asia/Tokyo')
  locale?: string;      // ロケール (デフォルト: 'ja-JP')
  format?: Intl.DateTimeFormatOptions; // 日時フォーマットオプション
}
```

### カスタマイズ例

```typescript
import { defineConfig } from 'vite';
import vitePluginBuildTimestamp from 'vite-plugin-build-timestamp';

export default defineConfig({
  plugins: [
    vitePluginBuildTimestamp({
      buildDir: 'build',
      timeZone: 'America/New_York',
      locale: 'en-US',
      format: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
    })
  ],
});
```

## 機能

- ビルド時に自動的にindex.htmlへタイムスタンプを挿入
- タイムゾーンとロケールのカスタマイズ可能
- 日時フォーマットの柔軟な設定
- TypeScript完全サポート

## 要件

- Node.js >= 14.0.0
- Vite >= 3.0.0

## ライセンス

MIT
