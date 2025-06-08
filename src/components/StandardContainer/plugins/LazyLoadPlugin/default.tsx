import React, { ReactNode, ReactElement } from 'react';
import { LazyLoadOptions } from './types';
import { LazyComponent } from './components/LazyComponent';
import { LazyImage } from './components/LazyImage';
import { BasePlugin } from '../base/BasePlugin';
import { initializePlugin } from '../base/pluginInitializer';

export class LazyLoadPlugin implements BasePlugin {
  type = 'lazyload' as const;
  name = 'LazyLoadPlugin';
  enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  initialize(componentName: string) {
    initializePlugin(this, componentName, '懒加载功能');
    
    if (this.enabled) {
      // 原有的懒加载逻辑
      console.log(`LazyLoadPlugin initialized for ${componentName}`);
    }
  }

  createLazyComponent(
    component: ReactNode | (() => Promise<ReactNode>),
    options?: LazyLoadOptions
  ): ReactElement {
    return React.createElement(LazyComponent, { component, options });
  }

  createLazyImage(
    src: string,
    alt?: string,
    options?: LazyLoadOptions & { className?: string }
  ): ReactElement {
    return React.createElement(LazyImage, { src, alt, options });
  }
}