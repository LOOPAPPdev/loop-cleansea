import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Read-only incremental cache served from Workers static assets.
// Without it, prerendered (SSG) pages return 404 on the Workers runtime.
// Fits this site: all content is static JSON and no route uses `revalidate`.
// IF a route ever needs ISR/revalidation, THEN switch to the R2 cache:
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
});
