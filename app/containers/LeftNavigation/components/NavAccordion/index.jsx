import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Collapse} from 'react-collapse';
import classes from './index.css';

@withRouter
export default class NavAccordion extends React.Component{
  state = {
    activePath: ''
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setActivePath();
    }
  }

  componentDidMount() {
    this.setActivePath();
  }

  setActivePath() {
    this.setState({ activePath: this.props.location.pathname });
  }

  render() {
    let { className, history } = this.props;
    let { activePath } = this.state;

    return (
      <div className={className}>
        {this.props.children.map((item, index) => {
          let titleProps = item.props.children[0].props;
          let contentProps = item.props.children[1].props;
          let itemClassName = item.props.className;

          let title = titleProps.children;
          let titleClassName = titleProps.className;
          let titleActiveClassName = titleProps.classNameActive;
          let content = contentProps.children;
          let contentClassName = contentProps.className;
          let contentActiveClassName = contentProps.classNameActive;
          let titleHref = titleProps.href;
          let active = activePath.split('/')[1] === titleHref.substring(1);

          return (
            <div key={index} className={`${itemClassName ? itemClassName : classes.item} ${active ? classes.active : ''}`}>
              <div className={`${titleClassName ? titleClassName : classes.title} ${active ? titleActiveClassName ? titleActiveClassName : '' : ''}`} onClick={() => {
                if (titleHref) {
                  history.push(titleHref);
                }
              }}>{title}</div>
              <Collapse
                isOpened={active ? true : false}
                springConfig={{stiffness: 200, damping: 20}}
              >
                <div className={`${contentClassName ? contentClassName : classes.content} ${active ? contentActiveClassName ? contentActiveClassName : '' : ''}`}>{content}</div>
              </Collapse>
            </div>
          )
        })}
      </div>
    )
  }
}
