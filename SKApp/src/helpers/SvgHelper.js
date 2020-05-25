import React, { createElement } from "react";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image,
  Line,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Symbol,
  Text,
  TextPath,
  TSpan,
  Use,
} from "react-native-svg";

const mapping = {
  circle: Circle,
  clipPath: ClipPath,
  defs: Defs,
  ellipse: Ellipse,
  g: G,
  image: Image,
  line: Line,
  linearGradient: LinearGradient,
  mask: Mask,
  path: Path,
  pattern: Pattern,
  polygon: Polygon,
  polyline: Polyline,
  radialGradient: RadialGradient,
  rect: Rect,
  stop: Stop,
  svg: Svg,
  symbol: Symbol,
  text: Text,
  textPath: TextPath,
  tspan: TSpan,
  use: Use,
};

function createSvgComponent(svgObj, svgProps) {
  const svgChilds = svgObj.children.map((it, idx) =>
    toReactElement(it, idx, svgProps)
  );
  const DynamicSvg = (props) => {
    //adjust translate extent
    let { translateX, translateY, scaleX, scaleY } = props.transform;
    const { parentWidth, parentHeight } = props;
    const { width, height } = svgObj.attributes;

    const initX = (parentWidth - width * scaleX) / 2,
      initY = (parentHeight - height * scaleY) / 2;

    const maxX = (width / 2) * scaleX,
      maxY = (height / 2) * scaleY;

    if (translateX < -maxX + initX) translateX = -maxX + initX;
    else if (translateX > maxX + initX) translateX = maxX + initX;
    if (translateY < -maxY + initY) translateY = -maxY + initY;
    else if (translateY > maxY + initY) translateY = maxY + initY;

    if (
      props.transform.translateX != translateX ||
      props.transform.translateY != translateY
    ) {
      const state = props.parent.current.state;
      state.top = translateY;
      state.left = translateX;
      props.transform.translateX = translateX;
      props.transform.translateY = translateY;
    }

    //add extra children
    let extra = props.extraChildren;

    const onLoaded = props.onLoadedFunc();
    if (onLoaded) onLoaded();

    return (
      <Svg {...svgObj.attributes}>
        <G transform={props.transform}>
          {svgChilds}
          {extra}
        </G>
      </Svg>
    );
  };
  return DynamicSvg;
}

function getChildren(parent, key, props) {
  const children = parent.children;
  let rChildren = [];
  for (let k = 0; k < children.length; k++) {
    const ele = toReactElement(children[k], key + "-" + k, props);
    if (ele) {
      if (typeof ele == "array") rChildren = rChildren.concat(ele);
      else rChildren.push(ele);
    }
  }
  return rChildren;
}

function toReactElement(obj, key, props) {
  const type = mapping[obj.name];
  const children = getChildren(obj, key, props);
  if (!type) {
    return children;
  }
  obj.attributes.key = key;
  for (let pName in obj.attributes) {
    const val = obj.attributes[pName];
    if (val && val != "null" && val != "undefined") {
      if (pName.indexOf("-") > -1)
        obj.attributes[toCamelCase(pName)] = obj.attributes[pName];
      else {
        const nameStartIdx = pName.indexOf(":") + 1;
        if (nameStartIdx > 0)
          obj.attributes[pName.substr(nameStartIdx)] = obj.attributes[pName];
      }
    }
  }

  if (obj.value) children.unshift(obj.value);
  obj.attributes = { ...obj.attributes, ...props };
  obj.attributes.onPress = (ev) => {
    if (props.onPress) props.onPress(ev, ele);
  };
  const ele = createElement(type, obj.attributes, ...children);
  return ele;
}

function toCamelCase(text) {
  const parts = text.split("-");
  for (let k = 1; k < parts.length; k++) {
    parts[k] = parts[k][0].toUpperCase() + parts[k].substr(1);
  }
  return parts.join("");
}

export default { createSvgComponent };
