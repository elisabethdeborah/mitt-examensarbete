export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: "ksav5iu2",
	apiVersion: "2022-02-21", 
	/**
	 * Set useCdn to `false` if your application require the freshest possible
	 * data always (potentially slightly slower and a bit more expensive).
	 * Authenticated request (like preview) will always bypass the CDN
	 **/
	 token: process.env.SANITY_WRITE_KEY,
	useCdn: false,
  };