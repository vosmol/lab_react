import { ReactNode } from 'react';
import Reconciler from 'react-reconciler';

// ! JUST STARTED TO WORKING ON THIS - does not work !!!

const Renderer = Reconciler({
  supportsMutation: true,
  supportsPersistence: false,
  noTimeout: undefined,
  isPrimaryRenderer: false,
  supportsHydration: false,
  // METHODS ================
  createInstance: (type: any, props: any) => {
    const instance = document.createElement(type);
    if (props.className) instance.className = props.className;
    return instance;
  },
  createTextInstance: (text: string) => {
    return document.createTextNode(text);
  },
  appendInitialChild: (parentInstance: any, child: any) => {
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren: (
    instance: any,
    type: any,
    props: any,
    rootContainer: any,
    hostContext: any
  ) => {
    throw new Error('Function not implemented.');
  },
  prepareUpdate: function (
    instance: any,
    type: any,
    oldProps: any,
    newProps: any,
    rootContainer: any,
    hostContext: any
  ) {
    throw new Error('Function not implemented.');
  },
  shouldSetTextContent: (type: any, props: any) => {
    throw new Error('Function not implemented.');
  },
  getRootHostContext: (rootContainer: any) => {
    throw new Error('Function not implemented.');
  },
  getChildHostContext: (
    parentHostContext: any,
    type: any,
    rootContainer: any
  ) => {
    throw new Error('Function not implemented.');
  },
  getPublicInstance: (instance: any) => {
    throw new Error('Function not implemented.');
  },
  prepareForCommit: (containerInfo: any) => {
    throw new Error('Function not implemented.');
  },
  resetAfterCommit: (containerInfo: any) => {
    throw new Error('Function not implemented.');
  },
  preparePortalMount: (containerInfo: any) => {
    throw new Error('Function not implemented.');
  },
  now: () => {
    throw new Error('Function not implemented.');
  },
  scheduleTimeout: (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined
  ) => {
    throw new Error('Function not implemented.');
  },
  cancelTimeout: (id: any) => {
    throw new Error('Function not implemented.');
  }
});

export function createRoot(el: Element | DocumentFragment) {
  return {
    render(children: ReactNode) {
      console.log('render');
      const container = Renderer.createContainer(
        el,
        0,
        null,
        false,
        false,
        'react',
        () => {},
        null
      );
      Renderer.updateContainer(null, container, null, null);
    }
  };
}
