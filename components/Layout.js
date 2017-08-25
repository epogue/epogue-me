import styled, { injectGlobal } from "styled-components";
import Head from "next/head";

injectGlobal`
  body {
    margin: 0;
    font-family: 'gira-sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

const PageWrapper = styled.div`
  background: linear-gradient(-174deg, #64E5CD 0%, #C1F6D5 100%);
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease-out;

  html.wf-active & {
    opacity: 1;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 40px 20px;
  box-sizing: border-box;
`;

const Layout = ({ children, title = "Elliott Pogue" }) =>
  <PageWrapper>
    <Head>
      <title>
        {title}
      </title>
      <script src="https://use.typekit.net/nqk3zmf.js"></script>
      <script>{`try{Typekit.load({ async: true });}catch(e){}`}</script>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <CardContainer>
      {children}
    </CardContainer>
  </PageWrapper>;

export default Layout;