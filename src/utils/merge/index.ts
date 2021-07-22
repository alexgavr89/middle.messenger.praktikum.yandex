type Indexed<T = unknown> = {
  [key: string]: T;
};

function merge(target: Indexed, source: Indexed): Indexed {
  Object.keys(source).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      return;
    }

    try {
      if (source[key] instanceof Object && !(source[key] instanceof HTMLDivElement)) {
        source[key] = merge(target[key] as Indexed, source[key] as Indexed);
      } else {
        target[key] = source[key];
      }
    } catch (e) {
      target[key] = source[key];
    }
  });

  return target;
}

export default merge;
