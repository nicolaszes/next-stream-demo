import React, { ReactNode, ReactElement } from 'react';
import { LazyLoadOptions } from './types';
import { LAZY_LOAD_PLUGIN_TYPE } from './constants';
import { LazyComponent } from './components/LazyComponent';
import { LazyImage } from './components/LazyImage';
import { BasePlugin } from '../base/BasePlugin';
import { initializePlugin } from '../base/pluginInitializer';

export class LazyLoadPlugin implements BasePlugin {
  type = 'lazyload' as const;
  name = 'LazyloadPlugin';
  enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  initialize(componentName: string) {
    // console.log('🔥 LazyloadPlugin initialize 被调用了！', componentName);
    initializePlugin(this, componentName, '懒加载功能');

    if (this.enabled) {
      console.log(`LazyloadPlugin initialized for ${componentName}`);
    }
  }
}

export class DefaultLazyLoadPlugin extends LazyLoadPlugin {
  type: typeof LAZY_LOAD_PLUGIN_TYPE = LAZY_LOAD_PLUGIN_TYPE;
  name = 'DefaultLazyLoad';

  createLazyComponent(component: ReactNode | (() => Promise<ReactNode>), options?: LazyLoadOptions): ReactElement {
    return React.createElement(LazyComponent, { component, options });
  }

  createLazyImage(src: string, alt?: string, options?: LazyLoadOptions & { className?: string }): ReactElement {
    return React.createElement(LazyImage, { src, alt, options });
  }
}
