import type {AppProps} from 'next/app'
import '../styles/globals.css'
import Header from '../components/views/Header';
import Footer from '../components/views/Footer';
import {FetchContentResult, getUrl, RENDER_MODE, XP_REQUEST_TYPE} from '@enonic/nextjs-adapter';
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent';
import { SessionProvider} from 'next-auth/react'
/**
 * Wraps all rendered components
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{common, data, meta, error}}
 */
function MyApp({Component, pageProps}: AppProps<FetchContentResult>) {
    const isEdit = pageProps?.meta?.renderMode === RENDER_MODE.EDIT;

    // Component rendering - for component updates in Content Studio without reloading page
    if (pageProps.meta) {
        const meta = pageProps.meta;
        if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
            return <StaticContent condition={isEdit}>
                {meta.renderMode === RENDER_MODE.NEXT ?
                    // don't wrap it in direct next access because we want to show 1 component on the page
                    <Component {...pageProps} />
                    :
                    <details data-single-component-output="true">
                        <Component {...pageProps} />
                    </details>
                }
            </StaticContent>;
        } else if (!meta.canRender) {
            // return empty page, status is set in [[...contentPath.tsx]]
            return null;
        }
    }

    return (
        <StaticContent condition={isEdit}>
          <SessionProvider session={pageProps.session} >
            <Header
                title="🔥 Next.XP"
                logoUrl={getUrl('/images/xp-shield.svg', pageProps.meta)}
                meta={pageProps.meta}
            />
            <main style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0 1rem`,
            }}>
                <Component {...pageProps} />
            </main>
          <Footer />
          </SessionProvider>
        </StaticContent>
    );

}

export default MyApp
