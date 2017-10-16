/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


 /** This declaration is necessary to run jest CLI from a file. */
 declare module 'jest-cli' {
  export function run(argv: string[]): void;
}


/** This declaration is necessary to import JSON files into TypeScript files. */
declare module '*.json';


/** JSON type definition. */
type basic = string | number | boolean | null | object;
interface JsonArray extends Array<basic | JsonObject | JsonArray> {}
interface JsonObject { [x: string]: basic | JsonObject | JsonArray; }
type Json = basic | JsonObject | JsonArray;


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