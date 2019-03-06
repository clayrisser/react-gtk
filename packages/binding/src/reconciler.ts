import ReactReconciler from 'react-reconciler';
import createElement from './createElement';

interface Props {
  [key: string]: Prop;
}
type Prop = any;

export default ReactReconciler({
  appendInitialChild(parentInstance: Element, child: Element) {
    return parentInstance.appendChild(child);
  },

  createInstance(type: string, props: Props) {
    return createElement(type, props);
  },

  createTextInstance(text: string) {
    return text;
  },

  finalizeInitialChildren() {
    return true;
  },

  getPublicInstance(instance: Element) {
    return instance;
  },

  prepareForCommit() {
    return undefined;
  },

  prepareUpdate() {
    return true;
  },

  resetAfterCommit() {
    return undefined;
  },

  resetTextContent() {
    return undefined;
  },

  getRootHostContext() {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  shouldSetTextContent(props: Props) {
    if (typeof props.children === 'string') return true;
    return false;
  },

  now() {
    return 0;
  },

  mutation: {
    appendChild(parentInstance: Element, child: Element) {
      return parentInstance.appendChild(child);
    },

    appendChildToContainer(parentInstance: Element, child: Element) {
      return parentInstance.appendChild(child);
    },

    removeChild(parentInstance: Element, child: Element) {
      return parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance: Element, child: Element) {
      return parentInstance.removeChild(child);
    },

    insertBefore() {
      return undefined;
    },

    commitUpdate(
      instance: Element,
      _updatePayload: any,
      _type: string,
      _oldProps: Props,
      newProps: Props
    ) {
      return instance.commitUpdate(newProps);
    },

    commitMount(instance: Element) {
      instance.commitMount();
    },

    commitTextUpdate() {
      throw new Error('commitTextUpdate should not be called');
    }
  },

  useSyncScheduling: true
});
