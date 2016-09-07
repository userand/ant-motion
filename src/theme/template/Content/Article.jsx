import React, { PropTypes } from 'react';
import TweenOne from 'rc-tween-one';
import { getChildren } from 'jsonml.js/lib/utils';
import * as utils from '../utils';
import DocumentTitle from 'react-document-title';
import { scrollClick } from '../utils';

class Article extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  constructor() {
    super(...arguments);
    this.tickerId = `scrollTo${Date.now()}`;
  }

  componentDidMount() {
  }

  render() {
    const props = this.props;
    const pageData = props.pageData;
    const { meta, content, toc } = pageData;
    const { title, subtitle, chinese, english } = meta;
    const tocItem = props.utils.toReactComponent(toc);
    const tocChildren = utils.toArrayChildren(tocItem.props.children).map(item => {
      const itemChildren = utils.toArrayChildren(item.props.children).map(_item =>
        React.cloneElement(_item, { onClick: scrollClick.bind(this, this.tickerId) })
      );
      return React.cloneElement(item, item.props, itemChildren);
    });
    return (<DocumentTitle title={`${title || chinese || english} - Ant Motion`}>
      <article className="markdown">
        <h1>
          {title || english}
          {(!subtitle && !chinese) ? null :
          <i>{subtitle || chinese}</i>}
        </h1>
        {!toc || toc.length <=1 ? null :
        <section className="toc">{React.cloneElement(tocItem, tocItem.props, tocChildren)}</section>}
        {!content ? null :
          props.utils.toReactComponent(['section', { className: 'markdown' }]
            .concat(getChildren(content)))}
      </article>
    </DocumentTitle>);
  }
}
Article.propTypes = {
  className: PropTypes.string,
  pageData: PropTypes.object,
  utils: PropTypes.object,
};

Article.defaultProps = {};
export default Article;
