import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Plugin } from 'vite';

export interface BuildTimestampPluginOptions {
  buildDir?: string;
  timeZone?: string;
  locale?: string;
  format?: Intl.DateTimeFormatOptions;
}

function vitePluginBuildTimestamp(options: BuildTimestampPluginOptions = {}): Plugin {
  const {
    buildDir = 'dist',
    timeZone = 'Asia/Tokyo',
    locale = 'ja-JP',
    format = undefined
  } = options;

  return {
    name: 'vite-plugin-build-timestamp',
    apply: 'build',
    closeBundle() {
      const rootPath = process.cwd();
      const buildDirPath = join(rootPath, buildDir);
      const indexPath = join(buildDirPath, 'index.html');

      if (existsSync(indexPath)) {
        const timestamp = new Date().toLocaleString(locale, {
          timeZone,
          ...format
        });
        const timestampComment = `<!-- Build time: ${timestamp} -->`;
        
        let htmlContent = readFileSync(indexPath, 'utf-8');
        htmlContent = `${timestampComment}\n${htmlContent}`;
        
        writeFileSync(indexPath, htmlContent);
        
        const barStr = '-'.repeat(48);
        console.log(
          `\n${barStr}\n[vite-plugin-build-timestamp]\nBuild time: ${timestamp}\nWritten to: ${indexPath}\n${barStr}\n`
        );
      } else {
        console.warn(
          `[vite-plugin-build-timestamp] Warning: index.html not found at ${indexPath}`
        );
      }
    },
  };
}

export default vitePluginBuildTimestamp;