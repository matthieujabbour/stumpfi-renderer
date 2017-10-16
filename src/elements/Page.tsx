/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import Component from './Component';
import Resource from './Resource';


/** Defines the Page's props type. */
interface PageProps {
  /** Page's data. */
  readonly data : JSONPage;
}


/**
 * Stumpfi page React class.
 */
export default class Page extends React.PureComponent<PageProps, {}> {

  /**
   * Renders the given resources along with default ones that should be integrated.
   * Default resources are used to properly format HTML tags, and to automatically scale font sizes.
   * @param {CustomResource[]} resources The custom resources to render inside the page.
   * @returns {JSX.Element[]} The pages' default resources React components.
   */
  public static renderResources(resources : CustomResource[]) : JSX.Element[] {
    // This script is used to automatically scale page's font size to its width.
    const script : CustomResource = {
      tagName: 'script',
      content: 'function scale() {' +
        'const fontSize = Math.min(16/9 * window.innerHeight / 100, window.innerWidth / 100);' +
        'document.body.style.fontSize = `${fontSize}px`;' +
      '}' +
      'window.addEventListener(\'resize\', scale); window.onload = scale;',
      attributes: { type: 'text/javascript', 'data-default': true },
    };
    // This style is used to automatically scale page's dimensions to frame size,
    // keeping the specified ratio.
    const style : CustomResource = {
      tagName: 'style',
      content: 'div[data-component-id]{overflow: auto; position: absolute;}' +
      'body{width: calc(16/9 * 100vh); height: calc(9/16 * 100vw); max-width: 100vw;' +
      'max-height: 100vh; position: relative;}',
      attributes: { type: 'text/css', 'data-default': true },
    };

    return [
      <Resource data={script} key="script" />,
      <Resource data={style} key="style" />,
      ...resources.map((resource, index) => <Resource data={resource} key={index} />),
    ];
  }


  /**
   * Wraps the entire page in an iframe to allow embedding.
   * @param {JSX.Element} page : page's React component to be wrapped inside the iframe.
   * @returns {JSX.Element[]} The iframe-wrapped page's React component.
   */
  public static wrapPage(page : JSX.Element) : JSX.Element {
    const srcDoc : string = `<!DOCTYPE html>${ReactDOM.renderToStaticMarkup(page)}`;
    return <iframe srcDoc={srcDoc} />;
  }


  /**
   * Class constructor.
   * @param {PageProps} props Page's props.
   * @returns {void}
   */
  public constructor(props : PageProps) {
    super(props);
  }


  /**
   * React rendering function.
   * @returns {JSX.Element} The React component.
   */
  public render() : JSX.Element {
    const data : JSONPage = this.props.data;
    const resources : CustomResource[] = [];
    const htmlComponents : JSX.Element[] = [];
    let pageIds : string = '';

    // Generating Component and Resource components for the page and each page master...
    let page : JSONPage | null = data;
    let index : number = 0;
    while (page !== null) {
      pageIds = `${(page as JSONPage).id} ${pageIds}`;
      page.resources.forEach((resource) => { resources.unshift(resource); });
      page.components.forEach((component) => {
        htmlComponents.unshift(
          <Component data={component} key={index++} data-page-id={(page as JSONPage).id} />,
        );
      });
      page = page.master;
    }

    return Page.wrapPage(
      <html data-page-ids={pageIds.trim()}>
        <head>
          {Page.renderResources(resources)}
        </head>
        <body>
          {htmlComponents}
        </body>
      </html>,
    );
  }

}
