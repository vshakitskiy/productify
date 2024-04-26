# With ♥ by vshakitskiy
![preview](https://github.com/vshakitskiy/productify/assets/54102609/688418a5-5876-4281-8cae-304d62b70975)
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,github,ts,react,tailwind,nextjs,pnpm&theme=dark" />
  </a>
</p>

## About

Productify is a full-stack filtering system project. The aim of the project was to learn about vector databases and managing filtering states.

### Features

- Responsive UI
- Dark/Light mode
- Debounced filtering
- Skeletons on loading

## Getting started

1) Get URL and TOKEN from the [Upstash Vector](https://upstash.com/):
```env
# .env.example
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
NEXT_PUBLIC_URL=
```
2) Run the seed file:
```bash
pnpm seed
# or use
tsx ./src/db/seed.ts
```
3) Run the dev command:
```bash
pnpm dev
```
