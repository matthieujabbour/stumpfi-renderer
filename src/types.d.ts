/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as React from 'react';


/** CSS properties type definition. */
interface CssProperties {
  [x : string] : string;
}


/** Custom resource type definition. */
type resourceTag = 'style' | 'script' | 'link';
interface CustomResource {
  readonly tagName : resourceTag;
  readonly content? : string;
  readonly attributes : {
    readonly async? : boolean;
    readonly charSet? : string;
    readonly crossOrigin? : string;
    readonly defer? : boolean;
    readonly integrity? : string;
    readonly nonce? : string;
    readonly src? : string;
    readonly type? : string;
    readonly media? : string;
    readonly scoped? : boolean;
    readonly href? : string;
    readonly hrefLang? : string;
    readonly rel? : string;
    readonly sizes? : string;
    readonly 'data-default'? : boolean;
    'data-page-id'? : string;
  };
}


/** Defines the JSON-formatted stumpfi component type. */
interface JSONComponent {
  /** Component's id. */
  id : string;

  /** Component's content. */
  content : {
    /** Component's content id. */
    id : string;

    /** Component's content HTML code. */
    html : string;
  };

  /** Component's HTML class name. */
  className : string;

  /** Component's CSS style. */
  style : CssProperties;
}


/** Defines the JSON-formatted stumpfi page type. */
interface JSONPage {
  /** Page's id. */
  id : string;

  /** Page master. */
  master : JSONPage;

  /** Page's resources. */
  resources : CustomResource[];

  /** Page's components list. */
  components : JSONComponent[];
}


/** Defines the JSON-formatted stumpfi document type. */
interface JSONDocument {
  /** Document's name. */
  name : string;

  /** Document's description. */
  description : string;

  /** Document's tags. */
  tags : string[];

  /** Document's authors. */
  authors : string[];

  /** Document's custom resources. */
  resources : CustomResource[];

  /** Document's pages list. */
  pages : JSONPage[];
}


/** Defines the Resource's props type. */
interface ResourceProps {
  /** Resource's data. */
  readonly data : CustomResource;
}


/**
 * Stumpfi custom resource (script, link, style).
 * @param {ResourceProps} props Resource props.
 * @returns {JSX.Element} The resource's React element.
 */
export function Resource(props : ResourceProps) : JSX.Element;


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
export class Component extends React.PureComponent<ComponentProps, {}> {

  /**
   * Class constructor.
   * @param {ComponentProps} props Component's props.
   * @returns {void}
   */
  public constructor(props : ComponentProps);


  /**
   * React rendering function.
   * @returns {JSX.Element} The React component.
   */
  public render() : JSX.Element;

}


/** Defines the Page's props type. */
interface PageProps {
  /** Page's data. */
  readonly data : JSONPage;
}


/**
 * Stumpfi page React class.
 */
export class Page extends React.PureComponent<PageProps, {}> {

  /**
   * Renders the given resources along with default ones that should be integrated.
   * Default resources are used to properly format HTML tags, and to automatically scale font sizes.
   * @param {CustomResource[]} resources The custom resources to render inside the page.
   * @returns {JSX.Element[]} The pages' default resources React components.
   */
  public static renderResources(resources : CustomResource[]) : JSX.Element[];


  /**
   * Wraps the entire page in an iframe to allow embedding.
   * @param {JSX.Element} page : page's React component to be wrapped inside the iframe.
   * @returns {JSX.Element[]} The iframe-wrapped page's React component.
   */
  public static wrapPage(page : JSX.Element) : JSX.Element;


  /**
   * Class constructor.
   * @param {PageProps} props Page's props.
   * @returns {void}
   */
  public constructor(props : PageProps);


  /**
   * React rendering function.
   * @returns {JSX.Element} The React component.
   */
  public render() : JSX.Element;

}


/** Defines the Document's props type. */
interface DocumentProps {
  /** Document's data. */
  readonly data : JSONDocument;
}


/**
 * Stumpfi document React class.
 */
export class Document extends React.PureComponent<DocumentProps, {}> {

  /**
   * Class constructor.
   * @param {DocumentProps} props Document's props.
   * @returns {void}
   */
  public constructor(props : DocumentProps);


  /**
   * React rendering function.
   * @returns {JSX.Element} The React component.
   */
  public render() : JSX.Element;

}
