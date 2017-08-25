import styled from 'styled-components';
import Layout from '../components/Layout';
import Glyph from '../components/Glyph';

const Portrait = styled.img.attrs({
  src: "/static/elliott-pogue.jpg",
  alt: "Elliott Pogue's portrait"
})`
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0,0,0,0.2);
  transform: scale(0);
  opacity: 0;
  transition: transform .6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              opacity .6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: .65s;

  html.wf-active & {
    transform: scale(1);
    opacity: 1;
  }
`;

const Info = styled.div`
  transform: translateY(40px);
  opacity: 0;
  transition: transform .6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              opacity .6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: .65s;

  html.wf-active & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Header = styled.h1`
  color: #174130;
  font-size: 28px;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 0;
`;

const Subtitle = styled.p`
  color: #417D65;
  font-size: 20px;
  line-height: 32px;
  margin: 0 0 24px 0;
`

const SocialLink = ({ icon, children, ...otherProps }) =>
  <a {...otherProps}>
    <Glyph icon={icon} />
    <span>{children}</span>
  </a>;

const StyledSocialLink = styled(SocialLink)`
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  padding: 6px 0;
  display: block;
  color: #417D65;
  text-decoration: none;

  & > span {
    display: inline-block;
    position: relative;
  }

  & > span:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 2px;
    background: #417D65;
    transform: scaleX(0);
    transition: transform 0.2s ease-out;
    transform-origin: 0 50%;
  }

  & > svg {
    line-height: 24px;
    vertical-align: middle;
    margin-right: 8px;
    fill: #417D65;
  }

  &:hover {
    color: #174130;

    & > svg {
      fill: #174130;
    }

    & > span:after {
      transform: scaleX(1);
    }
  }
`;

export default () => (
  <Layout>
    <Portrait />
    <Info>
      <Header>Elliott Pogue</Header>
      <Subtitle>I build things on the web</Subtitle>
      <StyledSocialLink icon="email" href="mailto:epogue@gmail.com">epogue@gmail.com</StyledSocialLink>
      <StyledSocialLink icon="twitter" href="https://twitter.com/epogue">@epogue</StyledSocialLink>
      <StyledSocialLink icon="github" href="https://github.com/epogue">github.com/epogue</StyledSocialLink>
    </Info>
  </Layout>
)