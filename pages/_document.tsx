
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Allura:wght@400;700&display=swap" rel="stylesheet" />

                <meta httpEquiv="content-Type" content="text/html; utf-8" />
                <meta httpEquiv="Pragma" content="cache" />
                <meta name="robots" content="INDEX,NOFOLLOW" />
                <meta httpEquiv="content-Language" content="de" />
                <meta name="description" content="" />
                <meta name="keywords" content="angelobreuer, angelo breuer, angelobreuerde" />
                <meta name="author" content="Angelo Breuer" />
                <meta name="publisher" content="Angelo Breuer" />
                <meta name="copyright" content="Angelo Breuer" />
                <meta name="audience" content="Alle" />
                <meta name="page-type" content="Private Homepage" />
                <meta name="page-topic" content="Dienstleistung" />
                <meta httpEquiv="Reply-to" content="info@angelobreuer.de" />
                <meta name="expires" content="" />
                <meta name="revisit-after" content="2 days" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}