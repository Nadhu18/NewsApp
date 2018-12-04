// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  watchlistEndpoint: 'http://localhost:8081/api/news',
  categoryEndpoint: 'http://localhost:8081/api/news/category',
  topnewsEndpoint: 'http://localhost:8081/api/news/topNews',
  searchEndpoint: 'http://localhost:8081/api/news/search'
};
