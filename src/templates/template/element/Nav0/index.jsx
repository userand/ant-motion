import React, { PropTypes } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import './index.less';

const Item = Menu.Item;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  }

  render() {
    const dataSource = this.props.dataSource;
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.dataSource;
    delete props.isMode;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const navData = dataSource[`${name}_menu`].children;
    const navChildren = Object.keys(dataSource[`${name}_menu`].children)
      .map((key, i) => (<Item key={i}>{navData[key]}</Item>));
    return (<TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...props}
    >
      <TweenOne
        className={`${this.props.className}-logo`}
        animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
        id={`${this.props.id}-logo`}
      >
        <img width="100%" src={dataSource[`${name}_logo`].children} />
      </TweenOne>
      {isMode ? (<div
        className={`${this.props.className}-phone-nav${this.state.phoneOpen ? ' open' : ''}`}
        id={`${this.props.id}-menu`}
      >
        <div
          className={`${this.props.className}-phone-nav-bar`}
          onClick={() => {
            this.phoneClick();
          }}
        >
          <em />
          <em />
          <em />
        </div>
        <div
          className={`${this.props.className}-phone-nav-text`}
          onClick={() => {
            this.phoneClick();
          }}
        >
          <Menu
            defaultSelectedKeys={['0']}
            mode="inline"
            theme="dark"
          >
            {navChildren}
          </Menu>
        </div>
      </div>) : (<TweenOne
        className={`${this.props.className}-nav`}
        animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
      >
        <Menu
          mode="horizontal" defaultSelectedKeys={['0']}
          style={dataSource[`${name}_menu`].style || {}}
          id={`${this.props.id}-menu`}
        >
          {navChildren}
        </Menu>
      </TweenOne>)}
    </TweenOne>);
  }
}

Header.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.object,
  id: PropTypes.string,
};

Header.defaultProps = {
  className: 'header0',
};

export default Header;
