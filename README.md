### Overview

Realtor webiste is built using Next.js, a React framework for server-side rendering and static site generation. It is typed with Typescript and styled using Chakra UI component library.

For state management, Jotai is chosen because of simple, fast React state solution.

This project also is powered by a simple remake caching and synchronizing async state management, working similar to queryClient from React Query library

Together, this project take advantages of Next.Js cutting-edge features and performance optimizations on routing and static rendering to build a fast, scalable commercial website.

### Key Features

1. Search and Filters
   Find products easily with pagination, sorting, and advanced filters
2. Responsive
   Fully responsive design optimized for all devices
3. Rapid API
   Using Rapid API in order to fetching async datas and display filtered datas base on search query parameter
4. SSG and SSR
   The project supports both prefetched data on static routing as well as real-time datas when searching in order to create dynamic routing whichs ensures a sleek and responsive experience.

### Installation

Clone this repo and install all dependencies

```
git clone https://github.com/Antonio0402/realtor-nextjs-project.git

cd realtor-nextjs-project

npm install
```

### Development

```
npm run dev
```

### Build

```
npm run build
```

### Screenshot

![Desktop Design](./screenshots/desktop-design.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
