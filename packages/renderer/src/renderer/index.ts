import { ReactNode } from 'react';
import ReactReconciler from 'react-reconciler';

const reconciler = ReactReconciler({
  supportsMutation: true,
  isPrimaryRenderer: true,
  supportsPersistence: false,
  supportsHydration: false,
  createInstance: (type: string) => {
    const element = document.createElement(type);
    return element;
  },
  createTextInstance: (text: string) => {
    const element = document.createTextNode(text);
    return element;
  },
  appendInitialChild: (parentInstance: any, child: any) => {
    parentInstance.appendChild(child);
  },
  appendChild: (parentInstance: any, child: any) => {
    parentInstance.appendChild(child);
  },
  appendChildToContainer: (parentInstance: any, child: any) => {
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren: () => {
    return false;
  },
  prepareUpdate: () => {
    return null;
  },
  shouldSetTextContent: () => {
    return false;
  },
  getRootHostContext: () => {
    return null;
  },
  getChildHostContext: () => {
    return null;
  },
  getPublicInstance: (instance: any) => {
    return instance;
  },
  prepareForCommit: () => {
    return null;
  },
  resetAfterCommit: () => {},
  preparePortalMount: () => {},
  now: Date.now,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1
});

export function createRoot(element: Element | DocumentFragment) {
  return {
    render: (component: ReactNode) => {
      const root = reconciler.createContainer(
        element,
        0,
        null,
        false,
        false,
        '',
        () => {},
        null
      );
      //@ts-ignore
      reconciler.updateContainer(component, root, null);
    }
  };
}
