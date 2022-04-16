import {
	createClient,
	createPreviewSubscriptionHook
  } from "next-sanity";
  
  import { config } from "./config";
  
  if (!config.projectId) {
	throw Error(
	  "The Project ID is not set. Check your environment variables."
	);
  }
  
  export const usePreviewSubscription =
	createPreviewSubscriptionHook(config);
  
  export const client = createClient(config);
  
  export const previewClient = createClient({
	...config,
	useCdn: false
  });

// Helper function to choose the correct client
export const getClient = (usePreview = false) =>
	usePreview ? previewClient : client;

  export default client;