import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [{ source: "/", destination: "/solucoes", permanent: false }];
	},
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
