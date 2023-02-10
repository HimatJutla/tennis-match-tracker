This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## ROADMAP

This is my first individual project using React and NextJS. It will become a robust app as it matures. Please read my roadmap steps below:

# Phase 1: MVP
Use React and NextJS in conjunction with MongoDB atlas to create an app that tracks tennis matches by allowing a user to create a match, update a match and delete a match as well as allow a user to create, update and delete players. This will be a very simple app that shows player rankings, allows users to find players in their city, and track their matches, and will allow me to get a strong data structure.

# Phase 2:
- Scrap the MongoDB atlas DB and create a more robust BE with NodeJS and Postgres. This will allow me to remove more complex update logic for cross functional tables in the FE
- Add auth to the project
- Refactor front end code to use the ContextAPI to manage and keep state up to date rather than leveraging getStaticProps on each page (should only be called on index)
- Implement Higher Order Components for header and footer, as well as for state passing
- Style the app to look professional, phase 1 is just a quick styling in order to get a functional app
- Use Cypress or JEST to unit test and e2e test the entire app and its flows to ensure confidence on bugs

# Phase 3:
- Get all my friends on the app so we can start getting data
- Talk to the city to allow for public courts to be booked via my web platform, then proceed to adding that feature to the app (eliminate all the tennis beef at courts due to wait times and people going over time, this has always been a recipe for chaos and its about time someone automates it)
- Implement Redis as a caching middleware to improve performance


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
