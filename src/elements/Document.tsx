/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import Page from './Page';
import Resource from './Resource';


/** Defines the Document's props type. */
interface DocumentProps {
  /** Document's data. */
  readonly data : JSONDocument;
}


/**
 * Stumpfi document React class.
 */
export default class Document extends React.PureComponent<DocumentProps, {}> {

  /**
   * Class constructor.
   * @param {DocumentProps} props Document's props.
   * @returns {void}
   */
  public constructor(props : DocumentProps) {
    super(props);
  }


  /**
   * React rendering function.
   * @returns {JSX.Element} The React component.
   */
  public render() : JSX.Element {
    const data : JSONDocument = this.props.data;
    // Default iframe style.
    const defaultStyle : string = 'iframe[data-page-id]{border: none;}';

    return (
      <html>
        <head>
          <title>{data.name}</title>
          <meta charSet="UTF-8" />
          <meta name="generator" content={`stumpfi ${process.env.PACKAGE_VERSION}`} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={data.description} />
          <meta name="keywords" content={data.tags.join(' ')} />
          <meta name="author" content={data.authors.join(', ')} />
          <style type="text/css" dangerouslySetInnerHTML={{ __html: defaultStyle }} data-default />
          {data.resources.map((resource, index) => <Resource data={resource} key={index} />)}
          <noscript>
            Javascript is currently not enabled on your browser, this may cause the document not
            render correctly.
          </noscript>
        </head>
        <body>
          {data.pages.map((page, index) => <Page data={page} key={index} />)}
        </body>
    </html>
    );
  }

}
