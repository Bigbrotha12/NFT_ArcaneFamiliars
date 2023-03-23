declare module "\*.svg" {
    import React = require("react");
    export const ReactComponent: React.SVGAttributes<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module "\*.jpeg" {
    const content: string;
    export default content;
  }
  
  declare module "\*.png" {
    const content: string;
    export default content;
  }