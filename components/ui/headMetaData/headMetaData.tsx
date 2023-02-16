import Head from "next/head";



export default function HeadMetaData(): any {

  return (
    <>
      <Head>
        <title>Tennis Match Tracker</title>
        <meta name="description" content="Track your tennis matches" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tennis-match-tracker-favicon.png"/>
      </Head>
    </>
  )

}
