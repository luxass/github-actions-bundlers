# github-actions-bundlers

A repository to test github actions with a different set of bundlers

## Bundlers

- [x] [webpack](https://webpack.js.org/)
- [x] [rollup](https://rollupjs.org/)
- [x] [esbuild](https://esbuild.github.io/)
- [x] [Rspack](https://rspack.dev/)
- [x] [tsup](https://github.com/egoist/tsup)
- [x] [ncc](https://github.com/vercel/ncc)
- [x] [vite](https://vitejs.dev/)
- [x] [rolldown](https://rolldown.rs/)

<details>
<summary>Webpack</summary>

#### [webpack](https://webpack.js.org/)
- Pros:
  - Highly configurable
  - Large plugin ecosystem
  - Supports code splitting and dynamic imports
- Cons:
  - Can be complex to configure
  - Slower build times for large projects

</details>

<details>
<summary>Rollup</summary>

- Pros:
  - Excellent for libraries and smaller projects
  - Produces smaller bundle sizes
  - Tree-shaking out of the box
- Cons:
  - Less suitable for large applications
  - Fewer built-in features compared to webpack

</details>

<details>
<summary>esbuild</summary>

#### [esbuild](https://esbuild.github.io/)
- Pros:
  - Extremely fast build times
  - Simple configuration
  - Can be used as a library or standalone tool
- Cons:
  - Fewer features compared to traditional bundlers
  - Limited plugin ecosystem

</details>

<details>
<summary>Rspack</summary>

#### [rspack](https://rspack.dev/)
- Pros:
  - Webpack-compatible API
  - Faster build times
  - Written in Rust for performance
- Cons:
  - Relatively new, ecosystem still growing
  - May lack some advanced webpack features

</details>

<details>
<summary>Tsup</summary>

#### [tsup](https://github.com/egoist/tsup)
- Pros:
  - Built on top of esbuild for speed
  - Zero-config TypeScript support
  - Good for npm packages
- Cons:
  - Less flexible than lower-level tools
  - May not suit complex application needs

</details>

<details>
<summary>Ncc</summary>
#### [ncc](https://github.com/vercel/ncc)
- Pros:
  - Compiles Node.js projects into a single file
  - Includes dependencies
  - Optimized for serverless deployments
- Cons:
  - Limited to Node.js projects
  - May not be suitable for browser-based applications

</details>

<details>
<summary>Vite</summary>

#### [vite](https://vitejs.dev/)
- Pros:
  - Extremely fast development server
  - Uses Rollup for production builds
  - Great out-of-the-box experience
- Cons:
  - Primarily designed for web applications, less suitable for libraries
  - May require additional configuration for complex projects
</details>

<details>
<summary>Rolldown</summary>

#### [rolldown](https://rolldown.rs/)
- Pros:
  - Aims to be a drop-in replacement for Rollup
  - Written in Rust for performance
- Cons:
  - Very new, may lack stability
  - Limited ecosystem compared to established bundlers

</details>

## 📄 License

Published under [MIT License](./LICENSE).
