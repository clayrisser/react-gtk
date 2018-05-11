import ReactReconciler from 'react-reconciler';
import createElement from './createElement';

export default ReactReconciler({
  appendInitialChild(parentInstance, child) {
    return parentInstance.appendChild(child);
  },

  createInstance(type, props) {
    return createElement(type, props);
  },

  createTextInstance(text) {
    return text;
  },

  finalizeInitialChildren() {
    return true;
  },

  getPublicInstance(instance) {
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

  shouldSetTextContent(props) {
    if (typeof props.children === 'string') return true;
    return false;
  },

  now() {
    return undefined;
  },

  mutation: {
    appendChild(parentInstance, child) {
      return parentInstance.appendChild(child);
    },

    appendChildToContainer(parentInstance, child) {
      return parentInstance.appendChild(child);
    },

    removeChild(parentInstance, child) {
      return parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      return parentInstance.removeChild(child);
    },

    insertBefore() {
      return undefined;
    },

    commitUpdate(instance, _updatePayload, _type, _oldProps, newProps) {
      return instance.commitUpdate(newProps);
    },

    commitMount(instance) {
      instance.commitMount();
    },

    commitTextUpdate() {
      throw new Error('commitTextUpdate should not be called');
    }
  },

  useSyncScheduling: true
});
