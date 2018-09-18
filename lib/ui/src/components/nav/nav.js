import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withCSSContext } from '@emotion/core';

import { Notification, Notifications, NotificationSpacer } from './notifications';
import { Menu, MenuToggle } from './menu';

import { Link } from '../../router';
import { StoriesPanel } from './explorer';

const Container = styled.nav(({ theme }) => ({
  background: theme.asideFill,
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
}));
const Inner = styled.div({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  padding: 20,
  overflow: 'auto',
  minHeight: '100%',
  boxSizing: 'border-box',
});

const Head = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  marginRight: -10,
  marginBottom: 15,
});
const Main = styled.div({
  flex: 1,
});
const Foot = styled.div({});

const A = styled.a({
  color: 'inherit',
  textDecoration: 'none',
});
const HeadMain = styled.div({
  flex: 1,
  marginRight: 30,
});

const Brand = withCSSContext(({ title, url }, { theme: { brand: UserBrand } }) => (
  <HeadMain>
    {Brand ? (
      UserBrand({ title, url })
    ) : (
      <A href={url} tabIndex="-1">
        {title}
      </A>
    )}
  </HeadMain>
));
Brand.displayName = 'Brand';

const Nav = ({ title, url, notifications = [], stories, menu }) => (
  <Container>
    <Inner>
      <Main>
        <Head>
          <Brand title={title} url={url} />
          <MenuToggle id="storybook-explorer-menu">
            <Menu items={menu} />
          </MenuToggle>
        </Head>
        <StoriesPanel stories={stories} />
      </Main>
      <Foot>
        {notifications.map(({ id }) => (
          <NotificationSpacer key={id} />
        ))}
      </Foot>
    </Inner>
    {notifications.length ? (
      <Notifications>
        {notifications.map(
          ({ id, content, level, link }) =>
            link ? (
              <Link to={link} key={id}>
                <Notification level={level}>{content}</Notification>
              </Link>
            ) : (
              <Notification key={id} level={level}>
                content
              </Notification>
            )
        )}
      </Notifications>
    ) : null}
  </Container>
);
Nav.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  stories: PropTypes.shape({}).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
      action: PropTypes.func.isRequired,
      detail: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    })
  ).isRequired,
};
Nav.displayName = 'Nav';

export default Nav;