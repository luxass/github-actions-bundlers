# github-actions-bundlers

A repository to test github actions with a different set of bundlers

## 🚀 Quick Start

If you want to create your own action, using one of these bundlers, there is a guide for each of them in the `README` of each folder.

## 📦 Bundlers

> [!NOTE]
> Each of the bundlers has its own set of pros and cons. Choose the one that best fits your project requirements.

<details>
<summary>webpack</summary>

[webpack](https://webpack.js.org/) is a powerful and highly configurable module bundler for JavaScript applications. It can handle a wide variety of assets beyond JavaScript, making it popular for complex web applications.

### Pros

- Highly configurable
- Large plugin ecosystem
- Supports code splitting and dynamic imports

### Cons

- Can be complex to configure
- Slower build times for large projects

</details>

<details>
<summary>rspack</summary>

[rspack](https://rspack.dev) is a fast Rust-based JavaScript bundler, designed as a drop-in replacement for Webpack. It aims to provide Webpack-compatible features with significantly improved build performance.

### Pros

- Webpack-compatible API
- Faster build times
- Written in Rust for performance

### Cons

- Relatively new, ecosystem still growing
- May lack some advanced webpack features

</details>

<details>
<summary>rollup</summary>

[rollup](https://rollupjs.org) is a module bundler for JavaScript that excels at creating efficient, tree-shaken bundles. It's particularly well-suited for libraries and applications using ES modules.

### Pros

- Excellent for libraries and smaller projects
- Produces smaller bundle sizes
- Tree-shaking out of the box

### Cons

- Less suitable for large applications
- Fewer built-in features compared to webpack

</details>

<details>
<summary>rolldown</summary>

[rolldown](https://rolldown.rs) is a Rust-based JavaScript bundler that aims to have a Rollup compatible API. It leverages Rust's performance to deliver fast build times and efficient bundling for modern web projects.

### Pros

- Aims to be a drop-in replacement for Rollup
- Written in Rust for performance

### Cons

- Very new, may lack stability
- Limited ecosystem compared to established bundlers

</details>

<details>
<summary>esbuild</summary>

[esbuild](https://esbuild.github.io) is an extremely fast JavaScript bundler and minifier written in Go. It prioritizes speed and simplicity, offering quick build times for modern web projects.

### Pros

- Extremely fast build times
- Simple configuration
- Can be used as a library or standalone tool

### Cons

- Fewer features compared to traditional bundlers
- Limited plugin ecosystem

</details>

<details>
<summary>tsup</summary>

[tsup](https://github.com/egoist/tsup) is a zero-config TypeScript bundler designed for simplicity and speed. It can quickly bundle TypeScript projects into various output formats, handling both CommonJS and ES modules with minimal configuration required.

### Pros

- Built on top of esbuild for speed
- Zero-config TypeScript support
- Good for npm packages

### Cons

- Less flexible than lower-level tools
- May not suit complex application needs

</details>

<details>
<summary>@vercel/ncc</summary>

[@vercel/ncc](https://github.com/vercel/ncc) is a command-line tool that compiles a Node.js project into a single file, bundling all its dependencies. It simplifies deployment by creating a compact, self-contained executable that doesn't require separate node_modules.

### Pros

- Compiles Node.js projects into a single file
- Includes dependencies
- Optimized for serverless deployments

### Cons

- Limited to Node.js projects
- May not be suitable for browser-based applications

</details>

<details>
<summary>Vite</summary>

[Vite](https://vitejs.dev) is a fast, modern build tool for web development that leverages native ES modules for quick server start and instant hot module replacement. It supports multiple frameworks, optimizes production builds, and offers features like TypeScript and CSS pre-processing out of the box.

### Pros

- Extremely fast development server
- Uses Rollup for production builds
- Great out-of-the-box experience

### Cons

- Primarily designed for web applications, less suitable for libraries
- May require additional configuration for complex projects
</details>

## 📄 License

Published under [MIT License](./LICENSE).
