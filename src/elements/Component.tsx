/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';


/** Defines the Component's props type. */
interface ComponentProps {
  /** Component's data. */
  readonly data : JSONComponent;

  /** Component's page id. */
  readonly 'data-page-id' : string;
}


/**
 * Stumpfi component React class.
 */
export default class Component extends React.PureComponent<ComponentProps, {}> {

  /**
   * Class constructor.
   * @param {ComponentProps} props Component's props.
   * @returns {void}
   */
  public constructor(props : ComponentProps) {
    super(props);
  }


  /**
   * React rendering function.
   * @returns {JSX.Element} The React component.
   */
  public render() : JSX.Element {
    const data : JSONComponent = this.props.data;
    return (
      <div
        data-component-id={data.id}
        data-page-id={this.props['data-page-id']}
        data-content-id={data.content.id}
        className={data.className}
        style={data.style}
        dangerouslySetInnerHTML={{ __html: data.content.html }}
      />
    );
  }

}
