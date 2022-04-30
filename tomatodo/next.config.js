
const STUDIO_REWRITE = {
	source: "/studio/:path*",
	destination:
	  process.env.NODE_ENV === "development"
		? "http://localhost:3333/studio/:path*"
		: "/studio/index.html",
  }
  
  module.exports = {
	rewrites: () => [STUDIO_REWRITE],
	webpack(config, options) {
		config.module.rules.push({
		  test: /\.mp3$/,
		  use: {
			loader: 'url-loader',
		  },
		});
		return config;
	  },
  };

