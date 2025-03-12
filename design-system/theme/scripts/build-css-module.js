import * as theme from "../dist/index.js";
//파일 시스템을 이용하여 파일을 읽고 쓰기 위해 fs 모듈을 사용
import fs from "fs";

//만들고 싶었던 것
// :root {
//   --primary-100: #f0f4ff;
// }

const toCssCasting = (str) => {
  return str
    .replace(/([a-z])(\d)/, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
};
//theme의 변수를 css 변수로 변환
const generateThemeCssVariables = () => {
  const cssString = [];

  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          const selector = ":root";

          const cssVariable = Object.entries(colorValue)
            .map(([mainKey, mianColor]) =>
              Object.entries(mianColor)
                .map(([subKey, subColor]) => {
                  return `--${toCssCasting(mainKey)}-${subKey}: ${subColor};`;
                })
                .join("\n")
            )
            .join("\n");

          cssString.push(`${selector} {\n${cssVariable}\n}`);
        }
      });
    }
  });

  return cssString;
};

//css 변수를 css 파일로 변환
const generateThemeCss = () => {
  const variable = generateThemeCssVariables();

  //variable을 dist/theme.css에 쓰기
  fs.writeFileSync("dist/theme.css", [...variable].join("\n"));
};

generateThemeCss();
