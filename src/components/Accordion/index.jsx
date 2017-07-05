import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Collapse} from 'react-collapse';
import classes from './index.css';

export default class Accordion extends React.Component{
  constructor(){
    super();

    this.state = {
      selected: null
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount(){
    if (this.props.selected !== null){
      this.setState({
        selected: this.props.selected
      });
    }
  }

  render() {
    let {className, selected} = this.props;

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

          return (
            <div key={index} className={`${itemClassName ? itemClassName : classes.item} ${this.state.selected === title ? classes.active : ''}`}>
              <div className={`${titleClassName ? titleClassName : classes.title} ${this.state.selected === index ? titleActiveClassName ? titleActiveClassName : '' : ''}`} onClick={() => {
                selected = (index === this.state.selected ? null : index)
                this.setState({
                  selected: selected
                });

                if (titleHref) {
                  this.context.router.push(titleHref);
                }
              }}>{title}</div>
              <Collapse
                isOpened={this.state.selected === index ? true : false}
                springConfig={{stiffness: 200, damping: 20}}
              >
                <div className={`${contentClassName ? contentClassName : classes.content} ${this.state.selected === index ? contentActiveClassName ? contentActiveClassName : '' : ''}`}>{content}</div>
              </Collapse>
            </div>
          )
        })}
      </div>
    )
  }
}
