# github-actions-bundlers

A repository to test github actions with a different set of bundlers

## Bundlers

<details>
<summary><a href="https://webpack.js.org/">webpack</a></summary>

### Pros

- Highly configurable
- Large plugin ecosystem
- Supports code splitting and dynamic imports

### Cons

- Can be complex to configure
- Slower build times for large projects

</details>

<details>
<summary><a href="https://rspack.dev">rspack</a></summary>

### Pros

- Webpack-compatible API
- Faster build times
- Written in Rust for performance

### Cons

- Relatively new, ecosystem still growing
- May lack some advanced webpack features

</details>

<details>
<summary><a href="https://rollupjs.org/">rollup</a></summary>

### Pros

- Excellent for libraries and smaller projects
- Produces smaller bundle sizes
- Tree-shaking out of the box

### Cons

- Less suitable for large applications
- Fewer built-in features compared to webpack

</details>

<details>
<summary><a href="https://rolldown.rs/">rolldown</a></summary>

### Pros

- Aims to be a drop-in replacement for Rollup
- Written in Rust for performance

### Cons

- Very new, may lack stability
- Limited ecosystem compared to established bundlers

</details>

<details>
<summary><a href="https://esbuild.github.io/">esbuild</a></summary>

### Pros

- Extremely fast build times
- Simple configuration
- Can be used as a library or standalone tool

### Cons

- Fewer features compared to traditional bundlers
- Limited plugin ecosystem

</details>

<details>
<summary><a href="https://github.com/egoist/tsup">tsup</a></summary>

### Pros

- Built on top of esbuild for speed
- Zero-config TypeScript support
- Good for npm packages

### Cons

- Less flexible than lower-level tools
- May not suit complex application needs

</details>

<details>
<summary><a href="https://github.com/vercel/ncc">@vercel/ncc</a></summary>

#### [ncc](https://github.com/vercel/ncc)

### Pros

- Compiles Node.js projects into a single file
- Includes dependencies
- Optimized for serverless deployments

### Cons

- Limited to Node.js projects
- May not be suitable for browser-based applications

</details>

<details>
<summary><a href="https://vitejs.dev/">vite</a></summary>

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
