const REGEXP = new RegExp('{|}|"', "g");

function keys(obj: any) {
  return JSON.stringify(obj)
    .replace(REGEXP, "")
    .split(",")
    .map(function (item) {
      return item.split(":")[0];
    });
}

function kebabCase(word: any) {
  const newWord = word
    .replace(new RegExp("[A-Z]", "g"), function (i: any) {
      return "-" + i;
    })
    ?.toLowerCase();

  return newWord;
}

function cssStyle(styles: any): Record<string, any> {
  if (Array.isArray(styles)) {
    const obj: any = {};
    styles
      .filter(function (item: any) {
        return item != null && item !== "";
      })
      .map(function (item: any) {
        Object.assign(obj, cssStyle(item));
      });
    return obj;
  }

  if (toString.call(styles) === "[object String]") {
    const obj: any = {};
    styles.split(";").map((item: string) => {
      const property = item.split(":");
      obj[property[0]?.trim() || ""] = property[1]?.trim();
    });
    return obj;
  }

  return styles;
}

function style(styles: any): string {
  if (Array.isArray(styles)) {
    return (
      styles
        .filter(function (item: any) {
          return item != null && item !== "";
        })
        .map(function (item: any) {
          return style(item);
        })
        .join(";") || ""
    );
  }

  if (toString.call(styles) === "[object Object]") {
    return (
      keys(styles)
        .filter(function (key: any) {
          return styles[key] != null && styles[key] !== "";
        })
        .map(function (key: any) {
          return [kebabCase(key), [styles[key]]].join(":");
        })
        .join(";") || ""
    );
  }

  return styles || "";
}

const prefixClassname = (pr:any) => {
  return `sc-${pr}`;
};

function objectToString(styles: any | string): string {
  if (styles && typeof styles === "object") {
    let styleStr = "";
    Object.keys(styles).forEach((key) => {
      const lowerCaseKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      styleStr += `${lowerCaseKey}:${styles[key]};`;
    });
    return styleStr;
  } else if (styles && typeof styles === "string") {
    return styles;
  }
  return "";
}
/**
 * 合并 style
 * @param {Object|String} style1
 * @param {Object|String} style2
 * @returns {String}
 */
function mergeStyle(
  style1: object | string,
  style2: object | string
): object | string {
  if (
    style1 &&
    typeof style1 === "object" &&
    style2 &&
    typeof style2 === "object"
  ) {
    return Object.assign({}, style1, style2);
  }
  return objectToString(style1) + objectToString(style2);
}

export { style, cssStyle, keys, prefixClassname, mergeStyle };
