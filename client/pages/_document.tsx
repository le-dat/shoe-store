import { Html, Head, Main, NextScript } from "next/document"

import Meta from "@/components/shared/Meta"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Meta
          title="Online Shoe Store | Le Dat"
          description="Fashion shoe"
          image="https://res.cloudinary.com/djyfwalqq/image/upload/v1685025120/large_71e_P_Jq_Qifg_L_AC_UY_500_b45ac3cb8d.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
