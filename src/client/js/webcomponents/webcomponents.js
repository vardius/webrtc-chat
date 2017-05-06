export function WebComponent(name, options) {
  return function (target) {
    const original = target;

    const f = function (...args) {
      const constructor = original.apply(this, args);

      if (options.template || options.styles) {
        let shadowRoot = constructor.shadowRoot;
        if (!shadowRoot) {
          shadowRoot = constructor.attachShadow({
            mode: 'open'
          });
        }

        const template = createTemplate(options.template);
        if (template) {
          shadowRoot.appendChild(template);
        }

        const styles = createStyles(options.styles);
        if (styles) {
          shadowRoot.appendChild(styles);
        }
      }

      return constructor;
    }

    f.prototype = original.prototype;

    if (options.extends) {
      customElements.define(name, f, {
        extends: options.extends
      });
    } else {
      customElements.define(name, f);
    }

    return f;
  }
}

function createTemplate(template) {
  if (!template) {
    return null
  }

  let t = document.createElement('template');
  t.innerHTML = template;

  return t.content.cloneNode(true);
}

function createStyles(styles) {
  if (!styles) {
    return null
  }
  let s = document.createElement('style');
  s.textContent = styles;

  return s;
}
